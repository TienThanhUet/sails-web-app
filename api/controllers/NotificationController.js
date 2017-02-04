/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  showNotification:function(req,res){
    res.view('managerNotification',{username:req.session.username});
  }
};

