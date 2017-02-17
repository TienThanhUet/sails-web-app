/**
 * Created by smallmouse on 2/15/17.
 */

var request=require('request');

module.exports={
  sendNotification:function (option,callback){
    console.log(option.formData);
    request.post({url:'http://localhost:3000/phongban/guithongbao?token='+option.token, formData: option.formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    callback(null,body);
    });
  },

  listNotification:function (option,callback) {
    request(' http://localhost:3000/thongbao?token=' + option.token, function (error, response, body) {
      // console.log(body);
      callback(null, body);
    })
  }
}
