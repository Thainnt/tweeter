$(document).ready(function() {
  $('.fa-arrow-up').hide();
  let buttonClicked = false;
  
  $(window).scroll(function() {
    if (!buttonClicked){
      $('.fa-arrow-up').show();
      $('.write-new-tweet').hide();
    }
    buttonClicked = false;
  });

  $('.fa-arrow-up').click(function() {
    buttonClicked = true;
    $('html,body').scrollTop(0);
    $('.fa-arrow-up').toggle();
    $('.write-new-tweet').toggle();
    $('#new-tweet').show();
    $('#tweet-text').focus();
  });

});