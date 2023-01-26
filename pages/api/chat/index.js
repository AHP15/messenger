import connectDB from '../../../db/connect';

export default async function handler(req, res) {
  try {
    const DB = await connectDB();
    const Chat = DB.collection("chats");
    if (req.method === 'POST') {
      const chat = await Chat.insertOne(req.body);
    }
  } catch (err) {

  }
}