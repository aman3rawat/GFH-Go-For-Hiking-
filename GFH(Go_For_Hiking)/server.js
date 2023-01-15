const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
//console.log(app);
const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT}`);
})

