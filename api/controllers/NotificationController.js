/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
"use strict";
var fs = require('fs');
var Promise = require('bluebird');
var async = require('async');


module.exports = {
  showNotification: function (req, res) {
    var funcNotif=Promise.promisify(NotificationAPI.listNotification);
    funcNotif({token:req.session.token}).then(function (body) {
      var notifs=JSON.parse(body);
      res.view(req.session.role+'Views/managerNotification', {username: req.session.username,notifs:notifs});
    })
  },
  sendNotification: function (req, res) {
    console.log(req.body);
    var notification = {
      categoryReceiver: req.body.categoryreceiver,
      receiverLopChinh:req.body.receiverlopchinh,
      receiverLopMonHoc:req.body.receiverlopmonhoc,
      tieuDe: req.body.tieude,
      loaiThongBao:req.body.loaithongbao,
      mucDoThongBao: req.body.mucdothongbao,
      noiDung: req.body.noidung,
      file_length:req.body.file_length,
    }
    /**
     @param namefile:mang ten cac file upload
     @param arrfile :chua cac file sau khi da upload
     @param filename: ten file
     */
      // var arrfile=[];
      // var namefile=[];
      // for(var pos=0;pos<req.body.file_length;pos++){
      //   namefile.push('file_'+pos);
      // }
      // Promise.reduce(namefile,function (notification, fileName) {
      //   // var stt=namefile.charAt(namefile.length-1);
      //   var funcupload =Promise.promisify(req.file(fileName).upload);
      //   return funcupload({maxBytes: 10000000}).then(function (uploadedFiles) {
      //     if (err) {
      //       return res.negotiate(err);
      //     }
      //     if (uploadedFiles.length === 0) {
      //       return res.end("no file");
      //     }
      //     console.log(notification);
      //     return notification;
      //   });
      //
      // },notification).then(function (notifcation) {
      //   console.log("file upload success");
      // });
    var arrFunc = [];
    arrFunc.push(function (callback) {
      callback(null, []);
    })
    for (let i=0;i <req.body.file_length; i++) {
      var uploadFile = function (arrFile, callback) {
        console.log('file_' + i);
        req.file('file_' + i).upload({maxBytes: 10000000}, function (err, uploadedFiles) {
          if (err) {
            return res.negotiate(err);
          }
          if (uploadedFiles.length === 0) {
            return res.end("no file");
          }
          arrFile.push(uploadedFiles[0].fd);
          callback(null, arrFile);
        })
      }

      arrFunc.push(uploadFile);
    }

    async.waterfall(arrFunc, function (err, arrFile) {
      if (err) {
        console.log(err);
      }
      notification.arrayFile=arrFile;
      var role=req.session.role.toString().toLowerCase();
      NotificationAPI.sendNotification({token:req.session.token,role:role,formData:notification},function (err,body) {
        console.log(body);
      })
    })

    var response = {
      status: 200,
      success: "Notification send success"
    }
    res.end(JSON.stringify(response));
  }
}

