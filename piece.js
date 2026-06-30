const world = document.querySelector(".world");
const images = document.querySelectorAll(".img");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const resetButton = document.getElementById("reset-view");

const isMobile = window.innerWidth < 768;

const WORLD_WIDTH = isMobile ? 2200 : 3000;
const WORLD_HEIGHT = isMobile ? 3600 : 2200;

const contents = {
  1: `
    <p>누런 집이 있었다. 노란게 아니라 누런. 불투명한 누런 집.</p>

    <p>
      그 집은 얇다가도 두텁고, 투명하다가도 불투명했으며
      그 집은 누런색이 아니라 누런 느낌이었다.
    </p>

    <p>누런색이 아니라 누런 느낌의 집.</p>

    <p>
      그 자체로 보이다가도 갑자기 뻥 뚫려 배경과 하나가 됐다.
      그렇게 붙었다가도 떨어지기를 반복하는 집이었다.
    </p>

    <p>
      붙었다가 떨어지고, 붙었다가 떨어지고, 붙었다가 떨어지는 집이었다.
    </p>
  `,

  2: `
    <h2>안골능선</h2>
    <img src="images/answer.png">
    <p>나는 이름만 알면 되었는데 이름을 알 수가 없었다.</p>
    <p>어디에 있는지도 아는데 이름을 알 수가 없다는게 믿을 수 없어서 만져보기로 했다.</p>
    <p>손끝에 닿고 있으나 이게 어디에 있는 것인지 알 수가 없어졌다.</p>
    <p>그 어떤 기관과도 연결되지 않는 국가의 구조물은 어디에 있는걸까?</p>
  `,

  3: `
    <h2>안골능선</h2>
    <p>두번 째 갔을때야 발견했다.</p>
    <p>오래된 말뚝. 등산로의 입구에 이곳의 이름이 박혀 있다.</p>
    <p>이 말뚝을 지나쳐 수 분 내에 마주치게 되는 남아있는 것들.</p>
    <p>그래서 지금 현재의 상태를 알고 싶었다. 현재의 정보. 현재의 구역의 이름. 무어라 칭해지고 무어라 저장되어있는지. 그걸 알기까지는 꽤 많은 시간과 경로가 필요한 듯 하다.</p>
  `,

  4: `
    <img src="images/white1.jpg">
    <img src="images/white2.jpg">
    <p>막이 내린 극장 같이. 그런데 커튼 사이로</p>
  `,

  5: `
    <p>붓질을 닮은 나무</p>
  `,

  6: `
    <p>껍질 껍데기</p>
    <img src="images/wall3.jpg">
    <img src="images/wall2.jpg">
    <img src="images/wall1.jpg">
  `
};

/* =========================
   랜덤 배치
========================= */

images.forEach(img => {
  const randomWidth = Math.floor(Math.random() * 850) + 50;
  const randomLeft = Math.floor(Math.random() * (WORLD_WIDTH - randomWidth));
  const randomTop = Math.floor(Math.random() * (WORLD_HEIGHT - randomWidth));

  img.style.width = randomWidth + "px";
  img.style.left = randomLeft + "px";
  img.style.top = randomTop + "px";
});

/* =========================
   카메라
========================= */

let scale = 1;
let cameraX = 0;
let cameraY = 0;

function updateCamera() {
  world.style.transform =
    `translate(${cameraX}px, ${cameraY}px) scale(${scale})`;
}

function getMinScale() {
  const scaleX = window.innerWidth / WORLD_WIDTH;
  const scaleY = window.innerHeight / WORLD_HEIGHT;
  return Math.min(scaleX, scaleY) * 0.95;
}

function resetView() {
  scale = getMinScale();

  cameraX = (window.innerWidth - WORLD_WIDTH * scale) / 2;
  cameraY = (window.innerHeight - WORLD_HEIGHT * scale) / 2;

  updateCamera();
}

function screenToWorld(x, y) {
  return {
    x: (x - cameraX) / scale,
    y: (y - cameraY) / scale
  };
}

resetView();

/* =========================
   이미지 드래그
========================= */

let current = null;
let offsetX = 0;
let offsetY = 0;
let z = 1;

images.forEach(img => {

  img.addEventListener("mousedown", (e) => {
    e.stopPropagation();

    current = img;

    const pos = screenToWorld(e.clientX, e.clientY);

    offsetX = pos.x - img.offsetLeft;
    offsetY = pos.y - img.offsetTop;

    z++;
    img.style.zIndex = z;
  });

  img.addEventListener("dblclick", (e) => {
    e.stopPropagation();

    const id = img.dataset.id;

    modalContent.innerHTML = contents[id] || "";

    images.forEach(image => {
      image.classList.remove("active");
      image.classList.add("dim");
    });

    img.classList.remove("dim");
    img.classList.add("active");

    z++;
    img.style.zIndex = z;

    modal.style.display = "flex";
  });

});

document.addEventListener("mousemove", (e) => {
  if (!current) return;

  const pos = screenToWorld(e.clientX, e.clientY);

  let newLeft = pos.x - offsetX;
  let newTop = pos.y - offsetY;

  const maxLeft = WORLD_WIDTH - current.offsetWidth;
  const maxTop = WORLD_HEIGHT - current.offsetHeight;

  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  newTop = Math.max(0, Math.min(newTop, maxTop));

  current.style.left = newLeft + "px";
  current.style.top = newTop + "px";
});

document.addEventListener("mouseup", () => {
  current = null;
});

/* =========================
   PC 휠 확대/축소
========================= */

document.addEventListener("wheel", (e) => {
  if (modal.style.display === "flex") return;

  e.preventDefault();

  const minScale = getMinScale();
  const mouseBefore = screenToWorld(e.clientX, e.clientY);

  const zoomAmount = -e.deltaY * 0.001;
  scale = Math.min(Math.max(scale + zoomAmount, minScale), 3.5);

  cameraX = e.clientX - mouseBefore.x * scale;
  cameraY = e.clientY - mouseBefore.y * scale;

  if (scale === minScale) {
    resetView();
  } else {
    updateCamera();
  }

}, { passive: false });

/* =========================
   모바일 터치 드래그 / 더블탭 / 핀치줌
========================= */

let touchCurrent = null;
let touchOffsetX = 0;
let touchOffsetY = 0;
let lastTouchDistance = null;
let lastTapTime = 0;

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

images.forEach(img => {

  img.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;

    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();

    if (now - lastTapTime < 300) {
      const id = img.dataset.id;

      modalContent.innerHTML = contents[id] || "";

      images.forEach(image => {
        image.classList.remove("active");
        image.classList.add("dim");
      });

      img.classList.remove("dim");
      img.classList.add("active");

      z++;
      img.style.zIndex = z;

      modal.style.display = "flex";

      lastTapTime = 0;
      return;
    }

    lastTapTime = now;

    touchCurrent = img;

    const touch = e.touches[0];
    const pos = screenToWorld(touch.clientX, touch.clientY);

    touchOffsetX = pos.x - img.offsetLeft;
    touchOffsetY = pos.y - img.offsetTop;

    z++;
    img.style.zIndex = z;

  }, { passive: false });

});

document.addEventListener("touchmove", (e) => {
  if (modal.style.display === "flex") return;

  if (e.touches.length === 1 && touchCurrent) {
    e.preventDefault();

    const touch = e.touches[0];
    const pos = screenToWorld(touch.clientX, touch.clientY);

    let newLeft = pos.x - touchOffsetX;
    let newTop = pos.y - touchOffsetY;

    const maxLeft = WORLD_WIDTH - touchCurrent.offsetWidth;
    const maxTop = WORLD_HEIGHT - touchCurrent.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    touchCurrent.style.left = newLeft + "px";
    touchCurrent.style.top = newTop + "px";
  }

  if (e.touches.length === 2) {
    e.preventDefault();

    const newDistance = getTouchDistance(e.touches);

    if (lastTouchDistance === null) {
      lastTouchDistance = newDistance;
      return;
    }

    const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

    const before = screenToWorld(centerX, centerY);

    const minScale = getMinScale();
    const zoomChange = (newDistance - lastTouchDistance) * 0.005;

    scale = Math.min(Math.max(scale + zoomChange, minScale), 3.5);

    cameraX = centerX - before.x * scale;
    cameraY = centerY - before.y * scale;

    if (scale === minScale) {
      resetView();
    } else {
      updateCamera();
    }

    lastTouchDistance = newDistance;
  }

}, { passive: false });

document.addEventListener("touchend", () => {
  touchCurrent = null;
  lastTouchDistance = null;
});

/* =========================
   모달 닫기
========================= */

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";

    images.forEach(img => {
      img.classList.remove("active");
      img.classList.remove("dim");
    });
  }
});

/* =========================
   전체보기 버튼 / r 키 / 화면 회전
========================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "r") {
    resetView();
  }
});

resetButton.addEventListener("click", () => {
  resetView();
});

window.addEventListener("resize", () => {
  resetView();
});