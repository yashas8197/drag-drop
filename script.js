const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  {
    name: "Elon Musk",
    netWorth: 219,
    country: "USA",
  },
  {
    name: "Bernard Arnault",
    netWorth: 211,
    country: "France",
  },
  {
    name: "Jeff Bezos",
    netWorth: 177,
    country: "USA",
  },
  {
    name: "Bill Gates",
    netWorth: 129,
    country: "USA",
  },
  {
    name: "Warren Buffett",
    netWorth: 118,
    country: "USA",
  },
];

const listItems = [];

let dragStartIndex;

createList();

function createList() {
  [...richestPeople].forEach((person, i) => {
    const listItem = document.createElement("li");

    listItem.setAttribute("data-index", i);

    listItem.innerHTML = `
        <span class="number">${i + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person.name}</p>
            <span>🪟</span>
        </div>
    `;

    listItems.push(listItem);

    draggableList.appendChild(listItem);

    addEventListeners();
  });
}

function dragStart() {
  dragStartIndex = this.closest("li").getAttribute("data-index");
}
function dragEnter() {
  this.classList.add("over");
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}
function dragLeave() {
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const draggableListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });
  draggableListItem.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dropenter", dragEnter);
    item.addEventListener("dropleave", dragLeave);
  });
}
