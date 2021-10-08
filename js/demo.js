
$(document).ready(function () {

  $("#slider-before-after").on("input change", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.foreground-img').css('width', `${sliderPos}%`)
    // Update the position of the slider button
    $('.slider-button-before-after').css('left', `calc(${sliderPos}% - 18px)`)
  });

  $(".button").click(function () {
    let buttonId = $(this).attr("id");
    $("#modal-container").removeAttr("class").addClass(buttonId);
    $("body").addClass("modal-active");
  });
  $('.close').click(function () {
    console.log('Close'); 
    $("#modal-container").addClass("out-sketch");
    $("body").removeClass("modal-active");
  });
  $(".buttonM").click(function () {
    let buttonIdM = $(this).attr("id");
    $("#modalM-container").removeAttr("class").addClass(buttonIdM);
    $("body").addClass("modalM-active");
  });
  $('.closeM').click(function () {
    console.log('CloseM');
    $("#modalM-container").addClass("out-sketch");
    $("body").removeClass("modalM-active");
  });
  $(".buttonC").click(function () {
    let buttonIdC = $(this).attr("id");
    $("#modalC-container").removeAttr("class").addClass(buttonIdC);
    $("body").addClass("modalC-active");
  });
  $('.closeC').click(function () {
    console.log('CloseC');
    $("#modalC-container").addClass("out-sketch");
    $("body").removeClass("modalC-active");
  });
   
    $(".C").click(function(){

      var guts = $('#guts').css('display');
      var guts2 = $('#guts2').css('display');
      var guts3 = $('#guts3').css('display');
      var guts4 = $('#guts4').css('display');

      $('.left-barD').css({transform: 'rotate(45deg)'});
      $('.right-barD').css({transform: 'rotate(-45deg)'});
      $('.left-barR').css({transform: 'rotate(45deg)'});
      $('.right-barR').css({transform: 'rotate(-45deg)'});
      $('.left-barP').css({transform: 'rotate(45deg)'});
      $('.right-barP').css({transform: 'rotate(-45deg)'});

      $("#guts").slideToggle("slow");
      $('.left-barC').css({transform: 'rotate(-45deg)'});
      $('.right-barC').css({transform: 'rotate(45deg)'});
      if (guts == 'block') {
        $('.left-barC').css({transform: 'rotate(45deg)'});
        $('.right-barC').css({transform: 'rotate(-45deg)'});
      }
      if (guts2 == 'block') {
          $("#guts2").slideToggle("slow");
      }
      if (guts3 == 'block') {
          $("#guts3").slideToggle("slow");
      }
      if (guts4 == 'block') {
          $("#guts4").slideToggle("slow");
    }
  });  

    $(".D").click(function(){

      var guts = $('#guts').css('display');
      var guts2 = $('#guts2').css('display');
      var guts3 = $('#guts3').css('display');
      var guts4 = $('#guts4').css('display');

      $('.left-barC').css({transform: 'rotate(45deg)'});
      $('.right-barC').css({transform: 'rotate(-45deg)'});
      $('.left-barR').css({transform: 'rotate(45deg)'});
      $('.right-barR').css({transform: 'rotate(-45deg)'});
      $('.left-barP').css({transform: 'rotate(45deg)'});
      $('.right-barP').css({transform: 'rotate(-45deg)'});

      $("#guts2").slideToggle("slow");
      $('.left-barD').css({transform: 'rotate(-45deg)'});
      $('.right-barD').css({transform: 'rotate(45deg)'});
      if (guts == 'block') {
        $("#guts").slideToggle("slow");
      }
      if (guts2 == 'block') {
        $('.left-barD').css({transform: 'rotate(45deg)'});
        $('.right-barD').css({transform: 'rotate(-45deg)'});
      }
      if (guts3 == 'block') {
          $("#guts3").slideToggle("slow");
      }
      if (guts4 == 'block') {
        $("#guts4").slideToggle("slow");
    }
  });  
    $(".R").click(function(){

      var guts = $('#guts').css('display');
      var guts2 = $('#guts2').css('display');
      var guts3 = $('#guts3').css('display');
      var guts4 = $('#guts4').css('display');

      $('.left-barC').css({transform: 'rotate(45deg)'});
      $('.right-barC').css({transform: 'rotate(-45deg)'});
      $('.left-barD').css({transform: 'rotate(45deg)'});
      $('.right-barD').css({transform: 'rotate(-45deg)'});
      $('.left-barP').css({transform: 'rotate(45deg)'});
      $('.right-barP').css({transform: 'rotate(-45deg)'});

      $("#guts3").slideToggle("slow");
      $('.left-barR').css({transform: 'rotate(-45deg)'});
      $('.right-barR').css({transform: 'rotate(45deg)'});
      if (guts == 'block') {
        $("#guts").slideToggle("slow");
      }
      if (guts2 == 'block') {
        $("#guts2").slideToggle("slow");
      }
      if (guts3 == 'block') {
        $('.left-barR').css({transform: 'rotate(45deg)'});
        $('.right-barR').css({transform: 'rotate(-45deg)'});
      }
      if (guts4 == 'block') {
        $("#guts4").slideToggle("slow");
    }
  });  

  $(".P").click(function(){

    var guts = $('#guts').css('display');
    var guts2 = $('#guts2').css('display');
    var guts3 = $('#guts3').css('display');
    var guts4 = $('#guts4').css('display');

    $('.left-barC').css({transform: 'rotate(45deg)'});
    $('.right-barC').css({transform: 'rotate(-45deg)'});
    $('.left-barR').css({transform: 'rotate(45deg)'});
    $('.right-barR').css({transform: 'rotate(-45deg)'});
    $('.left-barD').css({transform: 'rotate(45deg)'});
    $('.right-barD').css({transform: 'rotate(-45deg)'});

    $("#guts4").slideToggle("slow");
    $('.left-barP').css({transform: 'rotate(-45deg)'});
    $('.right-barP').css({transform: 'rotate(45deg)'});
    if (guts == 'block') {
      $("#guts").slideToggle("slow");
    }
    if (guts2 == 'block') {
        $("#guts2").slideToggle("slow");
    }
    if (guts3 == 'block') {
        $("#guts3").slideToggle("slow");
    }
    if (guts4 == 'block') {
      $('.left-barP').css({transform: 'rotate(45deg)'});
      $('.right-barP').css({transform: 'rotate(-45deg)'});
  }
});  


$(".C2").click(function(){
  var guts5 = $('#guts5').css('display');
  var guts6 = $('#guts6').css('display');
  var guts7 = $('#guts7').css('display');
  var guts8 = $('#guts8').css('display');

  $('.left-barD2').css({transform: 'rotate(-45deg)'});
  $('.right-barD2').css({transform: 'rotate(45deg)'});
  $('.left-barR2').css({transform: 'rotate(-45deg)'});
  $('.right-barR2').css({transform: 'rotate(45deg)'});
  $('.left-barP2').css({transform: 'rotate(-45deg)'});
  $('.right-barP2').css({transform: 'rotate(45deg)'});

  $("#guts5").slideToggle("slow");
  $('.left-barC2').css({transform: 'rotate(45deg)'});
  $('.right-barC2').css({transform: 'rotate(-45deg)'});
  if (guts5 == 'block') {
    $('.left-barC2').css({transform: 'rotate(-45deg)'});
    $('.right-barC2').css({transform: 'rotate(45deg)'});
  }
  if (guts6 == 'block') {
      $("#guts6").slideToggle("slow");
  }
  if (guts7 == 'block') {
      $("#guts7").slideToggle("slow");
  }
  if (guts8 == 'block') {
      $("#guts8").slideToggle("slow");
}
});  

$(".D2").click(function(){
  console.log('Cb');
  // $('.close').stopPropagation();
  
  var guts5 = $('#guts5').css('display');
  var guts6 = $('#guts6').css('display');
  var guts7 = $('#guts7').css('display');
  var guts8 = $('#guts8').css('display');

  $('.left-barC2').css({transform: 'rotate(-45deg)'});
  $('.right-barC2').css({transform: 'rotate(45deg)'});
  $('.left-barR2').css({transform: 'rotate(-45deg)'});
  $('.right-barR2').css({transform: 'rotate(45deg)'});
  $('.left-barP2').css({transform: 'rotate(-45deg)'});
  $('.right-barP2').css({transform: 'rotate(45deg)'});

  // $('#picSGL').css({opacity: 1});
  // $('#picND').css({opacity: 1})
  // $('#picPC').css({opacity: 1})

  $("#guts6").slideToggle("slow");
  $('.left-barD2').css({transform: 'rotate(45deg)'});
  $('.right-barD2').css({transform: 'rotate(-45deg)'});

  $("#sketch-container").removeClass("six");
  $("#sketch-container-n").removeClass("five");
  $("#sketch-container-p").removeClass("four");

  if (guts5 == 'block') {
    $("#guts5").slideToggle("slow");
  }
  if (guts6 == 'block') {
    console.log('ici');
    $('.left-barD2').css({transform: 'rotate(-45deg)'});
    $('.right-barD2').css({transform: 'rotate(45deg)'});
  }
  if (guts7 == 'block') {
      $("#guts7").slideToggle("slow");
  }
  if (guts8 == 'block') {
    $("#guts8").slideToggle("slow");
}
}); 

$(".R2").click(function(){
  
  var guts5 = $('#guts5').css('display');
  var guts6 = $('#guts6').css('display');
  var guts7 = $('#guts7').css('display');
  var guts8 = $('#guts8').css('display');

  $('.left-barC2').css({transform: 'rotate(-45deg)'});
  $('.right-barC2').css({transform: 'rotate(45deg)'});
  $('.left-barD2').css({transform: 'rotate(-45deg)'});
  $('.right-barD2').css({transform: 'rotate(45deg)'});
  $('.left-barP2').css({transform: 'rotate(-45deg)'});
  $('.right-barP2').css({transform: 'rotate(45deg)'});

  $("#guts7").slideToggle("slow");
  $('.left-barR2').css({transform: 'rotate(45deg)'});
  $('.right-barR2').css({transform: 'rotate(-45deg)'});
  if (guts5 == 'block') {
    $("#guts5").slideToggle("slow");
  }
  if (guts6 == 'block') {
    $("#guts6").slideToggle("slow");
  }
  if (guts7 == 'block') {
    $('.left-barR2').css({transform: 'rotate(-45deg)'});
    $('.right-barR2').css({transform: 'rotate(45deg)'});
  }
  if (guts8 == 'block') {
    $("#guts8").slideToggle("slow");
}
});  

$(".P2").click(function(){

  var guts5 = $('#guts5').css('display');
  var guts6 = $('#guts6').css('display');
  var guts7 = $('#guts7').css('display');
  var guts8 = $('#guts8').css('display');

  $('.left-barC2').css({transform: 'rotate(-45deg)'});
  $('.right-barC2').css({transform: 'rotate(45deg)'});
  $('.left-barR2').css({transform: 'rotate(-45deg)'});
  $('.right-barR2').css({transform: 'rotate(45deg)'});
  $('.left-barD2').css({transform: 'rotate(-45deg)'});
  $('.right-barD2').css({transform: 'rotate(45deg)'});

  $("#guts8").slideToggle("slow");
  $('.left-barP2').css({transform: 'rotate(45deg)'});
  $('.right-barP2').css({transform: 'rotate(-45deg)'});
  if (guts5 == 'block') {
    $("#guts5").slideToggle("slow");
  }
  if (guts6 == 'block') {
      $("#guts6").slideToggle("slow");
  }
  if (guts7 == 'block') {
      $("#guts7").slideToggle("slow");
  }
  if (guts8 == 'block') {
    $('.left-barP2').css({transform: 'rotate(-45deg)'});
    $('.right-barP2').css({transform: 'rotate(45deg)'});
  }
});  

    // $('.enter-accordion2').click(function() {
    //   $(this).next().slideToggle('250').css('');
    // });


    // $('.C').toggle(function() {
    //   $('.left-barC').css({transform: 'rotate(-45deg)'});
    //   $('.right-barC').css({transform: 'rotate(45deg)'});
    // }, function(){
    //   $('.left-barC').css({transform: 'rotate(45deg)'});
    //   $('.right-barC').css({transform: 'rotate(-45deg)'});
    // });

    // $('.D').toggle(function() {
    //   $('.left-barD').css({transform: 'rotate(-45deg)'});
    //   $('.right-barD').css({transform: 'rotate(45deg)'});
    // }, function(){
    //   $('.left-barD').css({transform: 'rotate(45deg)'});
    //   $('.right-barD').css({transform: 'rotate(-45deg)'});
    // });

    // $('.R').toggle(function() {
    //   $('.left-barR').css({transform: 'rotate(-45deg)'});
    //   $('.right-barR').css({transform: 'rotate(45deg)'});
    // }, function(){
    //   $('.left-barR').css({transform: 'rotate(45deg)'});
    //   $('.right-barR').css({transform: 'rotate(-45deg)'});
    // });

    // $('.P').toggle(function() {
    //   $('.left-barP').css({transform: 'rotate(-45deg)'});
    //   $('.right-barP').css({transform: 'rotate(45deg)'});
    // }, function(){
    //   $('.left-barP').css({transform: 'rotate(45deg)'});
    //   $('.right-barP').css({transform: 'rotate(-45deg)'});
    // });

    // $('.C2').toggle(function() {
    //   $('.left-barC2').css({transform: 'rotate(45deg)'});
    //   $('.right-barC2').css({transform: 'rotate(-45deg)'});
    // }, function(){
    //   $('.left-barC2').css({transform: 'rotate(-45deg)'});
    //   $('.right-barC2').css({transform: 'rotate(45deg)'});
    // });

    // $('.D2').toggle(function() {
    //   $('.left-barD2').css({transform: 'rotate(45deg)'});
    //   $('.right-barD2').css({transform: 'rotate(-45deg)'});
    // }, function(){
    //   $('.left-barD2').css({transform: 'rotate(-45deg)'});
    //   $('.right-barD2').css({transform: 'rotate(45deg)'});
    // });

    // $('.R2').toggle(function() {
    //   $('.left-barR2').css({transform: 'rotate(45deg)'});
    //   $('.right-barR2').css({transform: 'rotate(-45deg)'});
    // }, function(){
    //   $('.left-barR2').css({transform: 'rotate(-45deg)'});
    //   $('.right-barR2').css({transform: 'rotate(45deg)'});
    // });

    // $('.P2').toggle(function() {
    //   $('.left-barP2').css({transform: 'rotate(45deg)'});
    //   $('.right-barP2').css({transform: 'rotate(-45deg)'});
    // }, function(){
    //   $('.left-barP2').css({transform: 'rotate(-45deg)'});
    //   $('.right-barP2').css({transform: 'rotate(45deg)'});
    // });

    

  $('.btn-sketch').click(function(){
    var btnSketch = $(this).attr('id');
    $('#sketch-container').removeAttr('class').addClass(btnSketch);
    $('body').addClass('sketch-active');
  })
  $('.close').click(function(){
    $('#sketch-container').addClass('out-sketch');
    $('body').removeClass('sketch-active');
  });

  $('.btn-sketch-n').click(function(){
    var btnSketch = $(this).attr('id');
    $('#sketch-container-n').removeAttr('class').addClass(btnSketch);
    $('body').addClass('sketch-n-active');
  })
  $('.close').click(function(){
    $('#sketch-container-n').addClass('out-sketch');
    $('body').removeClass('sketch-n-active');
  });

  $('.btn-sketch-p').click(function(){
    var btnSketch = $(this).attr('id');
    $('#sketch-container-p').removeAttr('class').addClass(btnSketch);
    $('body').addClass('sketch-p-active');
  })
  $('.close').click(function(){
    $('#sketch-container-p').addClass('out-sketch');
    $('body').removeClass('sketch-p-active');
  });

  $('.sliders').on('change', function() {
    $('.body-slider').toggleClass('blue');
  });

});

function changeText(text) {

  document.getElementById('skilltitle').innerHTML = text;

}


// let activeSlide = false;

// document.querySelector('.scroller').addEventListener('mousedown',function(){
//   activeSlide = true;
//   document.querySelector('.scroller').classList.add('scrolling');
// });
// document.body.addEventListener('mouseup',function(){
//   activeSlide = false;
//   document.querySelector('.scroller').classList.remove('scrolling');
// });
// document.body.addEventListener('mouseleave',function(){
//   activeSlide = false;
//   document.querySelector('.scroller').classList.remove('scrolling');
// });
// document.body.addEventListener('mousemove',function(e){
//   if (!activeSlide) return;
//   let x = e.pageX;
//   x -= document.querySelector('.wrapper-slider').getBoundingClientRect().left;
//   scrollIt(x);
// });
// function scrollIt(x){
//     let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper-slider').offsetWidth)));
//     document.querySelector('.after').style.width = transform+"px";
//     document.querySelector('.scroller').style.left = transform-25+"px";
// }
// scrollIt();


function cb(response) {
  document.getElementById('visits').innerText = response.value;
}


function clicked() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.countapi.xyz/hit/nacodev.com/awesomeclick");
  xhr.responseType = "json";
  xhr.onload = function() {
    document.getElementById('visits2').innerText = this.response.value;
      // alert(`This button has been clicked ${this.response.value} times!`);
  }
  xhr.send();
}


// test parallaxe slider




//end test parallaxe slider