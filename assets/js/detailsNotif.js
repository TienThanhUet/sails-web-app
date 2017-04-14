/**
 * Created by sm on 3/18/17.
 */
var detailsNotif = function () {
  var addFeedback=function () {
    $('#comments-list').append("<li > <div class='comment-main-level'> <div class='comment-avatar'><img src='/images/logo.png' alt=''></div> <div class='comment-box'> <div class='comment-head'> <h6 class='comment-name by-author'><a href='javascript:;'>Agustin Ortiz</a></h6> <span>hace 20 minutos</span> <i class='fa fa-reply'></i> <i class='fa fa-heart'></i> </div> <div class='comment-content'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo? </div> </div> </div> </li>")
  }

  var sendFeedback=function () {

      Metronic.startPageLoading({animate: true});
      $.ajax({
        url:'',
        type: 'POST',
        data: '',
        async: true,
        success: function (data) {
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
            var $toast = toastr['success']("Gửi FeedbackThành Công", "Notifications");
          else
            var $toast = toastr['error']("Gửi Feedback Thất Bại", "Notifications");
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
  return {

    init: function () {
      $('#send-feedback').click(addFeedback);
    }

  };
}();
