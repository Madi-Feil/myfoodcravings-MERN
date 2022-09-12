const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => (`Listening to port: ${port}`));

require('./config/mongoose.config');
require('./routes/food.routes')(app);