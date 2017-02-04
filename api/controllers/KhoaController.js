/**
 * KhoaController
 *
 * @description :: Server-side logic for managing Khoas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addSinhVien:function (req,res) {
    return res.view('KhoaViews/addSinhVien',{username:req.session.username})
  }
};

