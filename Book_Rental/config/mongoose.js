//require mongoose middleware to access mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booknook');
//create connection string
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));
db.once('open',function(){
    console.log('Successfully connected to database');
    
})