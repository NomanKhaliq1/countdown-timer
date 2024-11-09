// import { promises as fs } from 'fs';
// import path from 'path';

// export default async function handler(req, res) {
//   const filePath = path.join(process.cwd(), 'public', 'meta.json');
//   try {
//     const jsonData = await fs.readFile(filePath, 'utf8');
//     res.status(200).json(JSON.parse(jsonData));
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to load meta.json' });
//   }
// }