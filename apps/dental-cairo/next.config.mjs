/**
 * Set STATIC_EXPORT=1 to emit a fully static site into `out/` that can be
 * served from any static host (or opened with `npx serve out`).
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? "export" : undefined,
  images: isStaticExport ? { unoptimized: true } : undefined,
  // Allow the sandbox preview host (e.g. https://3100-<id>.e2b.app) to load
  // dev assets and make requests to the dev server.
  allowedDevOrigins: ["*.e2b.app", "*.arena.ai", "localhost", "127.0.0.1"],
};

export default nextConfig;
