let countOrders = 1;

function addNewOrder(){
    countOrders++;
    let allOrders = document.getElementsByClassName("beverage");
    let oldOrder = allOrders[allOrders.length - 1];
    let newOrder = oldOrder.cloneNode(true);
    newOrder.getElementsByClassName("beverage-count")[0].innerHTML = `Напиток №${countOrders}`;
    oldOrder.after(newOrder);

    updateOrderNumbers();
}

function CreateCross(form) {
    let cross = document.createElement("button");
    cross.textContent = "X";
    cross.style.float = "right";
    cross.className = "cross-button";
    form.prepend(cross);
    return cross;
}

function updateOrderNumbers() {
    const allOrders = document.getElementsByClassName("beverage");
    for (let i = 0; i < allOrders.length; i++) {
        allOrders[i].getElementsByClassName("beverage-count")[0].innerHTML = `Напиток №${i+1}`;
    }
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("cross-button")) {
        let form = e.target.parentNode;
        const orderNumber = parseInt(form.getElementsByClassName("beverage-count")[0].innerHTML.split('№')[1]);
        form.remove();

        updateOrderNumbers();
    }
});

function CreateCrossForReadyForm(form) {
    if (!form.querySelector(".cross-button")) {
        let cross = document.createElement("button");
        cross.textContent = "X";
        cross.style.float = "right";
        cross.className = "cross-button";
        cross.addEventListener("click", function(e) {
            form.style.display = "none";
            document.querySelector(".overlay").style.display = "none";
        });
        form.prepend(cross);
    } else {
        form.style.display = "block";
        document.querySelector(".overlay").style.display = "block";
    }
}


function CreateOrderReadyModalWindow() {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.style.display = "none";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.position = "fixed";
    overlay.style.zIndex = 1;
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    let modalWindow = document.createElement("div");
    modalWindow.id = "modalWindow";
    modalWindow.style.display = "none";
    modalWindow.style.backgroundColor = "darkgreen";
    modalWindow.style.position = "fixed";
    modalWindow.style.transform = "translate(-50%, -50%)";
    modalWindow.style.top = "50%";
    modalWindow.style.left = "50%";
    modalWindow.style.width = "500px";
    modalWindow.style.padding = "10px";
    modalWindow.textContent = "Заказ принят!";
    modalWindow.style.textAlign = "center";

    document.body.prepend(overlay);
    overlay.appendChild(modalWindow);

    return modalWindow;
}

function ShowModalWindow(modalWindow) {
    let submitButton = document.querySelector(".submit-button");

    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        modalWindow.style.display = "block";
        modalWindow.textContent = "Заказ принят! \nВы заказали " + drinksNumber();
        CreateCrossForReadyForm(modalWindow);
        document.querySelector(".overlay").style.display = "block";
    });
}


function drinksNumber() {
    let number = " напитков";
    if (countOrders === 1) {
        number = " напиток";
    } else if (countOrders % 10 === 2 || countOrders % 10 === 3 || countOrders % 10 === 4) {
        number = " напитка";
    }
    return countOrders + number;
}


let form = document.querySelector(".beverage");
CreateCross(form);

let modalWindow = CreateOrderReadyModalWindow();
ShowModalWindow(modalWindow);

document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
});

document.getElementsByClassName("add-button")[0].addEventListener("click", addNewOrder);

document.addEventListener("input", function(e) {
    if (e.target.tagName === "TEXTAREA") {
        let userInput = e.target.value;
        let userText = document.querySelector(".user-input-text");

        userText.innerHTML = userInput.replace(/(срочно|быстрее|побыстрее|скорее|поскорее|очень нужно)/gi, '<b>$1</b>');
    }
});