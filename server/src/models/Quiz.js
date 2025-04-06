import { Schema, model, Types } from 'mongoose';

const quizSchema = new Schema({
  ownerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  category: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true,
  },
  options: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length >= 2;
      },
      message: 'Трябва да има поне два варианта за отговор.',
    },
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return this.options.includes(v);
      },
      message: 'Правилният отговор трябва да е един от вариантите.',
    },
  }
},
{
  timestamps: true,
});

const Quiz = model('Quiz', quizSchema, 'questions');

export default Quiz;
