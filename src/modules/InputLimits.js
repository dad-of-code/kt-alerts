$(function() {
    const DEBOUNCE = 300; // ms

    $(document).on('input', 'textarea[data-kt-limit="true"]', function() {
        const $ta = $(this);
        const max = parseInt($ta.data('kt-max-limit'), 10) || 0;
        const min = parseInt($ta.data('kt-min-limit'), 10) || 0;
        let val = $ta.val();
        const $item = $ta.closest('.kt-form-item');

        let $msg = $item.find('.kt-form-message');
        if (!$msg.length) {
            $msg = $('<div>').addClass('kt-form-message').appendTo($item);
        }

        if (max && val.length > max) {
            val = val.slice(0, max);
            $ta.val(val);
            $msg.text(`Maximum length of ${max} characters reached.`);
            $ta.attr('aria-invalid', 'true');
        } else {
            $msg.text('');
            $ta.removeAttr('aria-invalid');
        }

        if (min) {
            clearTimeout(this._debounce);
            this._debounce = setTimeout(() => {
                const curr = $ta.val().length;
                if (curr > 0 && curr < min) {
                    $msg.text(`Minimum length of ${min} characters required.`);
                    $ta.attr('aria-invalid', 'true');
                } else {
                    $msg.text('');
                    $ta.removeAttr('aria-invalid');
                }
            }, DEBOUNCE);
        }
    });
});