import { Schema, model, Types } from 'mongoose';

const eventSchema = new Schema({
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
  source: {
    type: String,
    required: true,
  },
});

const dayFactsSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  events: [eventSchema],
  ownerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Facts = model('Facts', dayFactsSchema);

export default Facts;
