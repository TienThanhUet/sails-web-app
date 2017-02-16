/**
 * KhoaController
 *
 * @description :: Server-side logic for managing Khoas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addSinhVien:function (req,res) {
    LopChinhAPI.listLopChinh({token: req.session.token},function (err,body) {
      var content=JSON.parse(body);
      console.log(body);
      return res.view('KhoaViews/addSinhVien',{username:req.session.username,lopchinhs:content});
    })
  }
};

