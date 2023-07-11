require('./config/configDB')
const userRouter = require('./routes/route');
const express = require('express');
PORT = process.env.PORT || 3336
const app = express();

app.use(express.json());


app.get('/', (req, res)=>{
    res.send('Session User Authentication And Authorization')
})

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
})





const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: process.env.DB_DATABASE,
  collection: 'mySessions',
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // expiresAfterSeconds: 60 * 60 * 24 * 14 ,
  // cookie: {
  //   maxAge: 60 * 60 * 1000, // 1 hour
  // },
//   cookie: { secure: true },
  store: store
}));


app.use('/api', userRouter);

module.exports = MongoDBStore