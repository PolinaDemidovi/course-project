document.querySelector('.checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    document.getElementById('successNotification').style.display = 'block';

    setTimeout(function(){
        document.getElementById('successNotification').style.display = 'none';
    }, 5000);
});

window.addEventListener("load", () => {
    let temp = [];
    let name, price, picture, item, size;
    let totalSum = 0;

    for (let i = 1; i < sessionStorage.length; i = i + 4) {
        if (i == 1) {
            name = sessionStorage.getItem(`${i}name`);
            price = parseFloat(sessionStorage.getItem(`${i}price`));
            picture = sessionStorage.getItem(`${i}picture`);
            size = sessionStorage.getItem(`${i}size`);
        } else {
            name = sessionStorage.getItem(`${parseInt(i + 3) / 4}name`);
            price = parseFloat(sessionStorage.getItem(`${parseInt(i + 3) / 4}price`));
            picture = sessionStorage.getItem(`${parseInt(i + 3) / 4}picture`);
            size = sessionStorage.getItem(`${parseInt(i + 3) / 4}size`);
        }
        totalSum += price;
        item = { name: name, price: price, picture: picture, size: size };
        temp.push(item);
    }

    const main = document.querySelector(".items-container");

    if (temp.length === 0) {
        const emptyCartText = document.createElement("div");
        emptyCartText.classList.add("storage");
        emptyCartText.textContent = "Корзина пуста";
        main.appendChild(emptyCartText);
    } else {
        temp.forEach((item) => {
            const node = document.createElement("div");
            node.classList.add("item");

            const image = document.createElement("img");
            image.src = item.picture;
            node.appendChild(image);

            let info = document.createElement("div");
            info.classList.add("item-info");

            let priceElement = document.createElement("p");
            priceElement.textContent = `Цена: ${item.price}`;
            let nameElement = document.createElement("p");
            nameElement.textContent = item.name;
            let sizeElement = document.createElement("p");
            sizeElement.textContent = `Размер: ${item.size}`;
            info.appendChild(priceElement);
            info.appendChild(nameElement);
            info.appendChild(sizeElement);
            node.appendChild(info);

            let qc = document.createElement("div");
            qc.classList.add("quantity-counter");
            let qd = document.createElement("button");
            qd.classList.add("quantity-decrease");
            qd.textContent = "-";
            let q = document.createElement("div");
            q.classList.add("quantity");
            q.textContent = "1";
            let qi = document.createElement("button");
            qi.classList.add("quantity-increase");
            qi.textContent = "+";
            qc.appendChild(qd);
            qc.appendChild(q);
            qc.appendChild(qi);
            info.appendChild(qc);

            let deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.classList.add("delete-btn");
            node.appendChild(deleteButton);

            deleteButton.addEventListener("click", deleteFromCart);

            main.appendChild(node);
        });

        const totalElement = document.querySelector(".total p");
        totalElement.textContent = `Итог: $${totalSum.toFixed(2)}`;
    }

    const decreaseButtons = document.querySelectorAll(".quantity-decrease");
    const increaseButtons = document.querySelectorAll(".quantity-increase");

    decreaseButtons.forEach(button => {
        button.addEventListener("click", function() {
            let quantityDisplay = button.parentElement.querySelector(".quantity");
            let quantity = parseInt(quantityDisplay.textContent);
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateTotalPrice();
            }
        });
    });

    increaseButtons.forEach(button => {
        button.addEventListener("click", function() {
            let quantityDisplay = button.parentElement.querySelector(".quantity");
            let quantity = parseInt(quantityDisplay.textContent);
            quantity++;
            quantityDisplay.textContent = quantity;
            updateTotalPrice();
        });
    });

    function updateTotalPrice() {
        let totalPrice = 0;
        temp.forEach((item) => {
            let quantity = parseInt(item.node.querySelector(".quantity").textContent);
            totalPrice += quantity * item.price;
        });
        totalElement.textContent = `Итог: $${totalPrice.toFixed(2)}`;
    }
});

const orderButton = document.querySelector(".order-btn");
orderButton.addEventListener("click", () => {
    sessionStorage.clear();
    location.reload();
});

function deleteFromCart(event) {
    let deleteButton = event.target;
    let itemContainer = deleteButton.closest(".item");
    let itemName = itemContainer.querySelector(".item-info p").textContent;

    itemContainer.parentNode.removeChild(itemContainer);

    console.log("Before deletion:");
    for (let i = 0; i < localStorage.length; i++) {
        console.log(`${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`);
    }

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(`${i}name`) === itemName) {
            localStorage.removeItem(`${i}name`);
            localStorage.removeItem(`${i}price`);
            localStorage.removeItem(`${i}picture`);
            localStorage.removeItem(`${i}size`);
            break;
        }
    }

    console.log("After deletion:");
    for (let i = 0; i < localStorage.length; i++) {
        console.log(`${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}`);
    }
}


