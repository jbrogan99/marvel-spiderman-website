const PRIV_KEY = "87ddf47a0c24355fedd80d27b8ef499aa3395f4f";
const PUBLIC_KEY = "a39b60d85c001f8952c64d6c25a3bb2e";

const ts = Date.now();
let hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
let baseUrl = "https://gateway.marvel.com:443/v1/public/";

let spidermanCharacters = "characters?nameStartsWith=Spider-Man";
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

// Wrap an HTMLElement around another HTMLElement or an array of them.
// HTMLElement.prototype.wrapAll = function (elms) {
//   var el = elms.length ? elms[0] : elms;

//   // Cache the current parent and sibling of the first element.
//   var parent = el.parentNode;
//   var sibling = el.nextSibling;

//   // Wrap the first element (is automatically removed from its
//   // current parent).
//   this.appendChild(el);

//   // Wrap all other elements (if applicable). Each element is
//   // automatically removed from its current parent and from the elms
//   // array.
//   while (elms.length) {
//     this.appendChild(elms[0]);
//   }

//   // If the first element had a sibling, insert the wrapper before the
//   // sibling to maintain the HTML structure; otherwise, just append it
//   // to the parent.
//   if (sibling) {
//     parent.insertBefore(this, sibling);
//   } else {
//     parent.appendChild(this);
//   }
// };

var test = document.getElementById("test");
var ul = document.getElementById("ul");
var countImg = 1;
var countID = 1;
let count = 0;
fetch(urlx(baseUrl, spidermanCharacters, PUBLIC_KEY, ts, hash))
  .then((response) => response.json())
  .then((response) => {
    var results = response.data.results;

    results.forEach((element) => {
      //TITLE
      var div = document.createElement("div");
      var name = element.name;
      // console.log(element.thumbnail.path);
      var textNode = document.createTextNode(name);
      var li = document.createElement("li");
      li.id = "character" + countID;
      li.className = "characterGroup" + countID;
      count++;
      ul.appendChild(li);
      li.appendChild(textNode);

      //IMAGE
      var path = element.thumbnail.path;
      var extension = element.thumbnail.extension;
      var imgText = document.createTextNode(path + "." + extension).data;
      var imgTag = document.createElement("img");
      imgTag.setAttribute("src", imgText);
      imgTag.id = "img" + countImg;
      imgTag.setAttribute("width", "100px");
      imgTag.className = "characterGroup" + countImg;
      countImg++;
      ul.appendChild(imgTag);

      // count++;
      // console.log(count);
      // while (count > 1) {
      //   var ul = document.getElementById("ul");
      //   var lastLiElement = ul.children[ul.children.length - 1];
      //   new_html = "<div id='container'>" + lastLiElement + "</div>";
      // }

      // document.getElementById("ul").innerHTML = new_html;

      // let lastDivContainer =
      //   document.getElementById("container").lastChild.innerHTML;
      // console.log(lastDivContainer);
    });
  });

// console.log(listItem);
