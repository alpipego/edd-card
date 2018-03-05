(function($) {
    var year_selector = "#card_exp_year", month_selector = "#card_exp_month", year = ("" + $(year_selector).val()).substr(2, 2), month = ("00" + $(month_selector).val()).substr(-2, 2), $cardContainer = $("#card-wrapper"), $cardSelector = $(".edd-card-selector-radio");
    $.when($("#edd_cc_fields").append($("<div>").addClass("card-wrapper").attr("id", "card-wrapper")).card({
        container: "#card-wrapper",
        debug: true,
        formatting: true,
        formSelectors: {
            nameInput: "#card_name",
            numberInput: "#card_number",
            cvcInput: "#card_cvc",
            expiryInput: month_selector + "," + year_selector
        }
    })).then(function() {
        var $expiry = $(".jp-card-expiry");
        $(document).on("change", month_selector + "," + year_selector, function() {
            updateExpiry();
        }).on("focus", month_selector + "," + year_selector, function() {
            $expiry.addClass("jp-card-focused");
        }).on("blur", month_selector + "," + year_selector, function() {
            $expiry.removeClass("jp-card-focused");
        }).ready(function() {
            updateExpiry();
        });
        if ($cardSelector.length) {
            $cardContainer.hide();
            $cardSelector.on("change", function() {
                if ($('.new-card-wrapper [type="radio"]').is(":checked")) {
                    $cardContainer.show();
                } else {
                    $cardContainer.hide();
                }
            });
        }
        function updateExpiry() {
            month = ("00" + $(month_selector).val()).substr(-2, 2);
            year = ("" + $(year_selector).val()).substr(2, 2);
            $expiry.text(month + "/" + year);
        }
    });
})(jQuery);