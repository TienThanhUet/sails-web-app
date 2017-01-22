/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  fileDiem:function (req,res) {
    return res.view('fileupload',{username:req.session.username})
  }
};

