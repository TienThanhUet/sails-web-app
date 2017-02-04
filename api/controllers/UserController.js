/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
module.exports = {
  homepage: function (req, res) {
    if (req.session.role == 'GiangVien')
      return res.view('GiangVienViews/homepage', {username: req.session.username});//chuyen den trang giang vien
    if (req.session.role == 'Khoa')
      return res.view('KhoaViews/homepage', {username: req.session.username});// chuyen den trang khoa
    if (req.session.role == 'PhongBan')
      return res.view('PhongBanViews/homepage', {username: req.session.username});//chuyen den trang phong ban
  },

  login: function (req, res) {
    if (req.session.token != null) {
      return res.redirect('/');
    } else return res.view('login');
  },

  authenticate: function (req, res) {
    // xac thuc nguoi dung tu API
    ServiceAPI.authenticate({username: req.body.username, password: req.body.password}, function (err, body) {
      var content = JSON.parse(body);//phan tich body
      console.log(body);
      if (content.message == 'Enjoy your token!') {//neu ket qua la thanh cong thi lay thong tin profile
        req.session.token = content.token;
        ServiceAPI.profile({token: req.session.token}, function (err, body) {
          content = JSON.parse(body);
          console.log(body);
          req.session.role = content.metadata[0].role;
          //kiem tra doi tuong nguoi dung la ai ?
          if (req.session.role == 'SinhVien')
            return res.redirect('/logout');
          req.session.username = content.metadata[0].username;
          if (req.session.role == 'GiangVien')
            req.session.name = content.metadata[1].tenGiangVien;
          if (req.session.role == 'Khoa')
            req.session.name = content.metadata[1].tenKhoa;
          if (req.session.role == 'PhongBan')
            req.session.name = content.metadata[1].tenPhongBan;
          return res.redirect('/');
        })
      }
      else return res.redirect('/login');
    });

  },
  logout: function (req, res) {
    req.session.destroy();
    return res.redirect('/login');
  },
  account: function (req, res) {
    if (req.session.role == 'GiangVien')
      return res.view('GiangVienViews/profile_account', {
        username: req.session.username,
        role: req.session.role,
        name: req.session.name
      });
    if (req.session.role == 'Khoa')
      return res.view('KhoaViews/profile_account', {
        username: req.session.username,
        role: req.session.role,
        name: req.session.name
      });
    if (req.session.role == 'PhongBan')
      return res.view('PhongBanViews/profile_account', {
        username: req.session.username,
        role: req.session.role,
        name: req.session.name
      });
    else return res.redirect('/login')
  }
};

