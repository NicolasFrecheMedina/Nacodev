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


// test style modal

$(document).ready(function () {
  //your code here
  $(".button").click(function () {
    var buttonId = $(this).attr("id");
    $("#modal-container").removeAttr("class").addClass(buttonId);
    $("body").addClass("modal-active");
    // console.log($("body"))
  });

  $('.close').click(function () {
    $("#modal-container").addClass("out");
    $("body").removeClass("modal-active");
  });

});

