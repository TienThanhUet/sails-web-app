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
      listSinhVien({token:req.session.token}).then(function (body) {
        var content=JSON.parse(body);
        console.log(body);
        return res.view('KhoaViews/managerSinhVien',{username:req.session.username,listSv: content});
      })

  }
};

