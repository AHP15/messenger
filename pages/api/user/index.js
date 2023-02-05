import { ObjectId } from "mongodb";

import connectDB from '../../../db/connect';

export default async function handler(req, res) {
  try {
    const DB = await connectDB();
    const User = DB.collection("users");

    if (req.method === 'POST') {
      const alreadyExists = await User.aggregate([
        {
          $match: { email: req.body.email }
        },
        {
          $lookup:
          {
            from: "users",
            localField: "contacts",
            foreignField: '_id',
            as: "user_contacts"
          }
        }
      ]).toArray();

      if (!alreadyExists) {
        const data = {
          ...req.body,
          contacts: [],
          chats: [],
        };
        const user = await User.insertOne(data);
        return res.send({
          success: true,
          user: {
            id: user.insertedId,
            ...data
          },
        });
      }

      const user_contacts = alreadyExists[0].user_contacts.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        avatar: contact.image,
        status: contact.status,
      }));
      const userInfo = {
        id: alreadyExists[0]._id,
        name: alreadyExists[0].name,
        email: alreadyExists[0].email,
        image: alreadyExists[0].image
      };

      const Chat = DB.collection('chats');
      const user_chats = await Chat.find({
        users: {
          $eq: String(userInfo.id)
        }
      }).toArray();
      return res.send({
        success: true,
        user: {
          ...userInfo,
          contacts: user_contacts,
          chats: user_chats,
        },
      });
    }

    if (req.method === 'PUT') {
      const contact = await User.findOne({ email: req.body.email });
      if (!contact) {
        return res.status(404).send({
          success: false,
          message: `user with email ${req.body.email} doesn't exist`
        });
      }

      const filter = { _id: ObjectId(req.body.id) }
      const updateDoc = {
        $push: {
          contacts: contact._id
        },
      };
      const user = await User.updateOne(filter, updateDoc);
      const contact_data = {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        avatar: contact.image,
        status: contact.status,
      };
      return res.status(201).send({
        success: true,
        message: `user with email ${req.body.email} added successfully`,
        contact: contact_data,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    })
  }
}