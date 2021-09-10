import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import cardsRouter from './routes/cards.js';
const { PORT = 3000 } = process.env;


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
   req.user = {
      _id: '61390c9ea59ff97449fd629c'
   };

   next();
});
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
   console.log(`App started on port ${PORT}`)

})