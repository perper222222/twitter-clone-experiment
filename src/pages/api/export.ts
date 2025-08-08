import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Parser } from 'json2csv';

// 初始化 Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = getFirestore();

    // 读取帖子数据
    const postsSnap = await db.collection('posts').get();
    const posts = postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 读取互动数据（假设集合叫 interactions，可以改成你的实际名字）
    const interactionsSnap = await db.collection('interactions').get();
    const interactions = interactionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 合并导出数据
    const exportData = [
      ...posts.map(p => ({ type: 'post', ...p })),
      ...interactions.map(i => ({ type: 'interaction', ...i })),
    ];

    // 转成 CSV
    const parser = new Parser();
    const csv = parser.parse(exportData);

    // 返回 CSV 文件下载
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
    res.status(200).send(csv);

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
}
