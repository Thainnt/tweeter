$( document ).ready(function() {

  $('#tweet-text').keyup(function() {
    const counterEl = $(this).parents('body').find('.counter');
    counterEl[0].value = 140 - $(this).val().length;

    if (counterEl[0].value < 0) {
      counterEl.addClass('counter-over-limit');
    } else {
      counterEl.removeClass('counter-over-limit');
    }

  });
});