//= ../libs/jquery/jquery.3.3.1.js
//= ../libs/slick-1.8.1/slick/slick.min.js
//= ../libs/jquery-nice-select-1.1.0/js/jquery.nice-select.min.js
//= ../libs/ion.rangeSlider-master/js/ion.rangeSlider.min.js

$(document).ready(function () {
	$('.hamburger').on('click', function (e) {
   e.preventDefault();

   var $this = $(this),
       $menu = document.getElementById($this.data('target'));

   $this.toggleClass('is-active');
   $($menu).toggleClass('is-active');
  })
  stickyHeader();

  if ($('.team__slides').length) {
    $('.team__slides').slick({
      slidesToShow: 3,
      dots: true,
      arrows: false,
      // centerMode: true,
      responsive: [
        {
          breakpoint: 1088,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  }

  $('select').niceSelect();

  var $slider = $('.range-slider').ionRangeSlider({
    skin: 'round',
    min: 0,
    max: 130,
    step: 1,
    postfix: ' м.'
  });
  var $slider_buttons = $(".range-control");

  var slider_instance = $slider.data("ionRangeSlider");

  $slider_buttons.on("click", function (e) {
        e.preventDefault();
        var from = '';
        if ($(this).hasClass('range-minus')) {
          from = slider_instance.old_from - 10;
        } else{
          from = slider_instance.old_from + 10;
        }
        slider_instance.update({
            from: from,
        });
    });

});

function stickyHeader() {
  var header = $('.header');
  $(window).scroll(function() {
    var currentPosition = $(this).scrollTop();
    if (currentPosition > 0) {
       header.addClass('scrolled');
    } else {
       header.removeClass('scrolled');
    }
  });

  $('input[type=radio]').on('change', function() {
    $(this).closest('.radio-buttons').find('.radio').removeClass('checked');
    $(this).closest('.radio').addClass('checked');
  })
}