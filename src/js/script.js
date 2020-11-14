$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev_arrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next_arrow.png"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false,
              },
            },
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__goods').eq(i).toggleClass('catalog-item__goods_active');
          $('.catalog-item__detalis').eq(i).toggleClass('catalog-item__detalis_active');
        })
      });
    };
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');
});