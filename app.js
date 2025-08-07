const express=require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv=require('dotenv');
const methodOverride = require('method-override');   //for PUT/DELETE via forms
const app=express();


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
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'));

app.set('view engine','ejs');

// task routes
const taskRoutes= require('./routes/taskRoutes');
app.use('/', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));