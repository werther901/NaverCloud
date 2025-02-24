import { cardImage, cardImage2, mo_cardImage, mo_cardImage2 } from "./data.js";

const header = document.querySelector("header");
const imgBox = document.querySelector(".img-box");
const naverLogo = document.querySelector(".naverLogo");
const introduceImg = document.querySelector(".imgBox img");
const topBtn = document.querySelector(".top_btn");

// 스크롤 내리면 header 배경, 아이콘 색상 변경, topBtn display
document.addEventListener("scroll", function () {
  if (window.scrollY > 1) {
    // 색상 변경
    header.classList.add("on");
    // global icon 변경
    imgBox.src = "./images/global_icon_b.png";
    naverLogo.src = "./images/main_logo.svg";
    // topBtn 출력
    topBtn.style.display = "block";
  } else {
    // 색상 원래대로
    header.classList.remove("on");
    // 아이콘 원래대로
    imgBox.src = "./images/global_icon_w.png";
    naverLogo.src = "./images/main_logo_w.svg";
    // topBtn 없어짐
    topBtn.style.display = "none";
  }
});

// Top 버튼 클릭 시 맨 위로 이동
const scrollTopBtn = () => {
  let scrollLength = setInterval(function () {
    if (window.scrollY > 1) {
      window.scrollBy(0, -70);
    } else {
      clearInterval(scrollLength);
    }
  }, 10);
};

topBtn.addEventListener("click", scrollTopBtn);

// forEach문으로 <li>에 img 추가
const addCard = document.querySelector(".addCard");
const marginTop = document.querySelector(".marginTop");
const m_addCard = document.querySelector(".m_addCard");
const m_marginTop = document.querySelector(".m_marginTop");

// max-width 767px 이하일 때 이미지 변경
const imgMedia = window.matchMedia("screen and (max-width: 767px)");

const mediaResize = () => {
  if (imgMedia.matches == true) {
    // 1. section02 img 작게
    introduceImg.src = "./images/mo_hyperscale_ai.png";

    // 2. section03 기존 <ul> card 내리기
    addCard.style.display = "none";
    marginTop.style.display = "none";
  } else {
    // 1. section02 img 크게
    introduceImg.src = "./images/hyperscale_ai.png";

    // 2. section03 첫번째 <ul>에 HTML추가
    addCard.style.display = "inline-block";

    cardImage.forEach((url, i) => {
      addCard.insertAdjacentHTML(
        "beforeend",
        `<li>
      <img src="${url}" alt="works01" />
        </li>`
      );
    });
    // 2. section03 두번째 <ul>에 HTML추가
    marginTop.style.display = "inline-block";

    cardImage2.forEach((url, i) => {
      marginTop.insertAdjacentHTML(
        "beforeend",
        `<li>
      <img src="${url}" alt="works01" />
        </li>`
      );
    });
  }
};

imgMedia.addEventListener("change", mediaResize);

mediaResize();

// 버튼누르면 슬라이드 넘어가기
const swiper_btn_pre = document.querySelector(".swiper_btn_pre");
const swiper_btn_next = document.querySelector(".swiper_btn_next");
const swiper_wrap = document.querySelector(".swiper_wrap");
const totalSlides = document.querySelectorAll(".slide").length;
const swiper_pagination_current = document.querySelector(".swiper_pagination_current");

let count = 0;

// 이전 버튼 클릭
const movePreScreen = (e) => {
  if (count != 0) {
    count -= 1;

    swiper_wrap.style.transform = `translateX(-${count * 100}vw)`;

    // page 개수 변경
    let numberPage = Number(swiper_pagination_current.textContent);
    let result = numberPage - 1;
    swiper_pagination_current.textContent = result;
  } else {
    count = totalSlides - 1;

    swiper_wrap.style.transform = `translateX(-${count * 100}vw)`;

    let numberPage = Number(swiper_pagination_current.textContent);
    let result = numberPage + 4;
    swiper_pagination_current.textContent = result;
  }
};

// 다음 버튼 클릭
const moveNextScreen = () => {
  if (count < totalSlides - 1) {
    count++;
    // console.log(count);

    swiper_wrap.style.transform = `translateX(-${count * 100}vw)`;

    let numberPage = Number(swiper_pagination_current.textContent);
    let result = numberPage + 1;
    swiper_pagination_current.textContent = result;
    // console.log(count);
  } else {
    swiper_wrap.style.transform = `translateX(-${totalSlides * 100}vw)`;

    // chatGpt가 짜준 코드임 아직 적용 No
    // 조건문 추가 : 5페이지에서 1페이지로 넘어갈때만 적용
    // setTimeout(() => {
    //   swiper_wrap.style.transition = "none";
    //   count = 0;
    //   swiper_wrap.style.transform = `translateX(0vw)`;
    // }, 10);

    // swiper_wrap.style.transition = "transform 0.5s ease-in-out";

    // let numberPage = Number(swiper_pagination_current.textContent);
    // let result = 1;
    // swiper_pagination_current.textContent = result;

    // 기존 코드
    count++;

    count = count % totalSlides;
    // console.log(count);
    swiper_wrap.style.transform = `translateX(-${count * 100}vw)`;

    let numberPage = Number(swiper_pagination_current.textContent);
    let result = (numberPage % 5) + 1;
    swiper_pagination_current.textContent = result;
  }
};

swiper_btn_pre.addEventListener("click", movePreScreen);
swiper_btn_next.addEventListener("click", moveNextScreen);

// 5초마다 다음페이지로 넘어감
function showSliding() {
  setInterval(moveNextScreen, 5000);
}

showSliding();

// 1280px 이상일 때 스크롤 한 번에 한 section씩 내려가기
// 진행중..
const sectionContainer = document.querySelector(".sectionContainer");
const section = document.querySelectorAll(".section");

let page = 0;

// document.addEventListener("wheel", function (e) {
//     e.preventDefault();

//     console.log('성공')

//     1280px 이상일 때만 적용
//       if (e.deltaY > 0) {
//         page++;
//         console.log(page)

//         if(page > 4) return;

//       } else if (e.deltaY < 0) {
//         page--;
//         console.log(page)
//       }
//       console.log(e.deltaY);

//       section.style.top = `${page * -100}vh`

//   },
//   { passive: false }
// );

// 클릭 시 one section 이동하는 버튼
const pcHide = document.querySelector(".pc_hide");
const target = document.querySelector(".main");

const clickScroll = (target) => {
  const targetPosition = target.offsetTop;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 700; // 애니메이션 지속 시간 (ms)
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    // 경과 시간 계산
    const timeElapsed = currentTime - startTime;
    console.log(timeElapsed);

    // 스크롤 위치 계산 (easeInOutQuad 사용)
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);

    // 애니메이션 계속 실행
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
    }
  }

  function easeInOutQuad(t, b, c, d) {
    t = t / (d / 2);
    if (t < 1) {
      return (c / 2) * t * t + b;
    } else {
      t--;
      return -(c / 2) * (t * (t - 2) - 1) + b;
    }
  }
  requestAnimationFrame(animation);
};

pcHide.addEventListener("click", function () {
  clickScroll(target);
});

// 준비중 알림
let hc_1 = document.querySelector(".hc_1");
let hc_2 = document.querySelector(".hc_2");
// let m_footerBtn_button = document.querySelector(".m_footerBtn > button");
let goodNewsBtn = document.querySelector(".goodNewsBtn button");

const ready = () => {
  alert("준비중 입니다.");
};

hc_1.addEventListener("click", ready);
hc_2.addEventListener("click", ready);
// m_footerBtn_button.addEventListener("click", ready);
goodNewsBtn.addEventListener("click", ready);
