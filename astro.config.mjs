// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

import cloudflare from '@astrojs/cloudflare';

// Load environment variables during Astro config loading
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const r2BaseUrl = process.env.PUBLIC_R2_BASE_URL || env.PUBLIC_R2_BASE_URL;
const allowedHost = process.env.ALLOWED_HOST || env.ALLOWED_HOST || 'localhost';

// Prepare the base remote image whitelist
const domains = [];
const remotePatterns = [
  {
    protocol: 'https',
    hostname: '*.auyenwedding.com',
    pathname: '/**',
  },
];

if (r2BaseUrl) {
  try {
    const r2Url = new URL(r2BaseUrl);
    const protocol = r2Url.protocol.replace(':', '');
    
    domains.push(r2Url.hostname);
    
    remotePatterns.push({
      protocol,
      hostname: r2Url.hostname,
      pathname: '/**',
    });
    
    console.log(`[Astro Config] Dynamically whitelisted R2 Host: ${r2Url.hostname}`);
  } catch (err) {
    console.warn('Warning: PUBLIC_R2_BASE_URL is not a valid URL. Remote image patterns not updated.', err);
  }
}

// https://astro.build/config
export default defineConfig({
  image: {
    domains,
    remotePatterns,
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: [allowedHost]
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          entryFileNames: 'entry/[name]-[hash].mjs' 
        }
      }
    }
  },

  adapter: cloudflare({
    imageService: 'passthrough',
  })
});