/**
 * Created by smallmouse on 2/2/17.
 */
var sttAttribute = 1;
// them thuoc tinh
function addAttribute() {
  $("#data-repeater-item").append("<select  name='order_status[" + (sttAttribute++) + "]' class='form-control form-filter input-sm ' style='margin-bottom: 5px;'> <option value=''>Select...</option> <option value=''>Học Bổng</option> <option value=''>Tài Chính</option> <option value=''>Tuyển sinh</option> <option value=''>Tuyển dụng</option> <option value=''>Thực Tập</option> <option value=''>Các Cuộc Thi</option> <option value=''>Hội Thảo , Nghiên Cứu</option> <option value=''>Quy chế, Quy định mới</option> <option value=''>Kết Quả Học Tập</option> <option value=''>Triệu Tập</option> <option value=''>Java</option> <option value=''>PHP</option> <option value=''>Android</option> <option value=''>Nodejs</option> <option value=''>JavaScript</option> <option value=''>C/C++</option></select>");
}

//xoa thuoc tinh
function deleteAttribute() {
  if (sttAttribute == 1) return;
  sttAttribute--;
  $("#data-repeater-item select:last-child").remove();

}

var sttFile = 1;
function addFileNoti() {
  $('#file-repeater').append("<input type='file' class='btn btn-primary '  name='files[" + (sttFile++) + "]' multiple='' style='margin: 0'>");
}

function deleteFileNoti() {
  sttFile--;
  $('#file-repeater input:last-child').remove();
}
