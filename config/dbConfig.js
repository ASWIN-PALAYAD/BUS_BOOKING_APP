// const mongoose = require('mongoose');

// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL);

// const db = mongoose.connection;

// db.on('connected',()=> {
//     console.log('Mongo db connection successfull');
// } );

// db.off('error',()=> {
//     console.log('mongo db connection failed');
// })

const mongoose = require('mongoose')

const connectDB = (url) => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url)
}

module.exports = connectDB