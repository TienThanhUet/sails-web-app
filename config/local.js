/**
 * Created by sm on 3/26/17.
 */
module.exports={
  ssl: {
    key: require('fs').readFileSync(__dirname + '/ssl/key.pem'),
    cert: require('fs').readFileSync(__dirname + '/ssl/cert.pem')
  },
}
