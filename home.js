const PRIV_KEY = "87ddf47a0c24355fedd80d27b8ef499aa3395f4f";
const PUBLIC_KEY = "a39b60d85c001f8952c64d6c25a3bb2e";

const ts = Date.now();
let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
let baseUrl = "https://gateway.marvel.com:443/v1/public/";

let spidermanCharacters = "characters?nameStartsWith=Spider-Man";
let spiderman1602Comics = "characters/1011054/comics?";
let ironManCharacters = "characters?nameStartsWith=iron%20man";
let hulk = "characters?nameStartsWith=hulk";
function urlx(baseUrl, section, publicKey, ts, hash) {
  return (
    baseUrl +
    section +
    "&limit=100&ts=" +
    ts +
    "&apikey=" +
    publicKey +
    "&hash=" +
    hash
  );
}

var test = document.getElementById("test");
var ul = document.getElementById("ul");
var countImgID = 1;
var countID = 1;
let count = 1;
var spidermanContainer = document.getElementById("spidermanContainer");
fetch(urlx(baseUrl, spidermanCharacters, PUBLIC_KEY, ts, hash))
  .then((response) => response.json())
  .then((response) => {
    var results = response.data.results;

    results.forEach((element) => {
      //TITLE
      var name = element.name;
      var textNode = document.createTextNode(name);
      var pTag = document.createElement("p");
      pTag.id = "character" + countID;
      pTag.className = "characterGroup";
      pTag.setAttribute("data-listIdentifier", "listItem");
      countID++;

      //RESOURCE
      var description = element.description;
      console.log(description);

      //IMAGE
      var path = element.thumbnail.path;
      var extension = element.thumbnail.extension;
      var imgText = document.createTextNode(path + "." + extension).data;
      var imgTag = document.createElement("img");
      imgTag.setAttribute("src", imgText);
      imgTag.id = "img" + countImgID;
      imgTag.setAttribute("width", "100%");
      imgTag.className = "spidermanImages";
      countImgID++;

      //CONTAINERS
      var div = document.createElement("div");
      var div2 = document.createElement("div");
      var div3 = document.createElement("div");
      var div4 = document.createElement("div");
      var div5 = document.createElement("div");
      const viewComicsTxt = document.createElement("a");
      viewComicsTxt.innerHTML = "View Comics";
      viewComicsTxt.id = "viewComicsText" + count;
      viewComicsTxt.className = "viewComicsTextClass";

      count++;

      div.className = "innerContainers";
      div2.className = "title-container";
      div3.className = "image-container";
      div4.className = "view-comics";
      div5.className = "border-container";

      //ADDING TO DOM
      spidermanContainer.appendChild(pTag);
      spidermanContainer.appendChild(imgTag);
      pTag.appendChild(textNode);
      div.appendChild(pTag);
      div.appendChild(imgTag);
      div.appendChild(viewComicsTxt);
      div5.appendChild(div);
      div2.appendChild(pTag);
      div.appendChild(div2);
      div3.appendChild(imgTag);
      div.appendChild(div3);
      div4.appendChild(viewComicsTxt);
      div.appendChild(div4);

      spidermanContainer.appendChild(div5);

      //ADDING LINKS TO COMICS PAGE FROM CHARACTERS

      var viewComicsText1 = document.getElementById("viewComicsText1");
      if (viewComicsText1) {
        viewComicsText1.setAttribute("href", "spider1602-comics.html");
      }

      var viewComicsText2 = document.getElementById("viewComicsText2");
      if (viewComicsText2) {
        viewComicsText2.setAttribute("href", "spiderman2099.html");
      }

      var viewComicsText3 = document.getElementById("viewComicsText3");
      if (viewComicsText3) {
        viewComicsText3.setAttribute("href", "Spider-Man-Ai-Apaec.html");
      }

      var viewComicsText4 = document.getElementById("viewComicsText4");
      if (viewComicsText4) {
        viewComicsText4.setAttribute("href", "Spider-Man-Ben-Reilly.html");
      }

      var viewComicsText7 = document.getElementById("viewComicsText7");
      if (viewComicsText7) {
        viewComicsText7.setAttribute("href", "Spider-Man-Marvel-Zombies.html");
      }

      var viewComicsText9 = document.getElementById("viewComicsText9");
      if (viewComicsText9) {
        viewComicsText9.setAttribute("href", "Spider-Man-Miles-Morales.html");
      }
      var viewComicsText10 = document.getElementById("viewComicsText10");
      if (viewComicsText10) {
        viewComicsText10.setAttribute("href", "Spider-Man-Noir.html");
      }

      var viewComicsText11 = document.getElementById("viewComicsText11");
      if (viewComicsText11) {
        viewComicsText11.setAttribute("href", "  Spider-Man-Peter-Parker.html");
      }

      var viewComicsText13 = document.getElementById("viewComicsText13");
      if (viewComicsText13) {
        viewComicsText13.setAttribute("href", "Spider-Man-Ultimate.html");
      }
    });
  });
