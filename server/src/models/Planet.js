import { Schema, Types, model } from 'mongoose';

const planetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Star', 'Planet'],
  },
  image: {
    type: String,
    required: true,
  },
  distanceToSun: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      _id: { type: Types.ObjectId, default: () => new Types.ObjectId() },
      user: { type: Types.ObjectId, ref: 'User' },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    }
  ],
  owner: { type: Types.ObjectId, ref: 'User', required: true },
});

const Planet = model('Planet', planetSchema);

export default Planet;
