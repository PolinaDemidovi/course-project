// function deleteFromBean(str, event) {
//     console.log("F")
    
// for(; str<sessionStorage.length/4; str++){
//     sessionStorage.setItem(`${str}name`, sessionStorage[`${str+1}name`] )
// }
// sessionStorage.removeItem(`${str}name`)
// sessionStorage.removeItem(`${str}price`)
// sessionStorage.removeItem(`${str}picture`)
// }

function addToBean(event) {
  let arr = document.getElementsByClassName("bean-button");
  let index;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === event.target) {
      index = i;
    }
  }

  let name = document.getElementsByClassName("type")[index].innerHTML;
  let price = document.getElementsByClassName("cost")[index].innerHTML;
  let picture = document.getElementsByTagName("img")[index].src;
  let size = document.querySelector(".active");
  console.log(size)

  if(!size){
    alert('Выберите размер');
    return;
  }

  let flag = true,
    str;
  for (let i = 0; i < sessionStorage.length; i++) {
    str = i;
    if ((sessionStorage[`${str}name`] === name) && (sessionStorage[`${str}size`] === size.innerHTML)) {
      //проверка что такого цвета нет в хранилище
      alert("Товар уже в корзине");
    //   deleteFromBean(str);
      return;
    }
  }
  if (flag) {
    let leng = sessionStorage.length / 4 + 1;
            sessionStorage.setItem(`${leng}name`, name);
            sessionStorage.setItem(`${leng}price`, price);
            sessionStorage.setItem(`${leng}picture`, picture);
            sessionStorage.setItem(`${leng}size`, size.innerHTML);
  }
}

function addToLiked(event) {
    let arr = document.getElementsByTagName("rect");
    // console.log(arr);
    // console.log(event.target)
    let index;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === event.target) {
        index = i;
      }
    }
    // console.log(index)
  
    let name = document.getElementsByClassName("type")[index].innerHTML;
    let price = document.getElementsByClassName("cost")[index].innerHTML;
    let picture = document.getElementsByTagName("img")[index].src;
    let size = document.querySelector(".active");
    console.log(size)
  
    if(!size){
      alert('Выберите размер');
      return;
    }
  
    let flag = true,
      str;
    for (let i = 0; i < localStorage.length; i++) {
      str = i;
      if ((localStorage[`${str}nameL`] === name) && (localStorage[`${str}sizeL`] === size.innerHTML)) {
        //проверка что такого цвета нет в хранилище
        alert("Товар уже в избранном");
      //   deleteFromBean(str);
        return;
      }
    }
    if (flag) {
      let leng = localStorage.length / 4 + 1;
            localStorage.setItem(`${leng}nameL`, name);
            localStorage.setItem(`${leng}priceL`, price);
            localStorage.setItem(`${leng}pictureL`, picture);
            localStorage.setItem(`${leng}sizeL`, size.innerHTML);
    }
  }

  document.getElementById("showMoreButton").addEventListener("click", function() {
    var hiddenItem = document.getElementById("hidden-item");
    hiddenItem.removeAttribute("id");
    this.remove();
});