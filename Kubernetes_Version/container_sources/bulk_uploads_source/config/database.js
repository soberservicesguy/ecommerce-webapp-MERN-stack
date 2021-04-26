const mongoose = require('mongoose');


// mongoose.connect('mongodb://mongodb:27017/db_for_boiler_plate', { // FOR DOCKER
// mongoose.connect('mongodb://appointment-mongodb-service:27017/db_for_boiler_plate', { // FOR KUBERNETES
mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_SERVER}`, { // FOR KUBERNETES
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});