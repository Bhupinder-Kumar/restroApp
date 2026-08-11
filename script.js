
let localData = JSON.parse(localStorage.getItem("food"));
let food = localData ? localData : [];

let addItems = document.querySelector("#addItems");
let foodList = document.querySelector("#foodList");
let itemCount = document.querySelector("#itemCount");

addItems.addEventListener("click", addItemsFunc);

displayFood();

function addItemsFunc() {
    let name = document.querySelector("#name").value;
    let price = document.querySelector("#price").value;
    let id = Date.now();

    if (!name || !price) {
        alert("Please enter food name and price");
        return;
    }

    let collection = {
        name,
        price,
        id
    };

    food.push(collection);

    localStorage.setItem(
        "food",
        JSON.stringify(food)
    );

    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";

    displayFood();

};

document.querySelector("#price").addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        addItemsFunc();
    }
});
        

function displayFood() {
    let collection = "";

    if (food.length === 0) {
        collection = `
            <li class="empty">
                🍽️ No food items added yet
            </li>
        `;
    } else {
        for (const item of food) {
            collection += `
                <li>
                    <div class="food-info">
                        <div class="food-icon">
                            🍴
                        </div>

                        <div class="food-details">
                            <div class="food-name">
                                ${item.name}
                            </div>

                            <div class="food-price">
                                ₹${item.price}
                            </div>
                        </div>
                    </div>

                    <button
                        class="delete-btn"
                        onclick="deleteItem(${item.id})"
                    >
                        Delete
                    </button>
                </li>
            `;
        }
    }

    foodList.innerHTML = collection;

    itemCount.textContent =
        `${food.length} ${food.length === 1 ? "item" : "items"}`;
}

function deleteItem(id) {
    food = food.filter(
        (item) => item.id !== Number(id)
    );

    localStorage.setItem(
        "food",
        JSON.stringify(food)
    );

    displayFood();
}