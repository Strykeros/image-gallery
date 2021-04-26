const body = document.querySelector("body");
let main;
let section;

let hrefs = ["tokyo/tokyo.html", "delhi/delhi.html", "shanghai/shanghai.html", 
"sao-paulo/sao-paulo.html", "mexico-city/mexico-city.html", "cairo/cairo.html"];

let srcs = ["resources/tokyo.jpg", "resources/delhi.jpg", "resources/shanghai.jpg", 
"resources/sao-paulo.jpg", "resources/mexico-city.jpg", "resources/cairo.jpg"];

let h3Texts = ["Tokyo", "Delhi", "Shanghai", "Sao Paulo", "Mexico City", "Cairo"]

function initializeCorePage(){
  main = document.createElement("main");
  body.appendChild(main);  

  let heading = document.createElement("h1")
  heading.innerHTML = "Six largest cities in the world";
  main.appendChild(heading);

  let hr = document.createElement("hr");
  main.appendChild(hr);

}

function initializeSection(){
  section = document.createElement("section");
  section.classList.add("cityList");
  main.appendChild(section);
}

function linkContainerList(){
  const elements = [];
  for(let i = 0; i <  6; i++) {
    elements.push({href: hrefs[i], Src: srcs[i], HeaderHref: hrefs[i], h3Text: h3Texts[i]});
  }

  return (
      elements.map((elem) => (
        ele(LinkContainer, elem)
      ))
  );
}

function initializeLinkContainer(){
  ReactDOM.render(
    [
      linkContainerList(),
    ],
    document.querySelector(".cityList")
  );
}

initializeCorePage();
initializeSection();
initializeLinkContainer();
