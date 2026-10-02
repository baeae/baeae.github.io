// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
             <p class="card-title">${item.content}</p>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/

function filterAndSortFruits() {
  const search = searchBox.value;
  let op = document.querySelectorAll("option");
  let result = fruits;
  if (searchBox.value != "") {
    // 입력받는순간 한글자라도 해당되는 요소(과일이름) 찾음.
    renderProducts(
      result.filter((f) => f.name.indexOf(search) != -1),
      fruitList,
    );
    return;
  }
  op.forEach((o) => {
    // index.HTML에 option요소들을 배열로 가지고와서 하나하나 selected 값을 확인해서 true면 if문으로 value확인.
    if (o.selected) {
      if (o.value == "high") {
        result.sort((f1, f2) => f2.price - f1.price);
      } else if (o.value == "name") {
        result.sort((f1, f2) => f1.name.localeCompare(f2.name));
      } else if (o.value == "low") {
        result.sort((f1, f2) => f1.price - f2.price);
      }
    }
  });

  //화면에 다시 출력
  renderProducts(result, fruitList);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  renderProducts(veggies.slice(0, veggiePage + 3), veggieList);

  veggiePage += 3;

  if (veggiePage > veggies.length) {
    alert("상품이 더이상없습니다.");
  }

  //화면에 다시 출력
  //renderProducts(?, ?);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
