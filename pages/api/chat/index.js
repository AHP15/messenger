import { ObjectId } from "mongodb";

import connectDB from '../../../db/connect';

export default async function handler(req, res) {
  try {
    const DB = await connectDB();
    const Chat = DB.collection("chats");

    if (req.method === 'POST') {
      const data = {
        ...req.body,
        messages: []
      }
      const chat = await Chat.insertOne(data);
      return res.status(201).send({
        success: true,
        chat: {
          ...data,
          id: chat.insertedId
        },
        message: 'Chat added successfully'
      });
    }

    if (req.method === 'GET') {
      const chat = await Chat.findOne({ _id: ObjectId(req.headers['id']) });
      return res.status(200).send({
        success: true,
        chat,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
}