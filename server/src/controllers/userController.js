import Profile from '../models/Profile.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export async function getProfile(req, res, next) {
  try {
    const userId = req.headers['x-user-id'] || req.headers['x-demo-user'];
    if (!userId) return res.json({});
    let profile = await Profile.findOne({ userId }).lean();
    if (!profile && mongoose.Types.ObjectId.isValid(userId)) {
      const u = await User.findById(userId).lean();
      if (u) {
        profile = await Profile.findOne({ $or: [{ userId: u._id.toString() }, { email: u.email }] }).lean();
      }
    }
    if (!profile) {
      profile = await Profile.findOne({ email: userId }).lean();
    }
    res.json(profile || {});
  } catch (e) {
    next(e);
  }
}

export async function saveProfile(req, res, next) {
  try {
    const userId = req.body.userId || req.headers['x-user-id'] || req.headers['x-demo-user'];
    if (!userId) return res.status(400).json({ message: 'User ID is required' });
    const copy = { ...req.body, userId };
    delete copy._id;
    const profile = await Profile.findOneAndUpdate({ userId }, copy, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });
    res.json(profile);
  } catch (e) {
    next(e);
  }
}
