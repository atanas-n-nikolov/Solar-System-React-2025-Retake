import { Schema, model, Types } from 'mongoose';

const questionSchema = new Schema({
  _ownerId: {
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
  },
  _createdOn: {
    type: Number,
    required: true,
  },
  _id: {
    type: String,
    required: true,
  },
});

const quizSchema = new Schema({
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: true,
  },
  quiz: [questionSchema],
});

const Quiz = model('Quiz', quizSchema);

export default Quiz;
