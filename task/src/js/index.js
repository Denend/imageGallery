const fetchUrl = "http://www.splashbase.co/api/v1/images/search?query=tree"

document.addEventListener("DOMContentLoaded", onloadEvents());
document.getElementById('showMore-button').addEventListener('click',e => showMore(e.target));  // unclear with event here
Array.from(document.getElementsByClassName('flex-button')).forEach(e=>{
  e.addEventListener('click', function(e){
    if(document.querySelector('.is-active')){
      document.querySelector('.is-active').classList.toggle('is-active')
    };
    e.target.classList.toggle("is-active")
    document.getElementById('showMore-button').innerHTML = "SHOW MORE";
    fetchAndMap(e.target.innerHTML,10)
  })
})

function removeAllImages(elm){
  while (elm.hasChildNodes()) {
    elm.removeChild(elm.lastChild);
  }
}

function fetchAndMap(textOfclickedButton, numberOfPicturesShown){
  const imgContainerDiv = document.getElementById('image-container');
  removeAllImages(imgContainerDiv);
  fetch(fetchUrl).then(res =>{
    return res.json()
  }).then(someParam => {
    someParam.images.some((e,i)=>{
      if(textOfclickedButton==="showall"){
        let img = document.createElement("img");
        img.src = e.url;
        imgContainerDiv.append(img);
        img.style.width = (i==0)?'200px':((i%4)?'200px':'400px');
        return imgContainerDiv.childElementCount === numberOfPicturesShown
      } else {
        let img = e.url.includes(textOfclickedButton)?document.createElement("img"):'';
        img?(img.style.width = (i==0)?'200px':((i%4)?'200px':'400px')):'';
        img.src = e.url.includes(textOfclickedButton)?e.url:'';
        imgContainerDiv.append(img);
        return imgContainerDiv.childElementCount === numberOfPicturesShown
      }
    })
  })
}

function onloadEvents(){
  window.onload = fetchAndMap("showall",10);
  document.getElementsByClassName('flex-button')[0].classList.toggle("is-active");
}

function showMore(eventTarget){
  let activeButtonText = document.querySelector('.is-active').innerHTML;
  if(eventTarget.innerHTML === "SHOW MORE"){
    fetchAndMap(activeButtonText,'all');
    eventTarget.innerHTML = "HIDE EXTRA"
  } else {
    fetchAndMap(activeButtonText,10);
    eventTarget.innerHTML = "SHOW MORE"
  };
}
