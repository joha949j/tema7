 let retter;
 let filter = "alle";

 document.addEventListener("DOMContentLoaded", getJson);

 async function getJson() {
     let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
     console.log("jsonData", jsonData);
     retter = await jsonData.json();
     start();
     addEventListenerToButtons();
 }

 function start() {
     const dest = document.querySelector("#liste");
     const temp = document.querySelector("template");
     dest.innerHTML = "";

     retter.feed.entry.forEach((ret) => {
         if (filter == "alle" || filter == ret.gsx$kategori.$t) {
             const klon = temp.cloneNode(true).content;
             klon.querySelector("img").src = `imgs/small/${ret.gsx$billede.$t}-sm.jpg`;
             klon.querySelector("h2").textContent = ret.gsx$navn.$t;
             klon.querySelector("#kortb").textContent = ret.gsx$kort.$t;
             klon.querySelector("#pris").textContent = ret.gsx$pris.$t + ",-";
             dest.appendChild(klon);
             dest.lastElementChild.addEventListener("click", () => {
                 location.href = `singleView.html?navn=${ret.gsx$navn.$t}`;
             });
         }
     })
 }


 function addEventListenerToButtons() {
     document.querySelectorAll(".filter").forEach(elm => {
         elm.addEventListener("click", filtrering);
     })
 }

 function filtrering() {
     filter = this.dataset.mad;
     document.querySelector("h1").textContent = this.textContent;
     document.querySelectorAll(".filter").forEach(elm => {
         elm.classList.remove("nu");

     })
     this.classList.add("nu");
     start();
 }
