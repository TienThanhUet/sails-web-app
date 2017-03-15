/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
  sendScores: function (option,callback) {
    var infoLopMonHoc=JSON.stringify(option.infoLopMonHoc);
    var listdiem=JSON.stringify(option.listdiem);
    request.post({
      url:sails.config.myconf.host+'/'+option.role+'/guithongbao/diem?token='+option.token,
      form:{infoLopMonHoc:infoLopMonHoc,list:listdiem}
    },function (err,httpResponse,body) {
      if(err)
        callback(err,null);
      else
        callback(null,body);
    })
  },
}
