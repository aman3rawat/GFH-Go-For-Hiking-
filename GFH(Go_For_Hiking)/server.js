const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); // use of environmental variable

const app = require('./app');

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT}`);
})
