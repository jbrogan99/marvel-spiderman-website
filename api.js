var entertainment = document.getElementById("entertainment");
entertainment.classList.add("active");

const PRIV_KEY = "87ddf47a0c24355fedd80d27b8ef499aa3395f4f";
const PUBLIC_KEY = "a39b60d85c001f8952c64d6c25a3bb2e";

const ts = Date.now();
let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
let baseUrl = "http://gateway.marvel.com:80/v1/public/";
let sectionComics = "comics?format=comic&characters=1009610%20";

function urlx(baseUrl, section, publicKey, ts, hash) {
  return (
    baseUrl +
    section +
    "?limit=100&ts=" +
    ts +
    "&apikey=" +
    publicKey +
    "&hash=" +
    hash
  );
}

var test = document.getElementById("test");
var ul = document.getElementById("ul");
var countImg = 1;
var count = 0;
fetch(urlx(baseUrl, sectionComics, PUBLIC_KEY, ts, hash))
  .then((response) => response.json())
  .then((response) => {
    var results = response.data.results;
    results.forEach((element) => {
      var title = element.title;
      var textNode = document.createTextNode(title);
      var li = document.createElement("li");
      li.id = "title" + count;
      li.className = "group" + count;
      count++;
      ul.appendChild(li);
      li.appendChild(textNode);

      //Accessing img array
      var image = element.images;
      image.forEach((element) => {
        var path = element.path;
        var extension = element.extension;
        var imgText = document.createTextNode(path + "." + extension).data;
        var imgTag = document.createElement("img");
        imgTag.setAttribute("src", imgText);
        imgTag.id = "img" + countImg;
        imgTag.className = "group" + countImg;
        countImg++;
        test.appendChild(imgTag);
      });
    });
  });
