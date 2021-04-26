const body = document.querySelector("body");
let slidesDiv;
let modalDiv;
let modalSpan;
let modalRow;
let modalBtnPrev;
let modalBtnNext;
let nrText;
let closeDiv;
let imageArray = ["tokyoimg1.jpg", "tokyoimg2.jpg", "tokyoimg3.jpg", "tokyoimg4.jpg", "tokyoimg5.jpg",
"tokyoimg6.jpg", "tokyoimg7.jpg", "tokyoimg8.jpg", "tokyoimg9.jpg", "tokyoimg10.jpg", "tokyoimg11.jpg",
"tokyoimg12.jpg"];
let slideIndex = 1;
let section;
  let html = document.querySelector("html");
initializeCorePage();
initializeModal();
var slides = document.getElementsByClassName("mySlides2");
initializeModalRow();
var dots = document.getElementsByClassName("demo");
let foreground = document.getElementsByClassName("layer");
initializeSectionBody();
// Get the modal
var modal = document.getElementById("myModal");
addSwipeEvents();
// Get the image and insert it inside the modal - use its "alt" text as a caption
var images = document.getElementsByClassName("mySlides");
var modalImg = document.getElementById("tokyoimg");
//var captionText = document.getElementById("caption");

var slideImage = document.querySelectorAll(".mySlides2 img");
var column = document.querySelectorAll(".cursor");

function initializeCorePage(){
  let main = document.createElement("main");
  body.appendChild(main);

  section = document.createElement("section");
  main.appendChild(section);

  slidesDiv = document.createElement("div");
  slidesDiv.classList.add("images");
  slidesDiv.id = "slides";
  section.appendChild(slidesDiv);

  modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");
  modalDiv.id = "myModal";
  section.appendChild(modalDiv);

  modalRow = document.createElement("div");
  modalRow.classList.add("row");
  modalDiv.appendChild(modalRow);

  modalSpan = document.createElement("span");
  modalSpan.classList.add("close");
  modalSpan.innerHTML = "&times;";
  modalDiv.appendChild(modalSpan);
}

function initializemodalChilds(){
  modalSpan = document.createElement("span");
  modalSpan.classList.add("closeContainer");
  modalSpan.addEventListener("click",ResetOverflowX.bind(null, null), false);
  modalDiv.appendChild(modalSpan);

  closeDiv = document.createElement("div");
  closeDiv.classList.add("close");
  closeDiv.innerHTML = "&times;";  
  modalSpan.appendChild(closeDiv);

  nrText = document.createElement("div");
  nrText.classList.add("numbertext");
  modalSpan.appendChild(nrText);  

  modalRow = document.createElement("div");
  modalRow.classList.add("row");
  modalDiv.appendChild(modalRow);

  modalBtnPrev = document.createElement("button");
  modalBtnPrev.classList.add("prev");
  modalBtnPrev.innerHTML = "❮";
  modalBtnPrev.addEventListener("click", plusSlides.bind(null, -1), false);
  modalDiv.appendChild(modalBtnPrev);

  modalBtnNext = document.createElement("button");
  modalBtnNext.classList.add("next");
  modalBtnNext.innerHTML = "❯";
  modalBtnNext.addEventListener("click", plusSlides.bind(null, 1), false);
  modalDiv.appendChild(modalBtnNext);
}

function initializeSectionHeader(){
  let h1 = document.createElement("h1");
  h1.innerHTML = "Tokyo";
  section.appendChild(h1);
  let hr = document.createElement("hr");
  section.appendChild(hr);
  let p = document.createElement("p");
  p.innerHTML = 
  "Japan is divided up into prefectures, or provinces. " +
  "Tokyo is on the Pacific coast of Honshu and is a “merged city-prefecture” that is further divided into regions and provinces. "+
  "There are thought to be 23 wards in this vast metropolitan area, and in 2016 the total population was about 11,274,641. "+
  "These numbers include the historic city’s boundaries, but also its urban sprawl beyond those. It extends way past this, making accurate population counts somewhat complicated. "+
  "It has always been the largest city in Japan and is one of the most prominent cities in the world.";
  section.appendChild(p);
}


// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      plusSlides(1);
      //console.log("swiped left");
    } else {
      // swiped right
      plusSlides(-1);
      //console.log("swiped right");
    }  
  }

  if(slideIndex === -1){
    slideIndex = 12;
  }
  if(diffX > 0 && slideIndex === 12){
    slideIndex = 0;
    modalRow.scrollLeft = 0;
  }

  initialX = null;
  initialY = null;

  e.preventDefault();
};

function imgList() {
  let overflowVal = -70;
  const elements = [];

  for(let i = 0; i < 12; i++) {
      elements.push({imgSrc: imageArray[i], imgFunc: currentSlide.bind(null, overflowVal, i + 1)});
      overflowVal += 70;
  }

  return (
      elements.map((elem) => (
        ele(Image, elem)
      ))
  );
}

function initializeSectionBody(){
  ReactDOM.render(
  [
    imgList()
  ],

  document.querySelector(".images")
  );
  initializeSectionHeader(); 

}

function addSwipeEvents(){
  modal.addEventListener("touchstart", startTouch, false);
  modal.addEventListener("touchmove", moveTouch, false);
}

function modalList(){
  const elements = [];
  let nr = 1;
  for(let i = 0; i <  12; i++) {
    elements.push({number: nr + " / 12", imgSrc: imageArray[i], func: ResetOverflowX.bind(null, null)});
    nr++;
  }

  return (
      elements.map((elem) => (
        ele(Modal, elem)
      ))
  );
}

function initializeModal(){
  ReactDOM.render(
    [
      modalList()
    ],
    document.querySelector(".modal")
  );
    initializemodalChilds();

}

function modalRowList() {
  const modalRowElements = [];
  let overflowVal = -70;

  for(let i = 0; i < 12; i++) {
      modalRowElements.push({imgSrc: imageArray[i], imgFunc: currentSlide.bind(null, overflowVal, i + 1)});
      overflowVal += 70;
  }

  return (
      modalRowElements.map((elem) => (
        ele(ModalRow, elem)
      ))
  );
}

function initializeModalRow(){
  ReactDOM.render(
    [
      modalRowList()
    ],
    document.querySelector(".row")
  );

}

// Go through all of the images with our custom class
for (var i = 0; i < images.length; i++) {
  var img = images[i];

  // and attach our click listener for this image.
  img.onclick = function(evt) {
    modal.style.display = "flex";
    modal.style.flexWrap = "wrap";
  }
}

for(var i = 0; i < slideImage.length; i++){
  slideImage[i].classList.add("fade");
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal

function ResetOverflowX(){
  modal.style.display = "none";
  modalRow.scrollLeft = 0;
  html.classList.remove("noScroll");
}

let scrollLeftValue = modalRow.scrollLeft.value;

function checkScroll(){
  var maxScrollLeft = modalRow.scrollWidth - modalRow.clientWidth;
  if(maxScrollLeft){
    modalRow.scrollLeft += screen.width;
    //console.log(modalRow.scrollLeft);
  }

}

// slideshow 

showSlides(slideIndex);

function plusSlides(n) {
  slideIndex += n; 
  var maxScrollLeft = modalRow.scrollWidth - modalRow.clientWidth;
  var maxScrollRight = modalRow.scrollWidth + modalRow.clientWidth;
  if(n > 0){
    modalRow.scrollLeft += 70;

  }
  else {
    modalRow.scrollLeft -= 70;
  }
  if(slideIndex === 1){
    modalBtnPrev.disabled = true;
    modalBtnPrev.classList.add("locked");
  }
  else{
    modalBtnPrev.disabled = false;
    modalBtnPrev.classList.remove("locked");
  }
  if(slideIndex === 12){
    modalBtnNext.disabled = true;
    modalBtnNext.classList.add("locked");
  }
  else{
    modalBtnNext.disabled = false;
    modalBtnNext.classList.remove("locked");
  }

  showSlides(slideIndex);
}

function currentSlide(scrollVal, n) {

  html.classList.add("noScroll");
  slideIndex = n;
  //console.log(slideIndex);
  if(slideIndex === 1){
    modalBtnPrev.disabled = true;
    modalBtnPrev.classList.add("locked");
  }
  else{
    modalBtnPrev.disabled = false;
    modalBtnPrev.classList.remove("locked");
  }
  if(slideIndex === 12){
    modalBtnNext.disabled = true;
    modalBtnNext.classList.add("locked");
  }
  else{
    modalBtnNext.disabled = false;
    modalBtnNext.classList.remove("locked");
  }
  if(n > 0){
    modalRow.scrollLeft = scrollVal;
  }
  else{
    modalRow.scrollLeft -= scrollVal;
  }

  showSlides(slideIndex = n);  

}

function showSlides(n) {
  var i;

  //var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 12}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");  

  }

  for (i = 0; i < foreground.length; i++){
      foreground[i].className = foreground[i].className.replace(" selected-layer", ""); 
  }

  if(n > 12){
    n = 12;
  }

  slides[slideIndex-1].style.display = "flex"; 
  dots[slideIndex-1].className += " active";   
  foreground[slideIndex-1].className += " selected-layer";

  if(n === 0){
    nrText.innerHTML = "12 / " + slides.length;
  }
  else{
    nrText.innerHTML = n + " / " + slides.length;
  }


  //captionText.innerHTML = dots[slideIndex-1].alt;
}
