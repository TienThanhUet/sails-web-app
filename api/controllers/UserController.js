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
    var funcKhoa = Promise.promisify(KhoaAPI.listKhoa);
    Promise.all([funcLopchinhs({token: req.session.token}),
      funcLopMonHocs({token: req.session.token}),
      funcLoaiThongBao({token: req.session.token}),
      funcMucDoThongBao({token: req.session.token}),
      funcKhoa({token: req.session.token})
    ])
      .spread(function (body1,body2,body3,body4,body5) {
        var lopchinhs = JSON.parse(body1);
        var lopMonHocs = JSON.parse(body2);
        var loaithongbaos = JSON.parse(body3);
        var mucdothongbaos = JSON.parse(body4);
        var khoas=JSON.parse(body5)

        if (req.session.role == 'GiangVien'||req.session.role =='Khoa'||req.session.role =='PhongBan')
              return res.view(req.session.role+'Views/homepage',
                {username: req.session.username,
                  lopmonhocs:lopMonHocs,
                  lopchinhs:lopchinhs,
                  loaithongbaos:loaithongbaos,
                  mucdothongbaos:mucdothongbaos,
                  khoas:khoas,
                  token:req.session.token,
                  host:sails.config.myconf.host
                });//chuyen den trang homepage
        })
      .catch(function (err) {
        console.log(err);
        res.view('404');
      })


  },

  login: function (req, res) {
    if (req.session.token) {
      return res.redirect('/');
    } else return res.view('login');
  },

  authenticate: function (req, res) {
    // xac thuc nguoi dung tu API
    UserAPI.authenticate({username: req.body.username, password: req.body.password}, function (err, body) {
      if(err){
        res.view('404')
      }
      else {
        // console.log(body);
        console.log("User Login")
        var content = JSON.parse(body);//phan tich body
        if (content.message == 'Enjoy your token!') {//neu ket qua la thanh cong thi lay thong tin profile
          req.session.token = content.token;
          UserAPI.profile({token: req.session.token}, function (err, body) {
            content = JSON.parse(body);
            // console.log(body);
            req.session.role = content.role;
            //kiem tra doi tuong nguoi dung la ai ?
            if (req.session.role == 'SinhVien')
              return res.redirect('/logout');
            if (req.session.role == 'GiangVien'||req.session.role == 'Khoa'||req.session.role == 'PhongBan')
              req.session.username = content.username;
            return res.redirect('/');
          })
        }
        else return res.redirect('/login');
        }
    });

  },

  logout: function (req, res) {
    req.session.destroy();
    return res.redirect('/login');
  },

  account: function (req, res) {
    if (req.session.role == 'GiangVien') {
      UserAPI.profileGiangVien({token: req.session.token}, function (err, body) {
        if(err)
          return res.view('404')
        else{
          var content = JSON.parse(body);
          req.session.name = content.profile.tenKhoa;
          return res.view('GiangVienViews/profile_account', {
            username: req.session.username,
            role: req.session.role,
            name: req.session.name
          });
        }
      });
    }
    else if (req.session.role == 'Khoa') {
      UserAPI.profileKhoa({token: req.session.token}, function (err, body) {
        if(err)
          return res.view('404')
        else {
          var content = JSON.parse(body);
          req.session.name = content.profile.tenKhoa;
          return res.view('KhoaViews/profile_account', {
            username: req.session.username,
            role: req.session.role,
            name: req.session.name
          });
        }
      });
    }
    else if (req.session.role == 'PhongBan') {
      UserAPI.profilePhongBan({token: req.session.token}, function (err, body) {
        if(err)
          return res.view('404')
        else {
          var content = JSON.parse(body);
          req.session.name = content.profile.tenPhongBan;
          return res.view('PhongBanViews/profile_account', {
            username: req.session.username,
            role: req.session.role,
            name: req.session.name
          });
        }
      })
    }
    else return res.redirect('/login')
  },

  screenLock:function (req,res) {
    res.view('screen_lock');
  }
};

