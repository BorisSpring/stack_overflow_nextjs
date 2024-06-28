import { Schema, model, models, Document } from 'mongoose';

interface IAnswer extends Document {
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  content: string;
  createdAt: Date;
}

const answerSchema = new Schema<IAnswer>({
  content: {
    type: String,
    required: true,
    minLength: [5, 'Content must be at least 5 characters long!'],
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Answer = models?.Answer || model<IAnswer>('Answer', answerSchema);

export default Answer;
