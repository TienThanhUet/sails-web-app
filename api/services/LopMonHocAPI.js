/**
 * Created by smallmouse on 2/8/17.
 */
var request=require('request');

module.exports={
  listLopMonHoc:function (option,callback) {
    request(' http://localhost:3000/lopmonhoc?token=' + option.token, function (error, response, body) {
      // console.log(body);
      callback(null, body);
    })
  }
}
