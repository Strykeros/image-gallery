const body = document.querySelector("body");
let slidesDiv;
let modalDiv;
let modalSpan;
let modalRow;
let modalBtnPrev;
let modalBtnNext;
let nrText;
let closeDiv;
let main;
let header;
let menuWrapperDiv;
let menuA;  
let expanded = false;
let hrefs = ["../index.html", "../tokyo/tokyo.html", "../delhi/delhi.html", 
"../sao-paulo/sao-paulo.html", "../mexico-city/mexico-city.html", "../cairo/cairo.html"];
let imageArray = ["resources/img1.jpg", "resources/img2.jpg", "resources/img3.jpg", "resources/img4.jpg", "resources/img5.jpg",
"resources/img6.jpg", "resources/img7.jpg", "resources/img8.jpg", "resources/img9.jpg", "resources/img10.jpg", "resources/img11.jpg",
"resources/img12.jpg"];
let menuButtonTexts = ["Home", "Tokyo", "Delhi", "Sao Paulo", "Mexico City", "Cairo"];
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
var modalImg = document.getElementById("img");
//var captionText = document.getElementById("caption");

var slideImage = document.querySelectorAll(".mySlides2 img");
var column = document.querySelectorAll(".cursor");

function initializeCorePage(){
  main = document.createElement("main");
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
  header = document.createElement("header");
  body.appendChild(header);
  initializeHeaderContent();

  let h1 = document.createElement("h1");
  h1.innerHTML = "Shanghai";
  section.appendChild(h1);
  let hr = document.createElement("hr");
  section.appendChild(hr);
  let p = document.createElement("p");
  p.innerHTML = "Shanghai, is one of the four direct-administered municipalities of the People's Republic of China, governed by the State Council. The city is located on the southern estuary of the Yangtze River, with the Huangpu River flowing through it. With a population of 24.28 million as of 2019, it is the most populous urban area in China and the third most populous city proper in the world. Shanghai is a global center for finance, research, technology, manufacturing, and transportation, and the Port of Shanghai is the world's busiest container port.";
  section.appendChild(p);
}

function initializeHeaderContent(){
  let h1 = document.createElement("h1");
  h1.innerHTML = "Image Gallery";
  header.appendChild(h1); 

  let menu = document.createElement("div");
  menu.classList.add("menu");
  menu.classList.add("hide-menu");
  header.appendChild(menu);

  let i = document.createElement("i");
  i.innerHTML = "menu";
  i.addEventListener("click", toggleMenu.bind(null, null), false);
  i.classList.add("menu-button");
  i.classList.add("material-icons");
  header.appendChild(i);

  initializeMenuContent();
}

function toggleMenu(){
  let menu = document.querySelector(".menu");
  let menuButton = document.querySelector(".menu-button");

  menu.classList.toggle("hide-menu");

  // change icon of "menuButton" on-click
  menuButton.innerHTML = "close";
  if(menu.classList.contains("hide-menu")){
      menuButton.innerHTML = "menu";
  } else{
      menuButton.innerHTML = "close";
  }
}

function initializeMenuContent(){
  let menu = document.querySelector(".menu");
  for(i = 0; i < menuButtonTexts.length; i++){
    menuWrapperDiv = document.createElement("div");
    menuWrapperDiv.classList.add("menuItemWrapper");
    menu.appendChild(menuWrapperDiv);

    let menuA = document.createElement("a");
    menuA.classList.add("menuItem");
    menuA.href = hrefs[i];
    menuA.innerHTML = menuButtonTexts[i];
    menuWrapperDiv.appendChild(menuA);  
  }
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
