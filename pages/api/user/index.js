import connectDB from '../../../db/connect';

export default async function handler(req, res) {
  try {
    const DB = await connectDB();
    const User = DB.collection("users");
    const alreadyExists = await User.findOne({ email: req.body.email });
    
    if (!alreadyExists) {
      const data = {
        ...req.body,
        contacts: [],
        chats: [],
      };
      const user = await User.insertOne(data);
      res.send({
        success: true,
        user
      });
    } else {
      res.send({
        success: true,
        user: alreadyExists,
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    })
  }
}