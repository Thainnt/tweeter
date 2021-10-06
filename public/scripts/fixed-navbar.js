$(document).ready(function() {

  const navbar = $('.nav-bar');
  const sticky = navbar.offset().top;
  
  $(window).on('scroll', function(){
    if ($(window).scrollTop() >= sticky) {
      navbar.addClass('sticky'); 
    } else if ($(window).scrollTop() < sticky) {
      navbar.removeClass('sticky'); 
    }
  });
  
});