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

initializeCorePage();
initializeModal();
var slides = document.getElementsByClassName("mySlides2");
initializeModalRow();
var dots = document.getElementsByClassName("demo");
let foreground = document.getElementsByClassName("layer");
initializeSectionBody();
// Get the modal
var modal = document.getElementById("myModal");

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

function rowEvents(index){
  var curYPos = 0;
  var curXPos = 0;
  var curDown = false;
  const delta = 6;
  let startX;
  let startY;
  let scrollLeft;

  $(modalRow).on("mousemove", function (e) {
    if (curDown === true) {
      //$(modalRow).scrollTop(parseInt($(modalRow).scrollTop() + (curYPos - e.pageY)));
      $(modalRow).scrollLeft(parseInt($(modalRow).scrollLeft() + (curXPos - e.pageX) * 5));

    }
  });

  $(modalRow).on("mousedown", function (e) { 
    curDown = true; 
    curYPos = e.pageY; 
    curXPos = e.pageX; 
    e.preventDefault(); 
  });
  $(modalRow).on("mouseup", function (e) { 
    curDown = false; 
    const diffX = Math.abs(e.pageX - curXPos);
    const diffY = Math.abs(e.pageY - curYPos);
  
    if (diffX < delta && diffY < delta) {
      let overflowVal = -70;
      // Click!
      console.log("click")
      currentSlide(null, index);
      /*for(let i = 0; i < 12; i++) {
          //currentSlide(overflowVal, i);

          modalRow.onclick = function(e){
            console.log(e.target);

          }          
          //overflowVal += 70;
      }
       /* window.onclick = function(e){
          console.log(e.target);
          //e.target.currentSlide(this, this);
        }*/
    }
  });
  $(modalRow).on("mouseout", function (e) { 
    curDown = false; 
  });

  
}


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
    modalBtnPrev.style.visibility = "hidden";
  }
  else{
    modalBtnPrev.style.visibility = "visible";
  }
  if(slideIndex === 12){
    modalBtnNext.style.visibility = "hidden";
  }
  else{
    modalBtnNext.style.visibility = "visible";
  }

  showSlides(slideIndex);
}

function currentSlide(scrollVal, n) {
  slideIndex = n;
  console.log(slideIndex);
  if(slideIndex === 1){
    modalBtnPrev.style.visibility = "hidden";
  }
  else{
    modalBtnPrev.style.visibility = "visible";
  }
  if(slideIndex === 12){
    modalBtnNext.style.visibility = "hidden";
  }
  else{
    modalBtnNext.style.visibility = "visible";
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

  slides[slideIndex-1].style.display = "flex"; 
  dots[slideIndex-1].className += " active";   
  foreground[slideIndex-1].className += " selected-layer";
  nrText.innerHTML = n + " / 12";

  //captionText.innerHTML = dots[slideIndex-1].alt;
}
