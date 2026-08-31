/**
 * CDN asset resolver.
 *
 * Binary assets live on Lovable's asset CDN and are referenced by the
 * `/__l5e/assets-v1/...` path. That path is only served by Lovable hosting, so
 * on any other host (Hostinger, custom Node deploys) the relative path 404s and
 * every image silently fails to load.
 *
 * Resolving those paths against an absolute origin makes them work everywhere.
 * Override with VITE_ASSET_BASE_URL at build time if the assets move.
 */
const DEFAULT_ORIGIN = "https://bricks-and-bloom-digital.lovable.app";

const ORIGIN = (
  (import.meta.env["VITE_ASSET_BASE_URL"] as string | undefined) ?? DEFAULT_ORIGIN
).replace(/\/+$/, "");

export function assetUrl(pointer: { url: string } | string): string {
  const path = typeof pointer === "string" ? pointer : pointer.url;
  if (!path.startsWith("/__l5e/")) return path;
  return `${ORIGIN}${path}`;
}
