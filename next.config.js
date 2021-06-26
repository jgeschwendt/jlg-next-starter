'use strict';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ['s3.amazonaws.com'],
  },
  reactStrictMode: true,
  rewrites: () => [
    {
      destination: '/api/robots',
      source: '/robots.txt',
    },
    {
      destination: '/api/sitemap',
      source: '/sitemap.xml',
    },
  ],
});
