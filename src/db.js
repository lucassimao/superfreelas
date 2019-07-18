const mongoose = require('mongoose')
const config = require('./config')
const process = require('process')

var gracefulExit = function() {
    mongoose.connection.close(function() {
        console.error(
            'Mongoose default connection with DB : is disconnected through app termination'
        )
        process.exit(0)
    })
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)

mongoose.connection.on('error', (error)=>{
    console.log('There was a problem during establishing db connection');
    console.error(error);
    process.exit(-1);
});

// When the connection is disconnected
// mongoose.connection.on('disconnected', function () {
//     console.log('Mongoose default connection to DB disconnected');
//   });

// mongoose.connection.once('open', function() {
//   // we're connected!
// });


module.exports = {
    connect: () => mongoose.connect(config.dbUrl, { useNewUrlParser: true ,auto_reconnect: true}),
    disconnect: callback => mongoose.connection.close(callback),
}
