import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

/**
 * Resolves the absolute Cloudflare R2 URL for a given asset path.
 * If the PUBLIC_R2_BASE_URL environment variable is not defined, returns null,
 * signaling that components should use their local fallbacks.
 *
 * @param path The path of the image relative to the R2 bucket root (e.g. 'hero-portrait.png')
 */
export function getR2ImageUrl(path: string): string | null {
  const r2BaseUrl = import.meta.env.PUBLIC_R2_BASE_URL;

  if (!r2BaseUrl) {
    return null;
  }

  if (r2BaseUrl) {
    const cleanBase = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${cleanBase}/${cleanPath}`;
  }
  
  return null;
}

/**
 * Resolves the optimized thumbnail URL.
 * Uses the pre-generated _thumb.webp files uploaded to R2 via optimize_r2_images.js.
 *
 * @param path The path of the image relative to R2 bucket root
 */
export function getR2ImageThumbnailUrl(path: string): string | null {
  const r2BaseUrl = import.meta.env.PUBLIC_R2_BASE_URL;

  if (!r2BaseUrl) {
    return null;
  }

  const cleanBase = r2BaseUrl.endsWith('/') ? r2BaseUrl.slice(0, -1) : r2BaseUrl;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  const thumbPath = cleanPath.replace(/\.(jpg|jpeg|png|webp)$/i, '_thumb.webp');

  return `${cleanBase}/${thumbPath}`;
}

/**
 * Server-side utility to dynamically list and resolve all files under an R2 folder prefix.
 * Falls back to an empty list if R2 credentials are not set.
 * Excludes _thumb.webp files (thumbnails) from the main list — they are used internally.
 * 
 * @param prefix The bucket folder prefix (e.g., 'album/')
 */
export async function listR2Folder(prefix: string): Promise<string[]> {
  const r2AccessKey = import.meta.env.R2_ACCESS_KEY_ID;
  const r2SecretKey = import.meta.env.R2_SECRET_ACCESS_KEY;
  const r2AccountId = import.meta.env.R2_ACCOUNT_ID;
  const r2BucketName = import.meta.env.R2_BUCKET_NAME;

  if (!r2AccessKey || !r2SecretKey || !r2AccountId || !r2BucketName) {
    return [];
  }

  try {
    const s3 = new S3Client({
      region: 'auto',
      endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: r2AccessKey,
        secretAccessKey: r2SecretKey,
      },
      runtime: "browser",
    });

    const response = await s3.send(new ListObjectsV2Command({
      Bucket: r2BucketName,
      Prefix: prefix,
    }));

    return (response.Contents || [])
      .map(item => item.Key || '')
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

