const PRIV_KEY = "87ddf47a0c24355fedd80d27b8ef499aa3395f4f";
const PUBLIC_KEY = "a39b60d85c001f8952c64d6c25a3bb2e";

const ts = Date.now();
let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
let baseUrl = "http://gateway.marvel.com:80/v1/public/";
let sectionComics =
  "characters/1009610/comics?format=comic&orderBy=issueNumber";
let Spider_Man_Ai = "characters/1016452/comics?";
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
var count = 1;
var countImg = 1;
var countHeading = 1;
var container = document.getElementById("allComicsContainer");

fetch(urlx(baseUrl, Spider_Man_Ai, PUBLIC_KEY, ts, hash))
  .then((response) => response.json())
  .then((response) => {
    var results = response.data.results;
    results.forEach((element) => {
      var title = element.title;
      var textNode = document.createTextNode(title);
      var headingTag = document.createElement("h2");
      headingTag.id = "title" + countHeading;
      headingTag.className = "headingElement";
      countHeading++;

      var description = element.description;
      var pTag2 = document.createElement("p");
      if (description == null || "") {
        pTag2.innerHTML = "No Description";
      } else {
        pTag2.innerHTML = description;
      }
      pTag2.setAttribute("class", "comicDescriptionClass");

      var image = element.images;

      image.forEach((element, index) => {
        // var slice
        if (index == 0) {
          var path = element.path;
          var extension = element.extension;
          var imgText = document.createTextNode(path + "." + extension).data;
          var imgTag = document.createElement("img");
          imgTag.setAttribute("src", imgText);
          imgTag.setAttribute("width", "280px");
          imgTag.id = "img" + countImg;
          imgTag.className = "comicImg";
          countImg++;

          //CREATING DIVS FOR STYLING
          var div = document.createElement("div");
          var div2 = document.createElement("div");
          var div3 = document.createElement("div");
          var div4 = document.createElement("div");

          //ADDING CLASS FOR DIVS
          div.className = "comicContainers";
          div.setAttribute("id", "container" + count);
          count++;
          div2.className = "heading-con";
          div3.className = "img-con";
          div4.className = "description-con";

          // ADDING DIVS TO DOM
          headingTag.appendChild(textNode);
          container.appendChild(div);
          div.appendChild(headingTag);
          div.appendChild(imgTag);

          div.appendChild(pTag2);

          //heading tag
          div2.appendChild(headingTag);
          div.append(div2);

          //ptag tag
          div4.appendChild(pTag2);
          div.append(div4);

          //Img tag
          div3.appendChild(imgTag);
          div.append(div3);
        } else {
          console.log("not first image");
        }
      });
    });
  });
