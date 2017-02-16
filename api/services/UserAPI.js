/**
 * Created by smallmouse on 1/21/17.
 */
var request = require('request');

//=============================================


module.exports = {
  //api xac thuc nguoi dung
  authenticate: function (option, callback) {
    request.post({
      url: ' http://localhost:3000/users/authenticate',
      form: {username: option.username, password: option.password}
    }, function (err, httpResponse, body) {
      callback(null, body);
    })
  },

  //api lay thong tin user
  profile: function (option, callback) {
    request(' http://localhost:3000/users/profile?token=' + option.token, function (error, response, body) {
      callback(null, body);
    })
  },
  //api lay thong tin user
  profileKhoa: function (option, callback) {
    request(' http://localhost:3000/khoa/profile?token=' + option.token, function (error, response, body) {
      callback(null, body);
    })
  },
  //api lay thong tin user
  profileGiangVien: function (option, callback) {
    request(' http://localhost:3000/giangvien/profile?token=' + option.token, function (error, response, body) {
      callback(null, body);
    })
  },
  //api lay thong tin user
  profilePhongBan: function (option, callback) {
    request(' http://localhost:3000/phongban/profile?token=' + option.token, function (error, response, body) {
      callback(null, body);
    })
  },
}
