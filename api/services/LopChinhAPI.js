/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
  listLopChinh:function (option,callback) {
    request(sails.config.myconf.host+'/lopchinh?token=' + option.token, function (error, response, body) {
      // console.log(body);
      callback(null, body);
    })
  }
}
