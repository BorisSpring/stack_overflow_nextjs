import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username?: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  joinedAt: Date;
  saved: Schema.Types.ObjectId[];
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, 'Name must be at most 20 charachters'],
  },
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  bio: String,
  picture: String,
  location: String,
  portfolioWebsite: String,
  reputation: { type: Number, default: 0 },
  joinedAt: { type: Date, required: true, default: Date.now },
  saved: [
    { type: Schema.Types.ObjectId, ref: 'SomeOtherModel', required: false },
  ],
});

const User = models.User || model('User', UserSchema);

export default User;
