import type { NextApiRequest, NextApiResponse } from 'next';
import * as admin from 'firebase-admin';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Parser } from 'json2csv';

const initAdmin = () => {
  if (!getApps().length) {
    // Expect service account JSON in FIREBASE_SERVICE_ACCOUNT (stringified) or path in FIREBASE_SERVICE_ACCOUNT_PATH
    const svc = process.env.FIREBASE_SERVICE_ACCOUNT;
    const path = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    if (svc) {
      initializeApp({
        credential: cert(JSON.parse(svc))
      });
    } else if (path) {
      initializeApp({
        credential: cert(require(path))
      });
    } else {
      // fallback to default app; this will fail on Vercel unless GOOGLE_APPLICATION_CREDENTIALS is set
      initializeApp();
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    initAdmin();
    const db = getFirestore();
    // Adjust collection names according to your project (tweets/posts)
    const tweetsSnap = await db.collection('tweets').orderBy('createdAt', 'asc').get();
    const rows: any[] = [];
    for (const doc of tweetsSnap.docs) {
      const data = doc.data();
      const tweetId = doc.id;
      // Attempt to get likes and comments counts (subcollections)
      let likes = 0;
      let comments = 0;
      try {
        const likesSnap = await db.collection('tweets').doc(tweetId).collection('likes').get();
        likes = likesSnap.size;
      } catch (e) {}
      try {
        const commentsSnap = await db.collection('tweets').doc(tweetId).collection('comments').get();
        comments = commentsSnap.size;
      } catch (e) {}
      rows.push({
        id: tweetId,
        authorId: data.authorId || data.userId || data.user || null,
        content: data.content || data.text || data.body || '',
        createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : String(data.createdAt)) : '',
        likes,
        comments
      });
    }

    const parser = new Parser({ fields: ['id','authorId','content','createdAt','likes','comments'] });
    const csv = parser.parse(rows);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="export.csv"');
    res.status(200).send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Export failed', details: String(error) });
  }
}
