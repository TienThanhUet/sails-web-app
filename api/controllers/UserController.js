/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Promise = require('bluebird');

module.exports = {
  homepage: function (req, res) {
    var funcLopchinhs = Promise.promisify(LopChinhAPI.listLopChinh);
    var funcLopMonHocs = Promise.promisify(LopMonHocAPI.listLopMonHoc);
    var funcLoaiThongBao = Promise.promisify(LoaiThongBaoAPI.listLoaiThongBao);
    var funcMucDoThongBao = Promise.promisify(MucDoThongBaoAPI.listMucDoThongBao);
    Promise.all([funcLopchinhs({token: req.session.token}),funcLopMonHocs({token: req.session.token}),funcLoaiThongBao({token: req.session.token}),funcMucDoThongBao({token: req.session.token})])
      .spread(function (body1,body2,body3,body4) {
        var lopchinhs = JSON.parse(body1);
            // console.log(body1);
        var lopMonHocs = JSON.parse(body2);
            // console.log(body2);
        var loaithongbaos = JSON.parse(body3);
        var mucdothongbaos = JSON.parse(body4);

        if (req.session.role == 'GiangVien')
              return res.view('GiangVienViews/homepage', {username: req.session.username,lopmonhocs:lopMonHocs,lopchinhs:lopchinhs,loaithongbaos:loaithongbaos,mucdothongbaos:mucdothongbaos,token:req.session.token});//chuyen den trang giang vien
            if (req.session.role == 'Khoa')
              return res.view('KhoaViews/homepage', {username: req.session.username,lopmonhocs:lopMonHocs, lopchinhs:lopchinhs,loaithongbaos:loaithongbaos,mucdothongbaos:mucdothongbaos,token:req.session.token});// chuyen den trang khoa
            if (req.session.role == 'PhongBan')
              return res.view('PhongBanViews/homepage', {username: req.session.username,lopmonhocs:lopMonHocs, lopchinhs:lopchinhs,loaithongbaos:loaithongbaos,mucdothongbaos:mucdothongbaos,token:req.session.token});//chuyen den trang phong ban

      })
      .catch(function (err) {
        console.log(err);
        res.send(404);
      })


  },

  login: function (req, res) {
    if (req.session.token != null) {
      return res.redirect('/');
    } else return res.view('login');
  },

  authenticate: function (req, res) {
    // xac thuc nguoi dung tu API
    UserAPI.authenticate({username: req.body.username, password: req.body.password}, function (err, body) {
      var content = JSON.parse(body);//phan tich body
      console.log(body);
      if (content.message == 'Enjoy your token!') {//neu ket qua la thanh cong thi lay thong tin profile
        req.session.token = content.token;
        UserAPI.profile({token: req.session.token}, function (err, body) {
          content = JSON.parse(body);
          console.log(body);
          req.session.role = content.role;
          //kiem tra doi tuong nguoi dung la ai ?
          if (req.session.role == 'SinhVien')
            return res.redirect('/logout');
          if (req.session.role == 'GiangVien')
            req.session.username = content.username;
          if (req.session.role == 'Khoa')
            req.session.username = content.username;
          if (req.session.role == 'PhongBan')
            req.session.username = content.username;
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
    if (req.session.role == 'GiangVien') {
      UserAPI.profileGiangVien({token: req.session.token}, function (err, body) {
        var content = JSON.parse(body);
        req.session.name = content.profile.tenKhoa;
        return res.view('GiangVienViews/profile_account', {
          username: req.session.username,
          role: req.session.role,
          name: req.session.name
        });
      });
    }
    else if (req.session.role == 'Khoa') {
      UserAPI.profileKhoa({token: req.session.token}, function (err, body) {
        var content = JSON.parse(body);
        req.session.name = content.profile.tenKhoa;
        return res.view('KhoaViews/profile_account', {
          username: req.session.username,
          role: req.session.role,
          name: req.session.name
        });
      });
    }
    else if (req.session.role == 'PhongBan') {
      UserAPI.profilePhongBan({token: req.session.token}, function (err, body) {
        var content = JSON.parse(body);
        req.session.name = content.profile.tenPhongBan;
        return res.view('PhongBanViews/profile_account', {
          username: req.session.username,
          role: req.session.role,
          name: req.session.name
        });
      })
    }
    else return res.redirect('/login')
  }
};

