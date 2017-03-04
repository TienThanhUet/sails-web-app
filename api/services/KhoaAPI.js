/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
  addSinhVien: function (option, callback) {
    request.post({
        url: sails.config.myconf.host+'/users/addSinhVien?token=' + option.token,
        form: {username: option.username, password: option.password,tenSinhVien:option.tenSinhVien,idLopMonHoc:option.idLopMonHoc,idLopChinh:option.idLopChinh}
      },
      function (err, httpResponse, body) {
        callback(null, body);
      })
  },

  listSinhVien:function (option,callback) {
    request.get(sails.config.myconf.host+'/sinhvien/?token='+option.token,function (err,httpResponse,body) {
      callback(null,body);
    })
  }
}
