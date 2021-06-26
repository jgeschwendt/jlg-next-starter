import type { NextApiHandler } from 'next';
import { SitemapStream } from 'sitemap';
import { createGzip } from 'zlib';

const handler: NextApiHandler = (req, res) => {
  try {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/xml');

    const pages = [{ url: '/' }];

    const stream = new SitemapStream({
      hostname: `https://${req.headers.host as string}`,
    });

    stream
      .pipe(createGzip())
      .pipe(res)
      .on('error', (error: Error) => {
        throw error;
      });

    // Add Page Stories
    for (const { url } of pages) {
      stream.write({ url });
    }

    stream.end();
  } catch {
    res.status(500);
  }
};

export default handler;
