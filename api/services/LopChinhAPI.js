/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
  listLopChinh:function (option,callback) {
    request(sails.config.myconf.host+'/lopchinh?token=' + option.token, function (err, response, body) {
      if(err)
        callback(err,null);
      else
        callback(null,body);
    })
  }
}
