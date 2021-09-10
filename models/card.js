import mongoose from 'mongoose';
// import user from './user';

const cardSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
   },
   link: {
      type: String,
      required: true,
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
   },
   likes: {
      type: Array(Schema.Types.ObjectId),
      default: void 0,

   },
   createdAt: {
      type: Date,
      default: Date.now,
   }
});

export default mongoose.model('card', cardSchema);