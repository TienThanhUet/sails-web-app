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

  //api lay thong tin nguoi dung
  profile: function (option, callback) {
    request(' http://localhost:3000/users/profile?token=' + option.token, function (error, response, body) {
      callback(null, body);
    })
  },

  sendScores: function (option,callback) {

  },
  // phai sua lai
  //api them sinh vien
  addSinhVien: function (option, callback) {
    request.post({
        url: 'http://localhost:3000/users/addSinhVien?token=' + option.token,
        form: {username: option.username, password: option.password,tenSinhVien:option.tenSinhVien,idLopMonHoc:option.idLopMonHoc,idLopChinh:option.idLopChinh}
      },
      function (err, httpResponse, body) {
        callback(null, body);
      })
  },


}
