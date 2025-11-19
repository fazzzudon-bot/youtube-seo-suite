import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude server-only packages from client bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        http2: false,
        'node:fs': false,
        'node:net': false,
      };
      
      // Mark packages as external for client-side
      config.externals = config.externals || [];
      config.externals.push({
        googleapis: 'commonjs googleapis',
        'google-auth-library': 'commonjs google-auth-library',
        'gcp-metadata': 'commonjs gcp-metadata',
        gtoken: 'commonjs gtoken',
        'googleapis-common': 'commonjs googleapis-common',
        'agent-base': 'commonjs agent-base',
        'https-proxy-agent': 'commonjs https-proxy-agent',
        'fetch-blob': 'commonjs fetch-blob',
        'node-fetch': 'commonjs node-fetch',
      });
    }
    return config;
  },
};

export default nextConfig;
// Orchids restart: 1763524750552