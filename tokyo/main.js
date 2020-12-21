// Get the modal
var modal = document.getElementById("myModal");
let slideIndex = 1;
// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.getElementsByClassName("mySlides");
var modalImg = document.getElementById("tokyoimg");
//var captionText = document.getElementById("caption");
var slides = document.getElementsByClassName("mySlides2");

// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];

  // and attach our click listener for this image.
  img.onclick = function(evt) {
    modal.style.display = "block";
    modalImg.src = this.src;
  }
}



// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

// slideshow 



showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}


function showSlides(n) {
  var i;

  var dots = document.getElementsByClassName("demo");
  //var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";

  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");  
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  //captionText.innerHTML = dots[slideIndex-1].alt;
}

let imgArray = [
  "tokyoimg1.jpg",  "tokyoimg2.jpg",  "tokyoimg3.jpg",  "tokyoimg4.jpg",  "tokyoimg5.jpg",  "tokyoimg6.jpg", 
  "tokyoimg7.jpg",  "tokyoimg8.jpg",  "tokyoimg9.jpg",  "tokyoimg10.jpg",  "tokyoimg11.jpg",  "tokyoimg12.jpg"
];

let Jsonimg = {
  "image1": "tokyoimg1.jpg",
  "image2": "tokyoimg2.jpg",
  "image3": "tokyoimg3.jpg"
};

