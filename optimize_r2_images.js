import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
const r2AccessKey = process.env.R2_ACCESS_KEY_ID;
const r2SecretKey = process.env.R2_SECRET_ACCESS_KEY;
const r2AccountId = process.env.R2_ACCOUNT_ID;
const r2BucketName = process.env.R2_BUCKET_NAME;
if (!r2AccessKey || !r2SecretKey || !r2AccountId || !r2BucketName) {
  console.error('❌ Missing R2 environment variables');
  process.exit(1);
}
const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: r2AccessKey,
    secretAccessKey: r2SecretKey,
  },
});
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function optimizeAndUpload() {
  console.log('🔄 Fetching objects list from R2...');
  let objects = [];
  try {
    const response = await s3.send(new ListObjectsV2Command({
      Bucket: r2BucketName,
    }));
    objects = response.Contents || [];
  } catch (err) {
    console.error('❌ Failed to list objects:', err);
    process.exit(1);
  }
  console.log(`📋 Found ${objects.length} objects in the bucket.`);
  for (const obj of objects) {
    const key = obj.Key;
    if (!key) continue;
    // Filter for files ending in jpg, jpeg, png (case insensitive)
    const match = key.match(/\.(jpg|jpeg|png)$/i);
    if (!match) {
      console.log(`⏩ Skipping non-image key: ${key}`);
      continue;
    }
    console.log(`\n──────────────────────────────────────────────────`);
    console.log(`🚀 Processing: ${key} (${(obj.Size / 1024 / 1024).toFixed(2)} MB)`);
    try {
      // 1. Download original image
      const getResponse = await s3.send(new GetObjectCommand({
        Bucket: r2BucketName,
        Key: key,
      }));
      const originalBuffer = await streamToBuffer(getResponse.Body);
      // Determine file extension and root filename
      const ext = match[1].toLowerCase();
      const baseName = key.substring(0, key.lastIndexOf('.'));
      if (key.startsWith('album/')) {
        // --- ALBUM IMAGE: Create full-res webp and thumbnail webp ---
        const fullWebpKey = `${baseName}.webp`;
        const fullWebpBuffer = await sharp(originalBuffer)
          .webp({ quality: 90 })
          .toBuffer();
        // Upload Full-Res WebP
        console.log(`📤 Uploading full-res WebP: ${fullWebpKey} (${(fullWebpBuffer.length / 1024).toFixed(1)} KB)`);
        await s3.send(new PutObjectCommand({
          Bucket: r2BucketName,
          Key: fullWebpKey,
          Body: fullWebpBuffer,
          ContentType: 'image/webp',
        }));
      } else {
        // --- ROOT IMAGE: Create optimized WebP ---
        const webpKey = `${baseName}.webp`;
        const webpBuffer = await sharp(originalBuffer)
          .webp({ quality: 85 })
          .toBuffer();
        console.log(`📤 Uploading WebP: ${webpKey} (${(webpBuffer.length / 1024).toFixed(1)} KB)`);
        await s3.send(new PutObjectCommand({
          Bucket: r2BucketName,
          Key: webpKey,
          Body: webpBuffer,
          ContentType: 'image/webp',
        }));
      }
      // 2. Delete original image
      console.log(`🗑️ Deleting original file from R2: ${key}`);
      await s3.send(new DeleteObjectCommand({
        Bucket: r2BucketName,
        Key: key,
      }));
      
      console.log(`✅ Finished processing: ${key}`);
    } catch (err) {
      console.error(`❌ Failed to process ${key}:`, err);
    }
  }
  console.log('\n🎉 ALL IMAGES OPTIMIZED AND CONVERTED TO WEBP SUCCESSFULLY!');
}
optimizeAndUpload();