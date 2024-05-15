window.addEventListener("load", () => {
  const main = document.querySelector(".items-container");
  const localStorageKeys = Object.keys(localStorage);
  
  if (localStorageKeys.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.classList.add("storage");
      emptyMessage.textContent = "Избранное пусто";
      main.appendChild(emptyMessage);
  } else {
      for (let i = 0; i < localStorageKeys.length; i++) {
          const key = localStorageKeys[i];
          if (key.endsWith("nameL")) {
              const index = key.replace("nameL", "");
              const name = localStorage.getItem(`${index}nameL`);
              const price = localStorage.getItem(`${index}priceL`);
              const picture = localStorage.getItem(`${index}pictureL`);
              const size = localStorage.getItem(`${index}sizeL`);

              const node = document.createElement("div");
              node.classList.add("item");

              const image = document.createElement("img");
              image.src = picture;
              node.appendChild(image);

              const info = document.createElement("div");
              info.classList.add("item-info");

              const priceParagraph = document.createElement("p");
              priceParagraph.innerHTML = `Цена: ${price}`;
              info.appendChild(priceParagraph);

              const nameParagraph = document.createElement("p");
              nameParagraph.innerHTML = name;
              info.appendChild(nameParagraph);

              const sizeParagraph = document.createElement("p");
              sizeParagraph.innerHTML = `Размер: ${size}`;
              info.appendChild(sizeParagraph);

              const toBeanButton = document.createElement("button");
              toBeanButton.innerHTML = "В корзину";
              toBeanButton.classList.add("bean-button");
              toBeanButton.addEventListener("click", addToBean);
              info.appendChild(toBeanButton);

              node.appendChild(info);

              const deleteButton = document.createElement("button");
              deleteButton.innerHTML = "X";
              deleteButton.classList.add("delete-btn");
              deleteButton.addEventListener("click", deleteFromLiked);
              node.appendChild(deleteButton);

              main.appendChild(node);
          }
      }
  }
});

function deleteFromLiked(event) {
  const targetItem = event.target.parentElement;
  const itemName = targetItem.querySelector(".item-info p:nth-child(2)").textContent;

  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.endsWith("nameL") && localStorage.getItem(key) === itemName) {
          const index = key.replace("nameL", "");
          localStorage.removeItem(`${index}nameL`);
          localStorage.removeItem(`${index}priceL`);
          localStorage.removeItem(`${index}pictureL`);
          localStorage.removeItem(`${index}sizeL`);
          break;
      }
  }

  targetItem.remove();
}

function addToBean(event) {
  const targetItem = event.target.parentElement;
  const itemName = targetItem.querySelector(".item-info p:nth-child(2)").textContent;
  const itemPrice = targetItem.querySelector(".item-info p:nth-child(1)").textContent.replace("Цена: ", "");
  const itemPicture = targetItem.parentElement.querySelector("img").src;
  const itemSize = targetItem.querySelector(".item-info p:nth-child(3)").textContent.replace("Размер: ", "");

  // Удаление товара из избранного
  for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.endsWith("nameL") && localStorage.getItem(key) === itemName) {
          const index = key.replace("nameL", "");
          localStorage.removeItem(`${index}nameL`);
          localStorage.removeItem(`${index}priceL`);
          localStorage.removeItem(`${index}pictureL`);
          localStorage.removeItem(`${index}sizeL`);
          break;
      }
  }

  // Проверка, добавлен ли товар уже в корзину
  let isAlreadyInCart = false;
  for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.endsWith("name") && sessionStorage.getItem(key) === itemName && sessionStorage.getItem(key.replace("name", "size")) === itemSize) {
          isAlreadyInCart = true;
          break;
      }
  }

  // Если товар еще не добавлен в корзину, добавляем
  if (!isAlreadyInCart) {
      const length = sessionStorage.length / 4 + 1;
      sessionStorage.setItem(`${length}name`, itemName);
      sessionStorage.setItem(`${length}price`, itemPrice);
      sessionStorage.setItem(`${length}picture`, itemPicture);
      sessionStorage.setItem(`${length}size`, itemSize);
  } else {
      alert("Товар уже в корзине");
  }

  // Обновляем страницу, чтобы отразить изменения в избранном
  location.reload();
}