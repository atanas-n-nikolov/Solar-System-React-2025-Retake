import { Schema, model, Types } from 'mongoose';

const dayFactsSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Facts = model('Facts', dayFactsSchema);

export default Facts;
