/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
  sendScores: function (option,callback) {
    var listdiem=JSON.stringify(option.listdiem);
    request.post({
      url:sails.config.myconf.host+'/'+option.role+'/guithongbao/diem?token='+option.token,
      form:{list:listdiem}
    },function (err,httpResponse,body) {
      if(err)
        callback(err,null)
      callback(null,body);
    })
  },
}
