const express    = require('express');
const bodyParser = require('body-parser');
const db         = require('./config/database');
const route      = require('./config/route');
const cors       = require('cors');
const app        = express();
const port       = 8080;

//config body parse
app.use(bodyParser.urlencoded({
    extended:true
  }));

app.use(bodyParser.json());
app.options('*', cors())
//inisialisasi route
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    db.connect(()=> {
        console.log('db sukses');
    })
});