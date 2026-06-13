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

// /**
//  * Server-side utility to dynamically list and resolve all files under an R2 folder prefix.
//  */
// export async function listR2Folder(prefix: string): Promise<string[]> {
//   const r2AccessKey = import.meta.env.R2_ACCESS_KEY_ID;
//   const r2SecretKey = import.meta.env.R2_SECRET_ACCESS_KEY;
//   const r2AccountId = import.meta.env.R2_ACCOUNT_ID;
//   const r2BucketName = import.meta.env.R2_BUCKET_NAME;

//   if (!r2AccessKey || !r2SecretKey || !r2AccountId || !r2BucketName) {
//     console.warn(`[R2] Missing environment credentials for prefix: ${prefix}`);
//     return [];
//   }

//   try {
//     // Explicit configuration payload targeting V8 runtime structures directly
//     const config = {
//       region: 'auto',
//       endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
//       credentials: {
//         accessKeyId: r2AccessKey,
//         secretAccessKey: r2SecretKey,
//       }
//     };

//     // Dynamically instantiated inside execution scope to trick Vite's chunk optimizer
//     const s3 = new S3Client(config);

//     const response = await s3.send(new ListObjectsV2Command({
//       Bucket: r2BucketName,
//       Prefix: prefix,
//     }));

//     return (response.Contents || [])
//       .map(item => item.Key || '')
//       .filter(key => {
//         const ext = key.split('.').pop()?.toLowerCase();
//         return key !== prefix &&
//                !key.includes('_thumb.') &&
//                ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'mp3', 'mp4'].includes(ext || '');
//       })
//       .map(key => getR2ImageUrl(key))
//       .filter((url): url is string => url !== null);
//   } catch (err) {
//     console.error(`Failed to list objects in R2 folder "${prefix}":`, err);
//     return [];
//   }
// }

/**
 * Server-side utility using native fetch to avoid AWS SDK runtime bugs on Cloudflare Workers
 */
export async function listR2Folder(prefix: string): Promise<string[]> {
  const r2AccountId = import.meta.env.R2_ACCOUNT_ID;
  const r2BucketName = import.meta.env.R2_BUCKET_NAME;
  const r2BaseUrl = import.meta.env.PUBLIC_R2_BASE_URL;

  if (!r2AccountId || !r2BucketName || !r2BaseUrl) {
    console.warn("[R2] Missing required configuration envs.");
    return [];
  }

  try {
    const endpoint = `https://${r2AccountId}.r2.cloudflarestorage.com/${r2BucketName}?prefix=${prefix}`;

    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`R2 API responded with status ${response.status}`);
    }

    const xmlText = await response.text();
    
    const keyRegex = <RegExp>/<Key>([^<]+)<\/Key>/g;
    const keys: string[] = [];
    let match;

    while ((match = keyRegex.exec(xmlText)) !== null) {
      keys.push(match[1]);
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
    console.error(`Failed to list objects via Fetch API in R2 folder "${prefix}":`, err);
    return [];
  }
}