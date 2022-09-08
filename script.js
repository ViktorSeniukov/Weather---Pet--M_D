let today = new Date();
let now = today.toLocaleDateString('ru-RU');
let upData = document.getElementById("up_Data");

function changeData() {
  upData.innerHTML = now;
}

changeData();