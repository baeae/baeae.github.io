// 초기데이터
let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];

// 요일 출력을 위한 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  initData(mockData);

  const today = new Date();
  let year = today.getFullYear(); //년
  let month = today.getMonth(); // 월
  let date = today.getDate(); // 일
  let days = day[today.getDay()];

  document.querySelector("h1").innerHTML =
    `${year + "년"} ${month + 1 + "월"} ${date + "일"} ${days + "요일"}`;
};

const initData = (printData) => {
  document.querySelector(".todos_wrapper").innerHTML = "";
  printData.forEach((element) => {
    document.querySelector(".todos_wrapper").innerHTML +=
      `<div class="TodoItem">
            <input type="checkbox" onchange = "onUpdate(${element.id})"  ${element.isDone && "checked"} />     
            <div class="content">${element.content}</div>
            <div class="date">${new Date(element.date).toLocaleString()}</div>
            <button name = "btn" value = "${element.id}" onClick="todoDel(this)">삭제</button>
          </div>`;
  });
};

let idIndex = 3; //id값을 증가시킬 변수

document
  .querySelector(".Editor > button")
  .addEventListener("click", function () {
    event.preventDefault();

    mockData.push({
      id: idIndex++,
      isdDone: false,
      content: document.querySelector("#input").value,
      date: new Date().getTime(),
    });

    document.querySelector("#input").value = "";

    initData(mockData); //호출한다.(다시화면 랜더링)
  });

const onUpdate = (targetId) => {
  //TodoItem에서 호출할때 전달한 Id

  mockData = mockData.map((data) => {
    if (targetId === data.id) {
      if (data.isDone === true) {
        data.isDone = false;
      } else {
        data.isDone = true;
      }
    }
    return data;
  });

  initData(mockData);
};

const todoDel = (th) => {
  //filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담는다
  mockData = mockData.filter((data) => {
    if (parseInt(th.value) !== data.id) {
      return data;
    }
  });
  initData(mockData);
};

document.querySelector("#keyword").addEventListener("keyup", () => {
  let searchedTodos = getFilterData(event.target.value);

  initData(searchedTodos);
});

const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  }

  //filter 함수를 이용해서 search(검색어)를 포함하고 있는 todo를 받는다.
  let result = mockData.filter((m) => m.content.indexOf(search) != -1);
  console.log(result);
  return result;
};
