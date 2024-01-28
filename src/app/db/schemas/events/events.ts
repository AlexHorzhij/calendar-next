import mongoose, { Schema } from 'mongoose';

const eventsSchema = new Schema(
  {
    start: Number,
    duration: Number,
    title: String,
    user_id: String,
  },
  { versionKey: false, timestamps: false }
);

export default mongoose.models['event']
  ? mongoose.model<IEvent>('event')
  : mongoose.model<IEvent>('event', eventsSchema);
