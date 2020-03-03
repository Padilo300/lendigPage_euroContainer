$('.slick-carousel').slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [{
    breakpoint: 992,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 576,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});

// scrollTop
var scrollTopParams = { "scheme": "dark", "size": "large" };

//container JSON
$(function () {
  var mssContainers = [];
  $.ajax({
    url: "/json/containers.json",
    method: "get",
    success: function (json) {
      console.log(json);
      mssContainers = json;
    }
  });

  $(".container_btn").click(function (e) {
    var id = $(this).parent().parent().attr("data-id");
    for (let i = 0; i < mssContainers.length; i++) {
      if (mssContainers[i].id == id) {
        var item = mssContainers[i];
        var path = ".card[data-id='" + id + "']";

        $(path + " .container_items_block_title").empty();
        $(path + " .container_items_block_title").append($("<h2>").text(item.title));

        $(path + " .container_items_block_characteristic p").remove();
        $(path + " .container_items_block_characteristic").append($("<p>").text(`${item.characteristics[0].characteristic}`));

        $(path + " .container_items_block_characteristic ul").empty();
        $(path + " .container_items_block_characteristic ul").append($("<li>").text(`Країна виробник:`).append($("<span>").text(`${item.characteristics[1].country}`)));
        $(path + " .container_items_block_characteristic ul").append($("<li>").text(`Об'єм:`).append($("<span>").text(`${item.characteristics[2].volume}`)));
        $(path + " .container_items_block_characteristic ul").append($("<li>").text(`Матеріал:`).append($("<span>").text(`${item.characteristics[3].material}`)));
        if (item.characteristics.length > 4) {
          let guarantee = item.characteristics[4];
          if (guarantee.hasOwnProperty("guarantee")) {
            $(path + " .container_items_block_characteristic ul").append($("<li>").text(`Гарантія:`).append($("<span>").text(`${item.characteristics[4].guarantee}`)));
          }
        }

        $(path + " .container_items_block_info .price span").text(`${item.price}`);

        $(path + " .container_items_block_info .buttonPopup").empty();
        $(path + " .container_items_block_info .buttonPopup").append(item.button);

        $(path + " .container_items_block_info .download").empty();
        $(path + " .container_items_block_info .download").append($("<a>").text("Комерційна пропозиція").attr("download", "").attr("href", item.hrefDownload).append($("<img>").attr("src", item.download)));

        $(".container_items .description").empty();
        $(".container_items .description").append(item.description);

        $(".container_items .sertificate").empty();
        $(".container_items .sertificate").append(item.sertificate);

        $(".container_items .modalFooter").empty();
        $(".container_items .modalFooter").append(item.modalFooter);

        $(".container_items .briefDescription").empty();
        $(".container_items .briefDescription").append(item.briefDescription);

        $(path + " .container_items_block_img .znak").empty();
        $(path + " .container_items_block_img .znak").append($("<img>").attr("src", item.image).attr("id", "img-" + id).attr("alt", "/"));

        var blockImage = item.blockImage;
        $(path + " .container_item_carousel .blockImage").empty();
        for (let iImg = 0; iImg < blockImage.length; iImg++) {
          let oneImage = blockImage[iImg];
          $(path + " .container_item_carousel .blockImage").append($("<a>").attr("href", oneImage).append($("<img>").attr("src", oneImage)));
        }

        var sertificate = item.sertificate;
        $(path + " .container_items .sertificate").empty();
        for (let iImgS = 0; iImgS < sertificate.length; iImgS++) {
          let oneImageS = sertificate[iImgS];
          $(path + " .container_items .sertificate").append($("<a>").attr("href", oneImageS).append($("<img>").attr("src", oneImageS)));
        }

        var videos = item.videos;
        for (let iVid = 0; iVid < videos.length; iVid++) {
          let oneVideos = videos[iVid];
          $(path + " .container_item_carousel .blockImage").append($("<video>").attr("id", "link" + iVid).attr("width", "145px").attr("height", "145px").attr("controls", "true").append($("<source>").attr("src", oneVideos).attr("type", "video/mp4")));
        }

        var colors = item.colors;
        var linkColor = item.images;
        $(".container_items_block_info .color").empty();
        for (let iColor = 0; iColor < colors.length; iColor++) {
          let oneColor = colors[iColor];
          let oneLinkImages = linkColor[iColor];
          $(path + " .container_items_block_info .color").append($("<a>").attr("class", "color-choose").attr("data-color", oneLinkImages).append($(`<img src="img/color_${oneColor}.svg" alt="">`)));
        }

        $(".color-choose").click(function (e) {
          var image = $(this).attr("data-color");
          $(".container_items_block_img .znak img").attr("src", image).attr("id", "img-" + id);
        });

        // json-popup
        $(document).ready(function ($) {
          $('.popup-content').magnificPopup({
            type: 'inline'
            // mainClass: 'mfp-fade',
            // removalDelay: 300
          });
		  
		  $('.popup-content').on('click', function() {
			  
			  $('.modal-dialog button.close').click();
			  
		  });

		  
        });

        // mask-phone-json
        $(function () {
          $(".mask").mask("+38(999) 999-99-99");
        });

        break;
      }
    }
  });
});

// image color change
$(".color-choose").click(function (e) {
  var id = $(this).parent().parent().attr("data-id");
  var path = ".card[data-id='" + id + "']";
  var image = $(this).attr("data-color");
  $(path + " .znak img").attr("src", image).attr("id", "img-" + id);
});

function chooseColor(imgId, image) {
  $("#img-" + imgId).attr("src", image);
}

$(".znak").click(function () {
  let link = $(this).parent();
  link.find(".container_btn").click();
});

// Menu
$(document).ready(function () {
  $("#prime-nav").on("click", ".nav-link", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $(".close").click();
    setTimeout(function () {
      $('body,html').animate({ scrollTop: top }, 1000);
    }, 500);
  });
});

// mask-phone
$(function () {
  $(".mask").mask("+38(999) 999-99-99");
});

//popup-image
$(document).ready(function () {
	
	
	
  $('.blockImage, .sertificate').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'blockImagePopup',
    closeOnContentClick: true,
    // zoom: {
    //   enabled: true,
    //   duration: 300,
    //   easing: 'ease-in-out',
    // },
    gallery: {
      enabled: false,
      preload: [0, 2]
    },
    retina: {
      ratio: 1,
      replaceSrc: function (item, ratio) {
        return item.src.replace(/\.\w+$/, function (m) {
          return '@2x' + m;
        });
      }
    }
  });
});

// scroll_up
jQuery(function () {
	
	

  var scrollButtonEl = jQuery('.scroll-top-inner');

  scrollButtonEl.hide();

  jQuery(window).scroll(function () {
    if (jQuery(window).scrollTop() < 10) {
      jQuery('.scroll-top-inner').fadeOut();
    } else {
      jQuery('.scroll-top-inner').fadeIn();
    }
  });

  scrollButtonEl.click(function () {
    jQuery("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
  });
});

// Binotel
var tracking;
function BinotelInit(event) {
  let popup = $(this).parent().find("div[data-binotel=\"true\"]");
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (target.tagName === 'BUTTON') {
    $(document).ready(function () {
      setTimeout(function () {
        tracking = window.BinotelCallTracking[505678];
        setTimeout(function () {
          $(popup).append($("<script>").text("tracking.replacePhoneNumbersOnDynamicContent(); console.log(\"init code binotel\");"));
        }, 10);
      }, 1000);
    });
  }
}
var contanerBtns = document.querySelectorAll('.container_btn');
for (let i = 0; i < contanerBtns.length; i++) {
  contanerBtns[i].addEventListener('click', BinotelInit, false);
}