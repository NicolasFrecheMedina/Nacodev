// bissextile avec modulo et raisonnement
// var number = 42;
// var unite = number % 10;
// var dizaine =  (number - unite)/10 ;
// console.log('il y a ' + unite + ' unité(es) dans ' + number + ' et ' + dizaine + ' dizaine(s) dans ' + number );

// parcourir tableaux avec boucle
// var array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
// for (var i=0; i<array.length ; i++){
// 	console.log(array[i]);	
// }

// Modal
// Get the modal
// var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("BtnContact");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// test appear bloc1

// let btnAppear = document.getElementById("service-creation");
// btnAppear.onclick = function() {
//   console.log("Coucou");
//   document.getElementById("appear-conception").style.display = "block";
// }

// test style modal

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



