/**
 * Created by smallmouse on 2/2/17.
 */
var sttAttribute = 1;
// them loai thong bao
function addAttribute() {
  $("#data-repeater-item").append("<select  name='loaithongbao[" + (sttAttribute++) + "]' class='form-control form-filter input-sm category_notif' style='margin-bottom: 5px;'> <option value='0'>Select...</option> <option value='1'>Điểm Thi</option> <option value='2'>Lịch Thi</option> <option value='3'>Lịch Học</option></select>");
}

//xoa loai thong bao
function deleteAttribute() {
  if (sttAttribute == 1) return;
  sttAttribute--;
  $("#data-repeater-item select:last-child").remove();

}

var sttFile = 1;
function addFileNoti() {
  $('#file-repeater').append("<input type='file' class='btn btn-primary file_push'  name='files[" + (sttFile++) + "]' multiple='' style='margin: 0'>");
}

function deleteFileNoti() {
  sttFile--;
  $('#file-repeater input:last-child').remove();
}

function showListreceiver() {
  if ($(this).val() == 'lop') {
    alert('ok ok');
    document.getElementById('lopchinhs').style.display = "block";
    $('#lopchinhs').css('display', 'block');
  }
};

function sendNotification() {
  var formData = new FormData();
  // loai nguoi nhan
  var categoryReceiver=$('#receiver').val();
  formData.append("categoryReceiver",categoryReceiver);
  switch(categoryReceiver) {
    case "Khoa":
      formData.append("idReceiver", 'ALL');
      break;
    case "LopChinh":
      // id lop chinh
      formData.append("idReceiver", $('#lopchinhs').val());
      break;
    case "SinhVien":
      //id sinhvien
      formData.append("idReceiver", $('#sinhviens').val());
      break;
    case "LopMonHoc":
      // id lop mon hoc
      formData.append("idReceiver", $('#lopmonhocs').val());
      break;
  }
  // tieu de
  formData.append("tieuDe", $('#tieude').val());
  var loaiTB_data = document.getElementsByClassName("category_notif");
  // so luong cac loai thong bao
  // formData.append("loaithongbao_length", loaiTB_data.length);
  var arrLoaiThongBao = [];
  for (var i = 0; i < loaiTB_data.length; i++) {
    arrLoaiThongBao.push(loaiTB_data[i].value);
  }
  // arr loai thong bao
  formData.append("idLoaiThongBao", arrLoaiThongBao);
  // muc do thong bao
  formData.append("idMucDoThongBao", $('#mucdothongbao').val());
  // noi dung
  formData.append("noiDung", $('#summernote_1').code().replace(/<\/?[^>]+(>|$)/g, ""));
  var file_data = document.getElementsByClassName("file_push");
  // so luong cac file
  formData.append("file_length", file_data.length);
  for (let i = 0; i < file_data.length; i++) {
    //file
    formData.append("files", file_data[i].files[0]);
  }
  Metronic.startPageLoading({animate: true});
  console.log(formData);
  $.ajax({
    // url:"/send-notification",
    url: $('#value_host').html() + '/' + $('#value_user').html() + '/guithongbao?token=' + $('#value_token').html(),
    type: 'POST',
    data: formData,
    async: true,
    success: function (data) {
      console.log(data);
      Metronic.stopPageLoading();
      var content = data;
      toastr.options = {
        closeButton: false,
        debug: false,
        positionClass: "toast-top-right",
        onclick: null,
        showDuration: "1000",
        hideDuration: "1000",
        timeOut: "2500",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      };
      if (content.success == true)
        var $toast = toastr['success']("Thành Công", "Notifications");
      else
        var $toast = toastr['error']("Thất Bại", "Notifications");
      $toastlast = $toast;
      if ($toast.find('#okBtn').length) {
        $toast.delegate('#okBtn', 'click', function () {
          alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
          $toast.remove();
        });
      }
      if ($toast.find('#surpriseBtn').length) {
        $toast.delegate('#surpriseBtn', 'click', function () {
          alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
        });
      }

      $('#clearlasttoast').click(function () {
        toastr.clear($toastlast);
      });
    },
    cache: false,
    contentType: false,
    processData: false
  }).always(function () {
    Metronic.stopPageLoading();
  });
}

function receiver() {
  switch($('#receiver').val()) {
    case 'Khoa':
      $('#s2id_lopchinhs').css('display', 'none')
      $('#s2id_lopmonhocs').css('display', 'none')
      $('#sinhviens').css('display', 'none')
      break;
    case 'LopChinh':
      $('#s2id_lopchinhs').css('display', 'block')
      $('#s2id_lopmonhocs').css('display', 'none')
      $('#sinhviens').css('display', 'none')
      break;
    case 'SinhVien':
      $('#s2id_lopchinhs').css('display', 'none')
      $('#s2id_lopmonhocs').css('display', 'none')
      $('#sinhviens').css('display', 'block')
      break;
    case 'LopMonHoc':
      $('#s2id_lopchinhs').css('display', 'none')
      $('#s2id_lopmonhocs').css('display', 'block')
      $('#sinhviens').css('display', 'none')
      break;
    default:
  }
}

function deleteContent() {
  $('#tieude').val('');
  $('#summernote_1').code('');


}
