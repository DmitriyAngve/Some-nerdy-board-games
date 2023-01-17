const output = document.querySelector(".output");
const btn1 = document.createElement("button");
btn1.textContent = "Reload";
btn1.addEventListener("click", reloader);
btn1.classList.add("btn");

const new_div = document.getElementsByClassName("content");

// const input1 = document.createElement("input");
// const input2 = document.createElement("input");
// const input3 = document.createElement("input");
// const input4 = document.createElement("input");
// const input5 = document.createElement("input");
// const input6 = document.createElement("input");
const btn2 = document.createElement("button");
const div1 = document.createElement("div");
// appender(input1);
// appender(input2);
// appender(input3);
// appender(input4);
// appender(input5);
// appender(input6);
appender(btn2);

btn2.textContent = "Add to Army List";
// input1.setAttribute("placeholder", "Fraction");
// input2.setAttribute("placeholder", "Leader Name");
// input3.setAttribute("placeholder", "Unit");
// input4.setAttribute("placeholder", "Status");
// input5.setAttribute("placeholder", "Hitpoints");
// input6.setAttribute("placeholder", "Taken Damage");

document.body.append(div1);
document.body.append(btn1);
btn2.addEventListener("click", addToList);

function appender(element) {
  div1.append(element);
}

const url = "list.json";
let myList = [];
let localData = localStorage.get;

window.addEventListener("DOMContentLoaded", () => {
  output.textContent = "Loading...";

  if (localData) {
    myList = JSON.parse(localStorage.getItem("myList"));
    maker();
  } else {
    reloader();
  }
});

function addToList() {
  const myObj = {
    fraction: input1.value,
    leader: input2.value,
    unit: input3.value,
    status: input4.value,
    hitpoints: input5.value,
    damage: input6.value,
  };

  const val = myList.length;
  myList.push(myObj);
  saveToStorage();
  makeList(myObj, val);
}

function reloader() {
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      myList = data;
      maker();
      saveToStorage();
    });
}

function maker() {
  output.innerHTML = "";
  myList.forEach((el, index) => {
    makeList(el, index);
  });
}

function makeList(item, index) {
  const div = document.createElement("div");

  div.classList.add("box");

  div.innerHTML = `${item.fraction} leaded with "${item.leader}" has "${item.unit}" with ${item.hitpoints} hitpoints. His status is ${item.status} with ${item.hitpoints} hitpoints`;
  output.append(div);

  if (item.status) {
    div.classList.add("dead");
  } else {
    div.classList.add("alive");
  }

  div.addEventListener("click", (e) => {
    div.classList.toggle("alive");
    div.classList.toggle("dead");

    if (item.hitpoints - item.damage > 0) {
      saveToStorage();
    } else {
      myList[index].status = "DEAD";
    }
    // console.log(myList);

    // localStorage.setItem("myList", JSON.stringify(myList));

    div.innerHTML = `${item.fraction} leaded with "${
      item.leader
    }", TAKES DAMAGE equals ${item.damage} to their "${item.unit}" with ${
      item.hitpoints
    } hitpoints. His status is ${item.status} with ${
      item.hitpoints - item.damage
    } hitpoints`;

    const span = document.createElement("span");
    span.textContent = "DELETE";
    div.append(span);
    span.addEventListener("click", (e) => {
      console.log(index);
      e.stopPropagation();
      div.remove();
      myList.splice(index, 1);
      saveToStorage();
    });
  });
}

function saveToStorage() {
  console.log(myList);
  localStorage.setItem("myList", JSON.stringify(myList));
}
