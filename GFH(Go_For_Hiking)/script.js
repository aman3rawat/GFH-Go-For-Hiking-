const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('./Models/tourModel');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (err)
        console.log(err);
    else
        console.log(con.connection);
});

const tour = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/tourData.json`));

const importData = async () => {
    try {
        await Tour.create(tour);
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Successfully Deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

