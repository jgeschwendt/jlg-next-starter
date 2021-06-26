import type { NextApiHandler } from 'next';
import { config } from '../../config';

const handler: NextApiHandler = (req, res) => {
  res.send(config.VERCEL_ENV === 'production'
    ? `User-agent: *\nDisallow:\nSitemap: https://${req.headers.host as string}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n');
};

export default handler;
