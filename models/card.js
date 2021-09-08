import { Schema, model } from 'mongoose';
// import user from './user';

const cardSchema = new Schema({
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
   },
});

export default model('card', cardSchema);