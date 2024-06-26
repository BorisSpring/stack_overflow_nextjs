import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
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

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [20, 'Name must be at most 20 charachters'],
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  bio: { type: String, required: false },
  picture: { type: String, required: false },
  location: { type: String, required: false },
  portfolioWebsite: { type: String, required: false },
  reputation: { type: Number, required: false, default: 0 },
  joinedAt: { type: Date, required: true, default: Date.now },
  saved: [
    { type: Schema.Types.ObjectId, ref: 'SomeOtherModel', required: false },
  ],
});

const User = models.User || model('User', UserSchema);

export default User;
