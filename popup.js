var nsfw = false
var slides = false

const baseUrl = "https://nekos.life/api/v2"
var endpoint = ""

var sel
var swp
var img
var sld
var mdl
var mdlcls
var mdlclsprg
var inf


var mdlbtmsht
var mdlbtmshtbtn

var timer

var progress = 0
var progressinterval

const modalAutoCloseTime = 1000

document.addEventListener('DOMContentLoaded', function() {
    img = document.getElementById("neko")
    swp = document.getElementById("swapMode")
    sel = document.getElementById("nekoSelect")
    sld = document.getElementById("toggleSlides")
    mdl = document.getElementById("modal")
    mdlcls = document.getElementById("modalclose")
    mdlclsprg = document.getElementById("modalcloseprogress")
    mdlbtmsht = document.getElementById("modalbottomsheet")
    mdlbtmshtbtn = document.getElementById("closemodalbottomsheet")
    inf = document.getElementById("info")

    img.addEventListener("click", load_neko)
    swp.addEventListener("click", toggle_mode)
    sel.addEventListener("change", on_neko_change)
    sld.addEventListener("click", toggle_slides)
    mdlcls.addEventListener("click", close_modal)
    window.addEventListener("click", handle_window_click)
    inf.addEventListener("click", open_modal_bottom_sheet)
    mdlbtmshtbtn.addEventListener("click", close_modal_bottom_sheet)

    mdl.style.display='block'

    progressinterval = setInterval(update_progress_bar, 1)

    set_mode(false)
});

function handle_window_click() {
  if (event.target == mdlbtmsht) {
    close_modal_bottom_sheet()
  }
  if (event.target == mdl) {
    close_modal()
  }
}

function open_modal_bottom_sheet() {
  mdlbtmsht.style.display = "block";
}

function close_modal_bottom_sheet() {
  mdlbtmsht.style.display = "none";
}

function update_progress_bar() {
  progress += 1
  mdlclsprg.style.width = (progress/modalAutoCloseTime)*100 + "%"
  if (progress >= modalAutoCloseTime) close_modal()
}

function close_modal() {
  mdl.style.display='none'
  clearInterval(progressinterval)
}

function load_neko() {
  var xmlhttp = new XMLHttpRequest()
  var url = baseUrl + endpoint

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText)
          document.getElementById("neko").src = myArr.url

          if (slides) start_timer()
      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function toggle_mode() {
  set_mode(!nsfw)
}

function set_mode(mode_in) {
  nsfw = mode_in
  swp.innerHTML = "Mode: " + (nsfw ? "NSFW" : "SFW")
  
  while (sel.firstChild) { 
    sel.removeChild(sel.lastChild);
  } 
  
  var md = nsfw ? "nsfw" : "sfw"
  for (let [key, value] of Object.entries(endpoints[md])) {
    var opt = document.createElement('option')

    opt.appendChild( document.createTextNode(key) )
    opt.value = value; 

    sel.appendChild(opt); 
  }
  
  on_neko_change()
}

function on_neko_change() {
  endpoint = sel.options[sel.selectedIndex].value
  load_neko()
}

function toggle_slides() {
  slides = !slides
  if (slides) {
    sld.classList.add("w3-green")
    start_timer()
  } else {
    sld.classList.remove("w3-green")
    clearTimeout(timer)
  }
}

function start_timer() {
  clearTimeout(timer)
  timer = setTimeout(load_neko, 5000)
}

var endpoints = {
  "nsfw": {
    "randomHentaiGif": "/img/Random_hentai_gif",
    "pussy": "/img/pussy",
    "nekoGif": "/img/nsfw_neko_gif",
    "neko": "/img/lewd",
    "lesbian": "/img/les",
    "kuni": "/img/kuni",
    "cumsluts": "/img/cum",
    "classic": "/img/classic",
    "boobs": "/img/boobs",
    "bJ": "/img/bj",
    "anal": "/img/anal",
    "avatar": "/img/nsfw_avatar",
    "yuri": "/img/yuri",
    "trap": "/img/trap",
    "tits": "/img/tits",
    "girlSoloGif": "/img/solog",
    "girlSolo": "/img/solo",
    "pussyWankGif": "/img/pwankg",
    "pussyArt": "/img/pussy_jpg",
    "kemonomimi": "/img/lewdkemo",
    "kitsune": "/img/lewdk",
    "keta": "/img/keta",
    "holo": "/img/hololewd",
    "holoEro": "/img/holoero",
    "hentai": "/img/hentai",
    "futanari": "/img/futanari",
    "femdom": "/img/femdom",
    "feetGif": "/img/feetg",
    "eroFeet": "/img/erofeet",
    "feet": "/img/feet",
    "ero": "/img/ero",
    "eroKitsune": "/img/erok",
    "eroKemonomimi": "/img/erokemo",
    "eroNeko": "/img/eron",
    "eroYuri": "/img/eroyuri",
    "cumArts": "/img/cum_jpg",
    "blowJob": "/img/blowjob",
    "spank": "/img/spank",
    "gasm": "/img/gasm"
  },
  "sfw": {
    "tickle": "/img/tickle",
    "slap": "/img/slap",
    "poke": "/img/poke",
    "pat": "/img/pat",
    "neko": "/img/neko",
    "meow": "/img/meow",
    "lizard": "/img/lizard",
    "kiss": "/img/kiss",
    "hug": "/img/hug",
    "foxGirl": "/img/fox_girl",
    "feed": "/img/feed",
    "cuddle": "/img/cuddle",
    "why": "/why",
    "catText": "/cat",
    "OwOify": "/owoify",
    "8Ball": "/8ball",
    "fact": "/fact",
    "nekoGif": "/img/ngif",
    "kemonomimi": "/img/kemonomimi",
    "holo": "/img/holo",
    "smug": "/img/smug",
    "baka": "/img/baka",
    "woof": "/img/woof",
    "spoiler": "/spoiler",
    "wallpaper": "/img/wallpaper",
    "goose": "/img/goose",
    "gecg": "/img/gecg",
    "avatar": "/img/avatar",
    "waifu": "/img/waifu"
  }
}
