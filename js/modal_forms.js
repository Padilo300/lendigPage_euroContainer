// var recaptcha_api_onload = function() {};
// var order_service_form_on_submit = function (token) {
// $('#order-service-form').submit();
// };
var callback_form_on_submit = function (token) {
    $('#callback-form').submit();
};

document.addEventListener('DOMContentLoaded', function () {
    var $ = jQuery;

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method)
        );
    }
    var csrftoken = window.csrf_token;
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.modal.in').modal('hide');
            if (jqXHR.status == 403) {
                if (jqXHR.responseJSON.message) {
                    ui_alert('{0}'.format(jqXHR.responseJSON.message), { 'css_class': 'alert-error' });
                } else {
                    ui_alert('{0}'.format(jqXHR.responseText), { 'css_class': 'alert-error' });
                }
            } else if (jqXHR.status == 401) {
                if (jqXHR.responseJSON.message) {
                    ui_alert('{0}'.format(jqXHR.responseJSON.message), { 'css_class': 'alert-error' });
                } else {
                    ui_alert('{0}'.format(jqXHR.responseText), { 'css_class': 'alert-error' });
                }
                setTimeout(function () {
                    document.location.assign('/login/');
                }, 2000);
            } else {
                ui_alert('Произошла непредвиденная ошибка. Сообщите эту информацию в обратной связи: {0}'.format(jqXHR.responseText), { 'css_class': 'alert-error' });
            }
        }
    });
    $('body').on('submit', 'form.ajax', function (e) {
        var form_data = new FormData(this);
        var $form = $(this);
        if (/^https:/.test($form.attr('action')) == false || $form.attr('action') == 'https://api.zina.com.ua/send_form') {
            e.preventDefault();
        } else {
            return true;
        }

        $form.find('[type="submit"]').prop('disabled', true);
        $.ajax({
            method: 'POST',
            processData: false,
            contentType: false,
            url: $form.attr('action'),
            data: form_data,
            headers: { 'X-UUID': docCookies.getItem('anonymous_user_uuid') },
            success: function (data) {
				data = JSON.parse(data);
                after_submit($form, data);
                var form_id = $form.attr('id');
                if (form_id) {
                    $.publish('{0}_submit'.format($form.attr('id')), [$form, data]);
                }
            },
            complete: function (jqXHR, textStatus) {
                $form.find('[type="submit"]').prop('disabled', false);
            }
        });
    });

    $('body').on('click', '.modal.in[data-backdrop="static"]', function (e) {
        // on click anywhere
        if ($(e.target).is('.modal.in[data-backdrop="static"]')) {
            $(this).modal('hide');
        }
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            // escape btn close opened popup
            $('.modal.in[data-backdrop="static"]').modal('hide');
        }
    });
});