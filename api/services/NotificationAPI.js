/**
 * Created by smallmouse on 2/15/17.
 */

var request=require('request');

module.exports={
  sendNotification:function (option,callback){
    var role=req.session.role.toString().toLowerCase();
    request.post({url:sails.config.myconf.host+'/'+option.role+'/guithongbao?token='+option.token, formData: option.formData}, function optionalCallback(err, httpResponse, body) {
      if (err) {
        callback(err,null);
      }
    callback(null,body);
    });
  },

  listNotificationSent:function (option,callback) {
    request(sails.config.myconf.host+'/'+option.role+'/list/thongbaodagui?token=' + option.token, function (err, response, body) {
      // console.log(body);
      if (err) {
        callback(err,null);
      }else
      callback(null, body);
    })
  },

  detailsNotificationSent:function (option,callback) {
    request(sails.config.myconf.host+'/thongbao/'+option.id+'?token=' + option.token, function (err, response, body) {
      // console.log(body);
      if (err) {
        callback(err,null);
      }else
      callback(null, body);
    })
  }
}
