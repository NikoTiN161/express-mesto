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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
   },
   likes: {
      type: Array(mongoose.Schema.Types.ObjectId),
      default: void 0,

   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
},
   { versionKey: false }
);

export default mongoose.model('card', cardSchema);