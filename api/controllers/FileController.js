/**
 * FileController
 *
 * @description :: Server-side logic for managing Files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var express = require('express');
var async = require('async');

module.exports = {

  fileDiem: function (req, res) {
    return res.view(req.session.role+'Views/fileDiem', {username: req.session.username})
  },
  uploadFileDiem: function (req, res) {
    req.file('filediem').upload({
      maxBytes: 10000000
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }

      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }


      if (typeof require !== 'undefined') XLSX = require('xlsx');
      var workbook = XLSX.readFile(uploadedFiles[0].fd);

      var sheet_name_list = workbook.SheetNames;
      sheet_name_list.forEach(function (y) { /* iterate through sheets */
        var worksheet = workbook.Sheets[y];
        var numberRow = 0;
        async.waterfall([
          function funciton1(callback) {
            var begin; //cot dau tien chua so STT cua sinh vien
            var beginFromNumberRow; // hang dau tien chua tu 'STT'
            var result;
            for (z in worksheet) {
              /* all keys that do not begin with "!" correspond to cell addresses */
              if (z[0] === '!') continue;

              if (JSON.stringify(worksheet[z].v).indexOf("STT") >= 0) {
                var begin = z.charAt(0);
                var beginFromNumberRow = retnum(z);
                result = {
                  begin: begin,
                  beginFromNumberRow: parseInt(beginFromNumberRow) //string to number
                }
                callback(null, result);
              }
            }
          },
          function function2(kq, callback) {

            var beginFromNuberRow = kq.beginFromNumberRow;//hang chua 'STT'
            var mang = new Array(); // mang chua cac hang trong exel co gia tri la cac so thu tu cua sinh vien
            //console.log(beginFromNuberRow);
            for (z in worksheet) {
              /* all keys that do not begin with "!" correspond to cell addresses */
              if (z[0] === '!') continue;

              if (z.indexOf(kq.begin) >= 0) {  //yeu cau gia tri cua o phai chua ki tu o funciton 1

                if (retnum(z) > beginFromNuberRow && !isNaN(worksheet[z].v)) { //tinh tu hang chua 'STT' duyet tat ca cac so thu tu, neu k phai so thu tu k lay
                  //console.log(retnum(z));
                  mang.push(parseInt(retnum(z)));//add hang exel vao mang
                }
              }
            }
            //console.log(mang);
            var result = {
              beginSV: mang[0], //so thu tu hang trong exel chua sinh vien dau tien
              endSV: mang[mang.length - 1],// so tu tu trong exel chua sinh vien cuoi cung
              rowSTT: beginFromNuberRow,//so thu tu cua hang chua 'STT'
              colSTT: kq.begin //cot exel chua 'STT'
            }
            // console.log(result);

            callback(null, result);
          },
          function function3(kq, callback) {
            var tenMonHoc;
            var tenGv;
            var tenLopMonHoc;
            var tenKiHoc;

            //===========================
            var array = [];
            var Objects = [];
            var all=[];
            var mang = [];
            for (z in worksheet) {
              /* all keys that do not begin with "!" correspond to cell addresses */
              if (z[0] === '!') continue;
              //============================================================
              //============================================================

              if (JSON.stringify(worksheet[z].v).indexOf("Môn học") > -1) {
                var columnMh = String.fromCharCode(67 + (z.charCodeAt(0) - 65));//tinh them 2 o nua
                var row = parseInt(retnum(z));
                tenMonHoc = worksheet[columnMh + row].v;
              }
              if (JSON.stringify(worksheet[z].v).indexOf("Giảng viên:") > -1) {
                var columnGv = String.fromCharCode(67 + (z.charCodeAt(0) - 65));//tinh them 2 o nua
                var row = parseInt(retnum(z));
                tenGv = worksheet[columnGv + row].v;
              }
              if (JSON.stringify(worksheet[z].v).indexOf("Lớp môn học") > -1) {
                var columnLopmh = String.fromCharCode(67 + (z.charCodeAt(0) - 65));//tinh them 2 o nua
                var row = parseInt(retnum(z));
                tenLopMonHoc = worksheet[columnLopmh + row].v;
              }
              if (JSON.stringify(worksheet[z].v).indexOf("Năm học") > -1) {
                tenKiHoc = worksheet[z].v;
              }

              //=========================================================
              //=========================================================

              if (parseInt(retnum(z)) === kq.beginSV) {
                mang.push(z);
              }
            }
            var infomationLopMonHoc = {
              tenKiHoc: tenKiHoc,
              tenGiangVien: tenGv,
              tenLopMonHoc: tenLopMonHoc,
              monHoc: tenMonHoc
            }
            console.log(infomationLopMonHoc);

            //console.log(mang);

            //ten column cuoi cung co chua thong tin cua sinh vien
            var NameColumn = mang[mang.length - 1].charAt(0);
            //console.log(NameColumn);
            var gan = [];
            for (var i = 0; i < mang.length; i++) {
              gan[i] = String.fromCharCode(65 + i);
            }
            //console.log(gan[0]+kq.beginSV);
            for (var i = kq.beginSV; i <= kq.endSV; i++) {
              // var dem=0;
              var object = new Object({
                MSV: worksheet[gan[1] + i].v,
                diemThanhPhan: worksheet[gan[5] + i].v,
                diemCuoiKi: worksheet[gan[6] + i].v,
                tongDiem: worksheet[gan[7] + i].v,
              })
              Objects.push(object);
            }
            var infoLopMonHoc={
              tenLopMonHoc:infomationLopMonHoc.tenLopMonHoc,
              tenGiangVien:infomationLopMonHoc.tenGiangVien,
            };
            all.push(infoLopMonHoc);
            all.push(Objects);
            callback(null, all);
          }

        ], function (err, result) {
          if (err) {
            console.error(err);
            // res.json({result:"Phân tích bảng điểm lỗi!"})
          }
          console.log(result);
          var role=req.session.role.toString().toLowerCase();
          FileAPI.sendScores({token:req.session.token,role:role,infoLopMonHoc:result[0],listdiem:result[1]},function (err,body) {
            if(err){
              // res.json({result:"Gửi dữ liệu đến service thất bại!"})
            }
            console.log(body);
            // res.json({result:"Gửi dữ liệu thành công"})
          })
        })
      });

      function retnum(str) {
        var num = str.replace(/[^0-9]/g, '');
        return num;
      }
    });
  }
};

