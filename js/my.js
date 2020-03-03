$(document).ready(function () {

    // откроет меню
    function openNav(){
        $('.mobilBar').toggleClass("openNav");
        $('#nav').toggleClass('showNav');
    }

    $('.mobilBar').on('click',function(){
        openNav();
    });
    
    $('.productCaruserl').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: $('.wrapProductCaruserl .productCaruserlPrevArr'),
        nextArrow: $('.wrapProductCaruserl .productCaruserlNextArr'),
        responsive: [
            
            {
              breakpoint: 920,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 767,
              settings: {
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
            
            
          ]
      });
});