import "./styles/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  // 共通処理を書いていく
  console.log("common script loaded");
});

// FVアニメーション
const video = document.getElementById("meeVideo");
video.pause();
video.currentTime = 0;
let played = false;

function playVideoOnce() {
  if (played) return;
  played = true;
  video.play().catch(() => {});
}

const tl = gsap.timeline({
  paused: true,
  onComplete: () => {
    document.body.classList.remove("is-hidden");
  },
});
tl.to("#main", {
  opacity: 1,
  duration: 0.5,
});
tl.to(".m-top-mv__img", {
  opacity: 1,
  duration: 1,
  ease: "sine.out",
}).call(playVideoOnce);
tl.to(".m-top-mv__comment01", { opacity: 1, x: 0, y: 0, duration: 0.5 });
tl.to(
  ".m-top-mv__comment02",
  { opacity: 1, x: 0, y: 0, duration: 0.5 },
  "<+0.1",
);
tl.to(".m-top-fv__scroll", { opacity: 1, duration: 0.5 });

// ローディングアニメーション
const loadingTl = gsap.timeline({
  paused: true,
  onComplete: () => {
    tl.restart();
  },
});
loadingTl
  .fromTo(
    ".m-top-loading__circle svg",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.6,
      repeat: 5,
      yoyo: true,
      ease: "sine.inOut",
    },
  )
  .call(() => {
    document.querySelector("#loading")?.remove();
  });

const hasVisited = sessionStorage.getItem("visited");

if (!hasVisited) {
  sessionStorage.setItem("visited", "true");
  document.body.classList.add("is-loading");
  loadingTl.restart();
} else {
  document.querySelector("#loading")?.remove();
  tl.restart();
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    document.querySelector(".m-top-fv__scroll").style.opacity = "0";
  } else {
    document.querySelector(".m-top-fv__scroll").style.opacity = "1";
  }
});

ScrollTrigger.create({
  trigger: ".m-top-fv",
  start: "top top",
  endTrigger: ".m-top-works__wrapper",
  end: "top top",
  pin: true,
  pinSpacing: false,
});

gsap.to(".m-top-works__wrapper", {
  y: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  paddingTop: "8vw",
  ease: "none",
  scrollTrigger: {
    trigger: ".m-top-works__wrapper",
    start: "top 85%",
    end: "top top",
    scrub: true,
  },
});

gsap.utils.toArray(".js-ttl-fadeup").forEach((el) => {
  gsap.to(el.querySelectorAll("span"), {
    y: 0,
    duration: 0.3,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top 90%",
    },
  });
});

// モーダル
const modal = document.getElementById("modal");
const openBtn = document.querySelector(".js-modal-open");
const closeBtns = document.querySelectorAll(".js-modal-close");

openBtn.addEventListener("click", () => {
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden";
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }
});

// スムーススクロール
const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");
    const targetSection = document.querySelector(href);
    const sectionTop = targetSection.getBoundingClientRect().top;
    const currentPos = window.scrollY;
    const gap = 0;
    const target = sectionTop + currentPos - gap;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  });
});
