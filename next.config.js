import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

initOpenNextCloudflareForDev();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    // Cloudflare Pages는 Next 내장 이미지 최적화 엔드포인트를 실행하지 않으므로 비활성화.
    // 필요하면 Cloudflare Image Resizing으로 대체 권장.
    unoptimized: true,
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : ''],
  },
  env: {
    NEXT_PUBLIC_UPSTASH_REDIS_REST_URL: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL,
    NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;
