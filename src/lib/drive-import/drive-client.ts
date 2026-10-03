/**
 * Google Drive API v3 서비스 계정 조회 유틸.
 * 서비스 계정 JSON으로 인증 → 공유된 폴더의 하위 폴더/파일 리스트 조회.
 *
 * 사전 조건:
 * - GOOGLE_SERVICE_ACCOUNT_JSON 환경변수에 서비스 계정 JSON 전체가 들어있어야 함
 * - 대상 Drive 폴더가 서비스 계정 이메일에 "뷰어" 권한으로 공유되어 있어야 함
 */

import { google, type drive_v3 } from "googleapis";

const FOLDER_MIME = "application/vnd.google-apps.folder";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
};

function getServiceAccountCredentials() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!json) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON 환경변수가 설정되지 않았습니다.",
    );
  }
  try {
    return JSON.parse(json);
  } catch {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_JSON JSON 파싱 실패. 전체 JSON을 한 줄 문자열로 넣었는지 확인하세요.",
    );
  }
}

let cachedDrive: drive_v3.Drive | null = null;

function getDrive(): drive_v3.Drive {
  if (cachedDrive) return cachedDrive;
  const credentials = getServiceAccountCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  cachedDrive = google.drive({ version: "v3", auth });
  return cachedDrive;
}

/**
 * 특정 폴더의 **직접 하위 파일/폴더** 리스트.
 * trashed=false, 서비스 계정에 공유된 폴더만 접근 가능.
 */
export async function listFolderChildren(folderId: string): Promise<DriveFile[]> {
  const drive = getDrive();
  const all: DriveFile[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: "nextPageToken, files(id,name,mimeType,modifiedTime,size)",
      pageSize: 200,
      orderBy: "name",
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });

    const files = (res.data.files ?? []) as DriveFile[];
    console.log(
      `[drive] listFolderChildren folderId=${folderId} fetched=${files.length}`,
    );
    all.push(...files);
    pageToken = res.data.nextPageToken ?? undefined;
  } while (pageToken);

  return all;
}

/**
 * 하위 중 폴더만 필터.
 */
export function filterFolders(items: DriveFile[]): DriveFile[] {
  return items.filter((f) => f.mimeType === FOLDER_MIME);
}

/**
 * 하위 중 이미지 파일만 필터 (jpg/png/webp/heic).
 */
export function filterImages(items: DriveFile[]): DriveFile[] {
  return items.filter(
    (f) =>
      f.mimeType.startsWith("image/") ||
      /\.(jpe?g|png|webp|heic)$/i.test(f.name),
  );
}

/**
 * 폴더/파일의 메타 정보 (주로 이름 조회용).
 */
export async function getFolderMeta(
  folderId: string,
): Promise<{ id: string; name: string; mimeType: string } | null> {
  const drive = getDrive();
  try {
    const res = await drive.files.get({
      fileId: folderId,
      fields: "id,name,mimeType",
      supportsAllDrives: true,
    });
    const data = res.data;
    if (!data.id || !data.name || !data.mimeType) return null;
    return { id: data.id, name: data.name, mimeType: data.mimeType };
  } catch {
    return null;
  }
}

/**
 * 공유된 파일을 바이너리로 다운로드.
 * 서비스 계정 인증 헤더로 호출 → URL 외부 노출 없음.
 */
export async function downloadFile(fileId: string): Promise<ArrayBuffer> {
  const drive = getDrive();
  const res = await drive.files.get(
    { fileId, alt: "media", supportsAllDrives: true },
    { responseType: "arraybuffer" },
  );
  return res.data as ArrayBuffer;
}

/**
 * 폴더 URL에서 ID 추출.
 * - https://drive.google.com/drive/folders/XXXX
 * - https://drive.google.com/drive/u/0/folders/XXXX
 * - 생 ID("XXXX")도 지원
 */
export function extractFolderIdFromUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) return trimmed;

  const m = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
