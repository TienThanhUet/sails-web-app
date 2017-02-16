/**
 * Created by smallmouse on 2/5/17.
 */
var request = require('request');

module.exports={
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
