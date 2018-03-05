(function ($) {
    var yearSelector = '#card_exp_year',
        monthSelector = '#card_exp_month',
        nameSelector = '#card_name',
        year = ('' + $(yearSelector).val()).substr(2, 2),
        month = ('00' + $(monthSelector).val()).substr(-2, 2),
        $cardContainer = $('#card-wrapper'),
        $cardSelector = $('.edd-card-selector-radio'),
        config = window.eddcard;

    $.when(
        $('#edd_cc_fields')
            .append($('<div>').addClass('card-wrapper').attr('id', 'card-wrapper'))
            //     .hide()
            .card({
                container: '#card-wrapper',
                debug: !!config.debug,
                formatting: true,

                formSelectors: {
                    nameInput: nameSelector,
                    numberInput: '#card_number',
                    cvcInput: '#card_cvc',
                    expiryInput: monthSelector + ',' + yearSelector
                },

                messages: {
                    validDate: config.validDate,
                    monthYear: config.monthYear
                }
            })
    ).then(function () {
        var $expiry = $('.jp-card-expiry');

        $(document)
            .ready(function () {
                updateExpiry();
            })
            .on('change', monthSelector + ',' + yearSelector, function () {
                updateExpiry();
            })
            .on('focus', monthSelector + ',' + yearSelector, function () {
                $expiry.addClass('jp-card-focused');
            })
            .on('blur', monthSelector + ',' + yearSelector, function () {
                $expiry.removeClass('jp-card-focused');
            })
            .on('paste', function (e) {
                if ('#' + e.target === nameSelector) {
                    setTimeout(function () {
                        $(nameSelector).blur().focus();
                    });
                }
            });

        if ($cardSelector.length) {
            $cardContainer.hide();
            $cardSelector.on('change', function () {
                if ($('.new-card-wrapper [type="radio"]').is(':checked')) {
                    $cardContainer.show();
                } else {
                    $cardContainer.hide();
                }
            });
        }

        function updateExpiry() {
            month = ('00' + $(monthSelector).val()).substr(-2, 2);
            year = ('' + $(yearSelector).val()).substr(2, 2);
            $expiry.text(month + '/' + year);
        }
    });
})(jQuery);
