// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const title = document.createElement('h2');
  title.className = 'discussion__title';

  const linkA = document.createElement('a');
  linkA.href = obj.url;
  linkA.textContent = obj.title;
  title.append(linkA);
  discussionContent.append(title);

  const info = document.createElement('div');
  info.className = 'discussion__information';

  // createdAt 시간 포맷 변경
  let year = obj.createdAt.slice(0, 4);
  let month = obj.createdAt.slice(5, 7);
  let date = obj.createdAt.slice(8, 10);
  let time = obj.createdAt.slice(11, 19);

  // id가 아닌 author로...
  const infoP = document.createElement('p');
  infoP.textContent = `${obj.author} / ${year + '.' + month + '.' + date + '_' + time}`;
  info.append(infoP);
  discussionContent.append(info);

  const checkedP = document.createElement('p');
  checkedP.textContent = '☑';

  const unchecked = document.createElement('p');
  unchecked.textContent = '☒';

  if (obj.answer) {
    discussionAnswered.append(checkedP);
  } else {
    discussionAnswered.append(unchecked);
  }
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// input 요소 가져오기
const form = document.querySelector('form.form');
const nameInput = document.querySelector('input#name');
const titleInput = document.querySelector('input#title');
const question = document.querySelector('textarea#story');

form.addEventListener('submit',function (event) {
  event.preventDefault();

  let today = new Date();
  let setTime = today.getFullYear() + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + ('0' + today.getDate()).slice(-2)
    + '_' + ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2) + ':' + ('0' + today.getSeconds()).slice(-2);

  const newObj = {
    author: nameInput.value,
    createdAt: setTime,
    title: titleInput.value,
    url: 'javascript:void(0)',
    avatarUrl: './images/꽃.jpg'
  };

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(newObj);

  // 화면 다 지우고 
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  // 로컬 스토리지
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(newObj));

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render(ul);
  // ul.prepend(convertToDiscussion(newObj));
  nameInput.value = '';
  titleInput.value = '';
  question.value = '';  

})


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  for (let i = 1; i <= agoraStatesDiscussions.length; i += 1) {
    if (i >= from && i <= to) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i - 1]));  
    }
  }
  return;
};

const from = 1;
const limit = 8;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, from, limit);

// 페이지네이션 구현
const pointerForPage = document.querySelectorAll('.pointer');
const pageNum = document.querySelectorAll('.page');

pageNum[0].addEventListener('click', function () {
  render(ul, from, limit);
})
pageNum[1].addEventListener('click', function () {
  render(ul, from + 8, limit + 8);
})
pageNum[2].addEventListener('click', function () {
  render(ul, from + 16, limit + 16);
})
pageNum[3].addEventListener('click', function () {
  render(ul, from + 24, limit + 24);
})
pageNum[4].addEventListener('click', function () {
  render(ul, from + 32, limit + 32);
})
pageNum[5].addEventListener('click', function () {
  render(ul, from + 40, limit + 40);
}) 

pointerForPage[0].addEventListener('click', function () {
  render(ul, from, limit);
})
pointerForPage[1].addEventListener('click', function () {
  render(ul, from + 40, limit + 40);
}) 