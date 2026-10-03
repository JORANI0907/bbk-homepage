/**
 * 브라우저에서 이미지를 리사이즈·재압축하는 유틸리티.
 * 업로드 전에 파일 크기를 줄여 저장소·대역폭 절감.
 *
 * 기본 정책:
 *  - 가로 최대 1600px (Retina 2배 대응 + 대형 화면 여유)
 *  - JPEG 82% 품질 (시각적 손실 없이 크기 대폭 감소)
 *  - 이미 작은 파일(가로 ≤1600 + 300KB 이하)은 원본 유지
 *  - GIF, SVG 등 특수 포맷은 원본 유지
 */

type ResizeOptions = {
  maxWidth?: number;
  quality?: number;
  /** 이 크기 이하이면 리사이즈 스킵 (bytes) */
  skipUnderBytes?: number;
};

const DEFAULT_MAX_WIDTH = 1600;
const DEFAULT_QUALITY = 0.82;
const DEFAULT_SKIP_UNDER = 300 * 1024;

/** 지원 안 하거나 불필요한 포맷 */
function shouldSkipFormat(file: File): boolean {
  const t = file.type.toLowerCase();
  if (!t.startsWith("image/")) return true;
  if (t === "image/gif") return true; // 애니메이션 유지
  if (t === "image/svg+xml") return true;
  return false;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}

export async function resizeImage(
  file: File,
  options: ResizeOptions = {},
): Promise<File> {
  const maxWidth = options.maxWidth ?? DEFAULT_MAX_WIDTH;
  const quality = options.quality ?? DEFAULT_QUALITY;
  const skipUnder = options.skipUnderBytes ?? DEFAULT_SKIP_UNDER;

  if (shouldSkipFormat(file)) return file;

  let img: HTMLImageElement;
  try {
    img = await loadImage(file);
  } catch {
    return file;
  }

  const alreadySmall = img.width <= maxWidth && file.size <= skipUnder;
  if (alreadySmall) return file;

  const scale = Math.min(1, maxWidth / img.width);
  const targetW = Math.max(1, Math.round(img.width * scale));
  const targetH = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", quality);
  });

  if (!blob) return file;

  const baseName = file.name.replace(/\.[^.]+$/, "");
  const newName = `${baseName || "image"}.jpg`;
  return new File([blob], newName, {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
}
