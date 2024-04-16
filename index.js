let countOrders = 1;
document.getElementsByClassName("add-button")[0].addEventListener("click", addNewOrder);

function addNewOrder(){
    countOrders++;
    let allOrders = document.getElementsByClassName("beverage");
    let oldOrder = allOrders[allOrders.length - 1];
    let newOrder = oldOrder.cloneNode(true);
    newOrder.getElementsByClassName("beverage-count")[0].innerHTML = `Напиток №${countOrders}`;
    oldOrder.after(newOrder);
}
