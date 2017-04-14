/**
 * Created by sm on 4/3/17.
 */
var changePassword = function () {
  function changePass() {
    var oldPass = $('#old-password').val();
    var oldPass = $('#new-password').val();
    var oldPassRepeat = $('#new-password-repeat').val();
    if (oldPass != oldPassRepeat) {
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
      var $toast = toastr['error']("Mật khẩu không trùng nhau", "Notifications");
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

      return;
    }
  }

  return {

    //main function to initiate the module
    init: function () {
      $('#change-password').click(changePass);
    }

  };
}();
