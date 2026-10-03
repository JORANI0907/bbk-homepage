-- ==========================================
-- BBK Homepage · 인플레이스 편집 콘텐츠 저장소
-- 2026-09-29
--
-- 이 마이그레이션은 두 가지를 생성합니다:
-- 1. homepage_content 테이블 (key-value 콘텐츠 저장)
-- 2. homepage-images Storage 버킷 (사진 파일 저장)
-- ==========================================

-- 1. homepage_content 테이블
create table if not exists public.homepage_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.users(id)
);

create index if not exists homepage_content_updated_at_idx
  on public.homepage_content(updated_at desc);

alter table public.homepage_content enable row level security;

-- 정책: 누구나 읽기
drop policy if exists "homepage_content public read" on public.homepage_content;
create policy "homepage_content public read"
  on public.homepage_content
  for select
  using (true);

-- 쓰기는 Service Role만 (API 라우트에서 관리자 세션 검증 후 처리)
-- RLS는 anon/authenticated에게 쓰기 차단 · service_role은 RLS 우회

-- 2. Storage 버킷
insert into storage.buckets (id, name, public)
values ('homepage-images', 'homepage-images', true)
on conflict (id) do nothing;

-- 정책: 누구나 이미지 읽기
drop policy if exists "homepage_images public read" on storage.objects;
create policy "homepage_images public read"
  on storage.objects
  for select
  using (bucket_id = 'homepage-images');

-- 업로드는 Service Role만 · API 라우트에서 관리자 세션 확인 후 처리
