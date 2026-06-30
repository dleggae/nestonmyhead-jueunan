const world = document.querySelector(".world");
const images = document.querySelectorAll(".img");
const textPieces = document.querySelectorAll(".text-piece");
const movablePieces = document.querySelectorAll(".img, .text-piece");

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const resetButton = document.getElementById("reset-view");

const isMobile = window.innerWidth < 768;
const WORLD_WIDTH = isMobile ? 2200 : 3000;
const WORLD_HEIGHT = isMobile ? 3600 : 2200;

const contents = {
  1: `
    <p>누런 집이 있었다. 노란게 아니라 누런. 불투명한 누런 집.</p>
    <p>그 집은 얇다가도 두텁고, 투명하다가도 불투명했으며 그 집은 누런색이 아니라 누런 느낌이었다.</p>
    <p>누런색이 아니라 누런 느낌의 집.</p>
    <p>그 자체로 보이다가도 갑자기 뻥 뚫려 배경과 하나가 됐다. 그렇게 붙었다가도 떨어지기를 반복하는 집이었다.</p>
  `,

  2: `
    <img src="images/answer.png">
    <p>나는 이름만 알면 되었는데 이름을 알 수가 없었다.</p>
    <p>손끝에 닿고 있으나 이게 어디에 있는 것인지 알 수가 없어졌다.</p>
  `,

  3: `
    <p>두번 째 갔을때야 발견했다.</p>
    <p>오래된 말뚝. 등산로의 입구에 이곳의 이름이 박혀 있다.</p>
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
  `,

  7: `
    <p>서 있는, 우뚝 서 있는, 놓여 있는, 균형을 가진. 
    서있는 것들에 쉽게 매료된다. 몇 개의 지지점으로 균형을 잡고 우뚝 서 있는 모양새. 
    그렇게 서서 나와 대면하는 것들. </p>
    <p>다리 사이로 빛이 지나고 그림자를 드리우는 것들. </p>
  `,

  8: `
    <p>가장 많이 남은 선택의 결과는 돌이 아닐까 싶다.</p>
    <p>아주 작은 선택부터 하늘에 닿고자 쌓은 바빌론의 탑까지</p>
    <P>어디에나 있으면서 무겁고 단단한. 그래서 목적을 달성할 수 있는 경로의 물질.</p>
    <P>표면을 비단 같이 다듬어 돌이 아닌 양 체 하는 반면</p>
    <P>암산의 면을 따라 믿음을 파내는 파내는 이가 있다.</p>
    <P>거리에서 모은 폐지가 날릴까 메마른이가 옮긴 중간 크기의 바위와,
    '이 정도면' 하고 놓은 4개의 한줌 바위</p>
  `,

  9: `
    <p>적절한 날카로움</p>
  `,

  10: `
    <p>거리의 것을 전해줄 때</p>
  `,

  11: `
    <p> 살아 100년, 죽어 100년</p>
        <img src="images/deadtree1.jpg">
        <img src="images/deadtree2.jpg">
        <img src="images/deadtree.jpg">
        <img src="images/deadtree3.jpg">
     <p> 곧추서서 죽은 44.2% </p>
     <p> 본 줄기가 부러져서 고사된 21.6% </p>
     <p>기울어진 채로 고사한 18.7% </p>
     <p> 완전히 쓰러진 15.5%. </p>

    <a href="https://www.jejusori.net/news/articleView.html?idxno=147911" target="_blank">
      https://www.jejusori.net/news/articleView.html?idxno=147911
    </a>
<br><br>
<br><br>

    <p> 죽어서 이렇게 남는구나 싶었다. 어쩌면 산 나무 보다 많은 고사목이었다. 말라 죽은 나무. </p>
    <p> 10년도 더 전 부터 말라갔다. 지금은 고사목구간이 있다. 삼각봉 대피소를 지나, 태풍으로 유실된 구대피소 터를 넘어, 정상까지 걸쳐있는 말라서 죽은 나무 구간.
    곧추서서 죽고, 본줄기가 부러지고, 기울어진 채로 죽고, 완전히 쓰러진 사목. </p>
    <p> 이제 15년 쯤 되었을까, 죽은지 15년이라 앞으로 85년 더 남았다고 하면 이건 다른 의미로 태어난지 15년 일까. 
    더 이상 엽록소도 없고 새 줄기도 없다. 푸른 트리 같은 나무가 아니라, 하얗게 타버린 숯에 가깝다.
    시간이 갈수록 속은 더 가벼워지고 곧추서서 죽은 나무도 완전히 쓰러진 나무가 되겠지. 
    15살 고사목보다 내가 먼저 세상을 떠날 것이다. 
    살아있다고 생각하는 나보다 마를고 죽을사 나무목이 더 오래 한라산에 있다. </p>
  `,


  12: `
    <img src="images/old2.jpg">
    <img src="images/old3.jpg">
    <p> 큰 길가의 새마을 금고</p>
    <img src="images/old4.jpg">
  `,

  13: `
    <img src="images/stone1.jpg">
  ` 


};

const textContents = {
  t1: {
      width: 800,
    html: `<strong>이상-하다(異常-하다)</strong> <p>다를 이, 떳떳할 상 </p> 
  <br><br> <p>떳떳할-영원하다. 일정하다  </p> 
  <br><br><strong>수상-하다(殊常-하다)</strong> <p>죽일 수, 떳떳할 상</p> 
   <br><br><br><br><p>죽이다. 거의 죽다. 단절되다.</p>`
  },

  t2: {
      width: 800,
    html: `<p>삶 속 느끼는 이상함, 기이함, 생경함은 어떤 성질인가? 
          어떤 순간에, 어떤 장면이, 어떤 식으로.</p>`
    },
  t3: {
      width: 1500,
    html: `그 성질들이 초현실적 풍경으로 이어지는 연결은 어떤 고리로 이루어지는가? 
          초현실성과 환상성이 걸맞는 단어일까? 영성이 있다는 말, 동물적으로 본다는 말에서 보다 적합함을 느낀다.`
  },
  t4: {
      width: 250,
    html: `<p>붓질과 형상. 붓질이 형상과 만나며 머뭇거리고 멈추고 엉키는 모습. 형상이 붓질로 구성되며 생겨나는 충돌, 무너짐.</p>
    <p>온전하지도 새롭게 태어나지도 못한 중간 단계의 것. 이 어중간함을 해소해야 하는가? </p>
    <p>이 걸쳐있음. 이곳과 저곳을 함께 가지고서 어디에도 가지 못한 것을 어떻게 보여주면 그것이 어중간이 아닌 아우름이 될까. 걸쳐진 장면은 어디에 닿을까.</p>
    <p>콜라주 작업은 걸친 채로 무언갈 만들어낸 기분이었다. 사진으로 조각나 들어온 장면 또한 명료한 성질 그대로 무너졌다. 반짝이고 번들거리고 뭉특하고 녹슨 면면들이 조각나고 불특정한 외형을 지닌 채로 들어왔다. 붓질과 형상처럼 가위질과 사진은 서로를 세우고 무너뜨렸다.
    <br><br>
  <a href="https://jueunan.com/collage" target="_blank">
    <img src="images/onthewall.jpg">
  </a>
    <p>↑↑↑</p>
`
  }

  
};

/* 랜덤 배치 */
function randomLayout() {
  images.forEach(img => {
    const randomWidth = Math.floor(Math.random() * 850) + 50;
    const randomLeft = Math.floor(Math.random() * (WORLD_WIDTH - randomWidth));
    const randomTop = Math.floor(Math.random() * (WORLD_HEIGHT - randomWidth));

    img.style.width = randomWidth + "px";
    img.style.left = randomLeft + "px";
    img.style.top = randomTop + "px";
  });

  textPieces.forEach(piece => {
    const id = piece.dataset.textId;
    const data = textContents[id];

    if (!data) return;

    piece.innerHTML = data.html;

    const textWidth = data.width;

    const randomLeft = Math.floor(Math.random() * (WORLD_WIDTH - textWidth));
    const randomTop = Math.floor(Math.random() * (WORLD_HEIGHT - 250));

    piece.style.width = "fit-content";
    piece.style.maxWidth = textWidth + "px";

    piece.style.left = randomLeft + "px";
    piece.style.top = randomTop + "px";
  });
}

randomLayout();

/* 카메라 */
let scale = 1;
let cameraX = 0;
let cameraY = 0;

function updateCamera() {
  world.style.width = WORLD_WIDTH + "px";
  world.style.height = WORLD_HEIGHT + "px";
  world.style.transform = `translate(${cameraX}px, ${cameraY}px) scale(${scale})`;
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

/* 드래그 */
let current = null;
let offsetX = 0;
let offsetY = 0;
let z = 1;

let isPanning = false;
let panStartX = 0;
let panStartY = 0;
let cameraStartX = 0;
let cameraStartY = 0;


function startDrag(target, x, y) {
  current = target;

  const pos = screenToWorld(x, y);

  offsetX = pos.x - target.offsetLeft;
  offsetY = pos.y - target.offsetTop;

  z++;
  target.style.zIndex = z;
}

function moveCurrent(x, y) {
  if (!current) return;

  const pos = screenToWorld(x, y);

  let newLeft = pos.x - offsetX;
  let newTop = pos.y - offsetY;

  const margin = 2000;

  const minLeft = -margin;
  const minTop = -margin;

  const maxLeft = WORLD_WIDTH + margin;
  const maxTop = WORLD_HEIGHT + margin;

  newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
  newTop = Math.max(minTop, Math.min(newTop, maxTop));

  current.style.left = newLeft + "px";
  current.style.top = newTop + "px";
}

movablePieces.forEach(piece => {
  piece.addEventListener("mousedown", e => {
    e.stopPropagation();
    startDrag(piece, e.clientX, e.clientY);
  });
  world.addEventListener("mousedown", (e) => {
  if (e.target !== world) return;

  isPanning = true;

  panStartX = e.clientX;
  panStartY = e.clientY;

  cameraStartX = cameraX;
  cameraStartY = cameraY;
});
});

document.addEventListener("mousemove", e => {
  if (current) {
    moveCurrent(e.clientX, e.clientY);
    return;
  }

  if (isPanning) {
    cameraX = cameraStartX + (e.clientX - panStartX);
    cameraY = cameraStartY + (e.clientY - panStartY);
    updateCamera();
  }
});

document.addEventListener("mouseup", () => {
  current = null;
  isPanning = false;
});

/* 이미지 더블클릭 모달 */
images.forEach(img => {
  img.addEventListener("dblclick", e => {
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

/* 휠 확대/축소 */
document.addEventListener("wheel", e => {
  if (modal.style.display === "flex") return;

  e.preventDefault();

  const minScale = getMinScale();
  const before = screenToWorld(e.clientX, e.clientY);

  scale = Math.min(Math.max(scale - e.deltaY * 0.001, minScale), 3.5);

  cameraX = e.clientX - before.x * scale;
  cameraY = e.clientY - before.y * scale;

  if (scale === minScale) {
    resetView();
  } else {
    updateCamera();
  }
}, { passive: false });

/* 모바일 터치 */
let lastTouchDistance = null;
let lastTapTime = 0;
let isTouchPanning = false;
let touchPanStartX = 0;
let touchPanStartY = 0;
let touchCameraStartX = 0;
let touchCameraStartY = 0;

world.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 1) return;
  if (e.target !== world) return;

  e.preventDefault();

  isTouchPanning = true;

  touchPanStartX = e.touches[0].clientX;
  touchPanStartY = e.touches[0].clientY;

  touchCameraStartX = cameraX;
  touchCameraStartY = cameraY;
}, { passive: false });

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

movablePieces.forEach(piece => {
  piece.addEventListener("touchstart", e => {
    if (e.touches.length !== 1) return;

    e.preventDefault();
    e.stopPropagation();

    const touch = e.touches[0];
    startDrag(piece, touch.clientX, touch.clientY);

    if (piece.classList.contains("img")) {
      const now = Date.now();

      if (now - lastTapTime < 300) {
        piece.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
        lastTapTime = 0;
      } else {
        lastTapTime = now;
      }
    }
  }, { passive: false });
});

document.addEventListener("touchmove", e => {
  if (e.touches.length === 1 && isTouchPanning) {
  e.preventDefault();

  const touch = e.touches[0];

  cameraX = touchCameraStartX + (touch.clientX - touchPanStartX);
  cameraY = touchCameraStartY + (touch.clientY - touchPanStartY);

  updateCamera();
  return;
}
  if (modal.style.display === "flex") return;

  if (e.touches.length === 1 && current) {
    e.preventDefault();

    const touch = e.touches[0];
    moveCurrent(touch.clientX, touch.clientY);
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

    scale = Math.min(Math.max(scale + (newDistance - lastTouchDistance) * 0.005, minScale), 3.5);

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
  current = null;
  isTouchPanning = false;
  lastTouchDistance = null;
});

/* 모달 닫기 */
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";

    images.forEach(img => {
      img.classList.remove("active");
      img.classList.remove("dim");
    });
  }
});

/* 전체보기 */
document.addEventListener("keydown", e => {
  if (e.key === "r") resetView();
});

resetButton.addEventListener("click", resetView);

window.addEventListener("resize", resetView);
