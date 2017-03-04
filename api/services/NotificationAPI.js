/**
 * Created by smallmouse on 2/15/17.
 */

var request=require('request');

module.exports={
  sendNotification:function (option,callback){
    console.log(option.formData);
    var role=req.session.role.toString().toLowerCase();
    request.post({url:sails.config.myconf.host+'/'+option.role+'/guithongbao?token='+option.token, formData: option.formData}, function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    callback(null,body);
    });
  },

  listNotificationSent:function (option,callback) {
    request(sails.config.myconf.host+'/'+option.role+'/list/thongbaodagui?token=' + option.token, function (error, response, body) {
      // console.log(body);
      callback(null, body);
    })
  }
}
