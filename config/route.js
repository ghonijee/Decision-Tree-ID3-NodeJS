const id3  = require('../controller/controller');
const cors = require('cors');
// const db   = require('./database');

module.exports = function(app){
  app.route('/test').post(cors(), id3.index);
//   app.route('/analisis').get(cors(), Kos.analisis);
//   app.route('/kos').post(cors(), Kos.insert);
//   app.route('/kos/:nama').delete(cors(), Kos.delete);
}