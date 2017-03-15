/**
 * Created by smallmouse on 2/8/17.
 */
var request=require('request');

module.exports={
  listLopMonHoc:function (option,callback) {
    request(sails.config.myconf.host+'/lopmonhoc?token=' + option.token, function (err, response, body) {
      if(err)
        callback(err,null);
      else
        callback(null,body);
    })
  }
}
