import { Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const answerSchema = new Schema({
  questionId: { type: String, ref: 'Quiz', required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  answeredOn: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  password: { type: String, required: true },
  answers: [answerSchema],
  comments: [{ type: Types.ObjectId, ref: 'Planet' }],
  role: { 
    type: String, 
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
})

const User = model('User', userSchema);

export default User;
