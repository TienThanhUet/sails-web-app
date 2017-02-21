/**
 * Created by smallmouse on 2/16/17.
 */
/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
  listMucDoThongBao:function (option,callback) {
    request(sails.config.myconf.host+'/mucdothongbao?token=' + option.token, function (error, response, body) {
      // console.log(body);
      callback(null, body);
    })
  }
}
