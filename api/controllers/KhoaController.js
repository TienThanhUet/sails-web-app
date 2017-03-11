/**
 * KhoaController
 *
 * @description :: Server-side logic for managing Khoas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');

module.exports = {
  managerSinhVien:function (req,res) {
      var listSinhVien=Promise.promisify(KhoaAPI.listSinhVien);
      var listLopChinh=Promise.promisify(LopChinhAPI.listLopChinh);
    Promise.all([listSinhVien({token:req.session.token}),listLopChinh({token:req.session.token})])
      .spread(function (body1,body2) {
        var content1=JSON.parse(body1);
        var content2=JSON.parse(body2);
        return res.view('KhoaViews/managerSinhVien',{username:req.session.username,listSv: content1,lopchinhs:content2});
      })
      .catch(function (err) {
        console.log(err);
        res.send(404);
      })

  }
};

