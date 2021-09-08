import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
const { PORT = 3000 } = process.env;


const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
   useNewUrlParser: true
});

app.use('/users', userRouter)

app.listen(PORT, () => {
   console.log(`App on port ${PORT}`)

})