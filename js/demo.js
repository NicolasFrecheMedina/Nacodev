/* <!--
b.             8          .8.              ,o888888o.        ,o888888o.               8 888888888o.      8 8888888888   `8.`888b           ,8'
888o.          8         .888.            8888     `88.   . 8888     `88.             8 8888    `^888.   8 8888          `8.`888b         ,8'
Y88888o.       8        :88888.        ,8 8888       `8. ,8 8888       `8b            8 8888        `88. 8 8888           `8.`888b       ,8'
.`Y888888o.    8       . `88888.       88 8888           88 8888        `8b           8 8888         `88 8 8888            `8.`888b     ,8'
8o. `Y888888o. 8      .8. `88888.      88 8888           88 8888         88           8 8888          88 8 888888888888     `8.`888b   ,8'
8`Y8o. `Y88888o8     .8`8. `88888.     88 8888           88 8888         88           8 8888          88 8 8888              `8.`888b ,8'
8   `Y8o. `Y8888    .8' `8. `88888.    88 8888           88 8888        ,8P           8 8888         ,88 8 8888               `8.`888b8'
8      `Y8o. `Y8   .8'   `8. `88888.   `8 8888       .8' `8 8888       ,8P            8 8888        ,88' 8 8888                `8.`888'
8         `Y8o.`  .888888888. `88888.     8888     ,88'   ` 8888     ,88'             8 8888    ,o88P'   8 8888                 `8.`8'
8            `Yo .8'       `8. `88888.     `8888888P'        `8888888P'               8 888888888P'      8 888888888888          `8.`

                                                                Powered by 🅽🅰🅲🅾 🅳🅴🆅 ✨
--> */


$(document).ready(function () {
  $(".button").click(function () {
    let buttonId = $(this).attr("id");
    $("#modal-container").removeAttr("class").addClass(buttonId);
    $("body").addClass("modal-active");
  });
  $('.close').click(function () {
    $("#modal-container").addClass("out");
    $("body").removeClass("modal-active");
  });
  $(".buttonM").click(function () {
    let buttonIdM = $(this).attr("id");
    $("#modalM-container").removeAttr("class").addClass(buttonIdM);
    $("body").addClass("modalM-active");
  });
  $('.closeM').click(function () {
    $("#modalM-container").addClass("out");
    $("body").removeClass("modalM-active");
  });
  $(".buttonC").click(function () {
    let buttonIdC = $(this).attr("id");
    $("#modalC-container").removeAttr("class").addClass(buttonIdC);
    $("body").addClass("modalC-active");
  });
  $('.closeC').click(function () {
    $("#modalC-container").addClass("out");
    $("body").removeClass("modalC-active");
  });

  $('#service-creation').toggle(function() {
        $('.appear-conception').css({opacity: 1});
        $('.effect-conception').css({color: 'white'});
        $('.effect-conception').css({background: 'linear-gradient(to right, orange, yellow)'});
        $('#service-creation').css({background: 'linear-gradient(to right, orange, yellow)'});
        $('#service-creation').css({color: 'white'});
      }, function(){
        $('.appear-conception').css({opacity: 0});
        $('.effect-conception').css({color: 'black'});
        $('.effect-conception').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
         $('#service-creation').css({color: 'black'});
        $('#service-creation').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
      });

  $('#service-entrepreneur').toggle(function() {
      $('.appear-developpement').css({opacity: 1});
      $('.effect-developpement').css({color: 'white'});
      $('.effect-developpement').css({background: 'linear-gradient(to right, red, orange)'});
      $('#service-entrepreneur').css({background: 'linear-gradient(to right, red, orange)'});
      $('#service-entrepreneur').css({color: 'white'});
    }, function(){
      $('.appear-developpement').css({opacity: 0});
      $('.effect-developpement').css({color: 'black'});
      $('.effect-developpement').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
      $('#service-entrepreneur').css({color: 'black'});
      $('#service-entrepreneur').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
    });

    $('#service-refonte').toggle(function() {
      $('.appear-refonte').css({opacity: 1});
      $('.effect-refonte').css({color: 'white'});
      $('.effect-refonte').css({background: 'linear-gradient(to right, #00C853, #B2FF59)'});
      $('#service-refonte').css({background: 'linear-gradient(to right, #00C853, #B2FF59)'});
      $('#service-refonte').css({color: 'white'});
    }, function(){
      $('.appear-refonte').css({opacity: 0});
      $('.effect-refonte').css({color: 'black'});
      $('.effect-refonte').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
      $('#service-refonte').css({color: 'black'});
      $('#service-refonte').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
    });

    $('#service-freelance').toggle(function() {
      $('.appear-freelance').css({opacity: 1});
      $('.effect-freelance').css({color: 'white'});
      $('.effect-freelance').css({background: 'linear-gradient(to right, purple, pink)'});
      $('#service-freelance').css({background: 'linear-gradient(to right, purple, pink)'});
      $('#service-freelance').css({color: 'white'});
    }, function(){
      $('.appear-freelance').css({opacity: 0});
      $('.effect-freelance').css({color: 'black'});
      $('.effect-freelance').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
      $('#service-freelance').css({color: 'black'});
      $('#service-freelance').css({background: 'linear-gradient(135deg, #fff, #d2d2d2)'});
    });

    $('.enter-accordion').click(function() {
      $(this).next().slideToggle('500').css('');
    });
    $('.enter-accordion2').click(function() {
      $(this).next().slideToggle('500').css('');
    });
    $('.C').toggle(function() {
      $('.left-barC').css({transform: 'rotate(-45deg)'});
      $('.right-barC').css({transform: 'rotate(45deg)'});
    }, function(){
      $('.left-barC').css({transform: 'rotate(45deg)'});
      $('.right-barC').css({transform: 'rotate(-45deg)'});
    });

    $('.D').toggle(function() {
      $('.left-barD').css({transform: 'rotate(-45deg)'});
      $('.right-barD').css({transform: 'rotate(45deg)'});
    }, function(){
      $('.left-barD').css({transform: 'rotate(45deg)'});
      $('.right-barD').css({transform: 'rotate(-45deg)'});
    });

    $('.R').toggle(function() {
      $('.left-barR').css({transform: 'rotate(-45deg)'});
      $('.right-barR').css({transform: 'rotate(45deg)'});
    }, function(){
      $('.left-barR').css({transform: 'rotate(45deg)'});
      $('.right-barR').css({transform: 'rotate(-45deg)'});
    });

    $('.P').toggle(function() {
      $('.left-barP').css({transform: 'rotate(-45deg)'});
      $('.right-barP').css({transform: 'rotate(45deg)'});
    }, function(){
      $('.left-barP').css({transform: 'rotate(45deg)'});
      $('.right-barP').css({transform: 'rotate(-45deg)'});
    });

    $('.C2').toggle(function() {
      $('.left-barC2').css({transform: 'rotate(45deg)'});
      $('.right-barC2').css({transform: 'rotate(-45deg)'});
    }, function(){
      $('.left-barC2').css({transform: 'rotate(-45deg)'});
      $('.right-barC2').css({transform: 'rotate(45deg)'});
    });

    $('.D2').toggle(function() {
      $('.left-barD2').css({transform: 'rotate(45deg)'});
      $('.right-barD2').css({transform: 'rotate(-45deg)'});
    }, function(){
      $('.left-barD2').css({transform: 'rotate(-45deg)'});
      $('.right-barD2').css({transform: 'rotate(45deg)'});
    });

    $('.R2').toggle(function() {
      $('.left-barR2').css({transform: 'rotate(45deg)'});
      $('.right-barR2').css({transform: 'rotate(-45deg)'});
    }, function(){
      $('.left-barR2').css({transform: 'rotate(-45deg)'});
      $('.right-barR2').css({transform: 'rotate(45deg)'});
    });

    $('.P2').toggle(function() {
      $('.left-barP2').css({transform: 'rotate(45deg)'});
      $('.right-barP2').css({transform: 'rotate(-45deg)'});
    }, function(){
      $('.left-barP2').css({transform: 'rotate(-45deg)'});
      $('.right-barP2').css({transform: 'rotate(45deg)'});
    });

    

  $('.btn-sketch').click(function(){
    var btnSketch = $(this).attr('id');
    $('#sketch-container').removeAttr('class').addClass(btnSketch);
    $('body').addClass('sketch-active');
  })
  $('.close').click(function(){
    $('#sketch-container').addClass('out');
    $('body').removeClass('sketch-active');
  });

  $('.btn-sketch-n').click(function(){
    var btnSketch = $(this).attr('id');
    $('#sketch-container-n').removeAttr('class').addClass(btnSketch);
    $('body').addClass('sketch-n-active');
  })
  $('.close').click(function(){
    $('#sketch-container-n').addClass('out');
    $('body').removeClass('sketch-n-active');
  });

  $('.btn-sketch-p').click(function(){
    var btnSketch = $(this).attr('id');
    $('#sketch-container-p').removeAttr('class').addClass(btnSketch);
    $('body').addClass('sketch-p-active');
  })
  $('.close').click(function(){
    $('#sketch-container-p').addClass('out');
    $('body').removeClass('sketch-p-active');
  });
});

function changeText(text) {

  document.getElementById('skilltitle').innerHTML = text;

}


let activeSlide = false;

document.querySelector('.scroller').addEventListener('mousedown',function(){
  activeSlide = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.body.addEventListener('mouseup',function(){
  activeSlide = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('mouseleave',function(){
  activeSlide = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('mousemove',function(e){
  if (!activeSlide) return;
  let x = e.pageX;
  x -= document.querySelector('.wrapper-slider').getBoundingClientRect().left;
  scrollIt(x);
});
function scrollIt(x){
    let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper-slider').offsetWidth)));
    document.querySelector('.after').style.width = transform+"px";
    document.querySelector('.scroller').style.left = transform-25+"px";
}


// // And finally let's repeat the process for touch events
// // first our middle scroller...
// document.querySelector('.scroller').addEventListener('touchstart',function(){
//   activeSlide = true;
//   document.querySelector('.scroller').classList.add('scrolling');
// });
// document.body.addEventListener('touchend',function(){
//   activeSlide = false;
//   document.querySelector('.scroller').classList.remove('scrolling');
// });
// document.body.addEventListener('touchcancel',function(){
//   activeSlide = false;
//   document.querySelector('.scroller').classList.remove('scrolling');
// });



document.querySelector('.scroller').addEventListener('touchstart',function(){
  activeSlide = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.body.addEventListener('touchend',function(){
  activeSlide = false;
  document.querySelector('.scroller').classList.remove('scrolling');
});
// document.body.addEventListener('touchcancel',function(){
//   activeSlide = false;
//   document.querySelector('.scroller').classList.remove('scrolling');
// });
document.body.addEventListener('touchmove',function(e){
  if (!activeSlide) return;
  let x = e.pageX;
  x -= document.querySelector('.wrapper-slider').getBoundingClientRect().left;
  scrollIt(x);
});
function scrollIt(x){
    let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper-slider').offsetWidth)));
    document.querySelector('.after').style.width = transform+"px";
    document.querySelector('.scroller').style.left = transform-25+"px";
}

scrollIt();



// // Let's use the 'active' variable to let us know when we're using it
// let activeResponsive = false;

// // First we'll have to set up our event listeners
// // We want to watch for clicks on our scroller
// document.querySelector('.iphone-scroller').addEventListener('mousedown',function(){
//   activeResponsive = true;
//   // Add our scrolling class so the scroller has full opacity while activeResponsive
//   document.querySelector('.iphone-scroller').classList.add('iphone-scrolling');
// });
// // We also want to watch the body for changes to the state,
// // like moving around and releasing the click
// // so let's set up our event listeners
// document.body.addEventListener('mouseup',function(){
//   activeResponsive = false;
//   document.querySelector('.iphone-scroller').classList.remove('iphone-scrolling');
// });
// document.body.addEventListener('mouseleave',function(){
//   activeResponsive = false;
//   document.querySelector('.iphone-scroller').classList.remove('iphone-scrolling');
// });

// // Let's figure out where their mouse is at
// document.body.addEventListener('mousemove',function(e){
//   if (!activeResponsive) return;
//   // Their mouse is here...
//   let y = e.pageX;
//   // but we want it relative to our wrapper
//   y -= document.querySelector('.iphone-wrapper-slider').getBoundingClientRect().left;
//   // Okay let's change our state
//   scrollIt(y);
// });

// // Let's use this function
// function scrollIt(y){
//     let transform = Math.max(0,(Math.min(y,document.querySelector('.iphone-wrapper-slider').offsetWidth)));
//     document.querySelector('.iphone-after').style.width = transform+"px";
//     document.querySelector('.iphone-scroller').style.left = transform-25+"px";
// }

// // Let's set our opening state based off the width, 
// // we want to show a bit of both images so the user can see what's going on
// // scrollIt();

// // And finally let's repeat the process for touch events
// // first our middle scroller...
// document.querySelector('.iphone-scroller').addEventListener('touchstart',function(){
//   activeResponsive = true;
//   document.querySelector('.iphone-scroller').classList.add('iphone-scrolling');
// });
// document.body.addEventListener('touchend',function(){
//   activeResponsive = false;
//   document.querySelector('.iphone-scroller').classList.remove('iphone-scrolling');
// });
// document.body.addEventListener('touchcancel',function(){
//   activeResponsive = false;
//   document.querySelector('.iphone-scroller').classList.remove('iphone-scrolling');
// });


// function cb(response) {
//   document.getElementById('visits').innerText = response.value;
// }


// function clicked() {
//   var xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://api.countapi.xyz/hit/nacodev.com/awesomeclick");
//   xhr.responseType = "json";
//   xhr.onload = function() {
//     document.getElementById('visits2').innerText = this.response.value;
//       // alert(`This button has been clicked ${this.response.value} times!`);
//   }
//   xhr.send();
// }