var FormFileUpload = function () {

    return {
        //main function to initiate the module
        init: function () {

             // Initialize the jQuery File Upload widget:
            $('#fileupload').fileupload({
                disableImageResize: false,
                autoUpload: false,
                disableImageResize: /Android(?!.*Chrome)|Opera/.test(window.navigator.userAgent),
                maxFileSize: 10000000,
                acceptFileTypes: /(\.|\/)(doc|docx|pdf|xlsx|xls)$/i,
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},
            });

            // Enable iframe cross-domain access via redirect option:
            $('#fileupload').fileupload(
                'option',
                'redirect',
                window.location.href.replace(
                    /\/[^\/]*$/,
                    '/cors/result.html?%s'
                )
            );

            // Upload server status check for browsers with CORS support:
            if ($.support.cors) {
                $.ajax({
                    type: 'HEAD'
                }).fail(function () {
                    $('<div class="alert alert-danger"/>')
                        .text('Upload server currently unavailable - ' +
                                new Date())
                        .appendTo('#fileupload');
                });
            }

            // Load & display existing files:
            $('#fileupload').addClass('fileupload-processing');
            $.ajax({
                // Uncomment the following to send cross-domain cookies:
                //xhrFields: {withCredentials: true},
                url: $('#fileupload').attr("action"),
                dataType: 'json',
                context: $('#fileupload')[0],
                success:function (data) {
                  $('#fileupload').fileupload('option', 'done');
                  $('.fileupload-progress').removeClass('in');
                }
            }).always(function () {
                $('#fileupload').removeClass('fileupload-processing');
            })
            //   .done(function (result) {
            //   console.log(result);
            //     $('#fileupload').fileupload('option', 'done')
            //     .call(this, $.Event('done'), {result: result});
            // });
        }

    };

}();
