import { AwsClient } from 'aws4fetch';

/**
 * Resolves the absolute Cloudflare R2 URL for a given asset path.
 */
export function getR2ImageUrl(path: string): string | null {
  const r2BaseUrl = import.meta.env.PUBLIC_R2_BASE_URL;
  if (!r2BaseUrl) return null;

  const cleanBase = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}/${cleanPath}`;
}

/**
 * Resolves the optimized thumbnail URL.
 */
export function getR2ImageThumbnailUrl(path: string): string | null {
  const r2BaseUrl = import.meta.env.PUBLIC_R2_BASE_URL;
  if (!r2BaseUrl) return null;

  const cleanBase = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const thumbPath = cleanPath.replace(/\.(jpg|jpeg|png|webp)$/i, '_thumb.webp');

  return `${cleanBase}/${thumbPath}`;
}

/**
 * Server-side utility to dynamically list and resolve all files under an R2 folder prefix.
 */
export async function listR2Folder(prefix: string): Promise<string[]> {
  const r2AccessKey = import.meta.env.R2_ACCESS_KEY_ID;
  const r2SecretKey = import.meta.env.R2_SECRET_ACCESS_KEY;
  const r2AccountId = import.meta.env.R2_ACCOUNT_ID;
  const r2BucketName = import.meta.env.R2_BUCKET_NAME;

  if (!r2AccessKey || !r2SecretKey || !r2AccountId || !r2BucketName) {
    console.warn(`[R2] Missing environment credentials for prefix: ${prefix}`);
    return [];
  }

  try {
    const aws = new AwsClient({
      accessKeyId: r2AccessKey,
      secretAccessKey: r2SecretKey,
      region: 'auto',
      service: 's3'
    });

    const url = `https://${r2AccountId}.r2.cloudflarestorage.com/${r2BucketName}?list-type=2&prefix=${encodeURIComponent(prefix)}`;
    const response = await aws.fetch(url);

    if (!response.ok) {
      console.error(`Failed to list objects in R2 folder "${prefix}": HTTP ${response.status}`);
      return [];
    }

    const xml = await response.text();

    // Parse XML using regex since DOMParser isn't available in standard edge runtime
    const keys: string[] = [];
    const regex = /<Key>(.*?)<\/Key>/g;
    let match;
    while ((match = regex.exec(xml)) !== null) {
      // Decode XML entities if any (like &amp;)
      let key = match[1];
      key = key.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
      keys.push(key);
    }

    return keys
      .filter(key => {
        const ext = key.split('.').pop()?.toLowerCase();
        return key !== prefix &&
               !key.includes('_thumb.') &&
               ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'mp3', 'mp4'].includes(ext || '');
      })
      .map(key => getR2ImageUrl(key))
      .filter((url): url is string => url !== null);
  } catch (err) {
    console.error(`Failed to list objects in R2 folder "${prefix}":`, err);
    return [];
  }
}
