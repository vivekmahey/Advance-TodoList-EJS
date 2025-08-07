const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv=require('dotenv');
const methodOverride = require('method-override');   //for PUT/DELETE via forms
const app=express();
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");



dotenv.config();

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected !!")
}).catch((err)=>{
    console.log(err)
});

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.set('view engine','ejs');




app.use(session({
  secret: process.env.SESSION_SECRET || "secret123",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));






// task routes
const taskRoutes= require('./routes/taskRoutes');
app.use('/', taskRoutes);
app.use("/", authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));