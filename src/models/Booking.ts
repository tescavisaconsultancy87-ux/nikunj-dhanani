import mongoose, { Schema } from "mongoose";

export interface IBooking {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt?: Date;
}

const BookingSchema: Schema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  serviceType: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
