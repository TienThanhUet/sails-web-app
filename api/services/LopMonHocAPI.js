/**
 * Created by smallmouse on 2/8/17.
 */
var request=require('request');

module.exports={
  listLopMonHoc:function (option,callback) {
    request(sails.config.myconf.host+'/lopmonhoc?token=' + option.token, function (error, response, body) {
      // console.log(body);
      callback(null, body);
    })
  }
}
