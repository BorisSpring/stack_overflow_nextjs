import { model, models, Schema, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  createdOn: Date;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
}

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: [15, 'Tag name must be below 15 chars!'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: [150, 'Tag description must be below 150 chars!'],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;
