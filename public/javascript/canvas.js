const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const btn = document.querySelectorAll('button');

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  getTextLocation();
  init();
});

let mouse = {
  x: null,
  y: null,
  radius: 100,
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

for (let i = 0; i < 6; i++) {
  btn[i].style.top = `${70 + 90 * i}px`;
}

const colorArray = ['#A3372F', '#F0463A', '#DEF052', '#69ABF0', '#95A327'];

let sgArray = ['', '', '', '', '', ''];

searchBar.addEventListener('keyup', () => {
  fetchSuggestions().then((suggestions) => {
    sgArray = [];
    for (let i = 0; i < 6; i++) {
      if (suggestions[i] === undefined) {
        sgArray.push('');
        btn[i].innerHTML = '';
      } else {
        sgArray.push(suggestions[i]);

        btn[i].innerHTML = suggestions[i];
        btn[i].onclick = () => {
          window.location.href = `https://www.google.com/search?q=${btn[i].innerHTML}`;
        };
      }
    }
    getTextLocation();
    init();
  });
});

class Particle {
  constructor(x, y, positionX, positionY, color) {
    this.x = x;
    this.y = y;
    this.positionX = positionX;
    this.positionY = positionY;

    this.radius = 2;

    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 5 + 1;

    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }
  update() {
    const dx = this.positionX - this.x;
    const dy = this.positionY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const force = (distance / 50) * this.density;

    this.x += forceDirectionX * force;
    this.y += forceDirectionY * force;

    this.draw();
  }
}

function cutString(str) {
  if (str.length > 20) {
    return `${str.substr(0, 20)}...`;
  } else {
    return str;
  }
}

let particles = [];
let textLocationX = [];
let textLocationY = [];

function getTextLocation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.font = 'bold 20px serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${cutString(sgArray[0])}`, canvas.width / 6, 20);
  ctx.fillText(`${cutString(sgArray[1])}`, canvas.width / 6, 40 + 10);
  ctx.fillText(`${cutString(sgArray[2])}`, canvas.width / 6, 60 + 10 * 2);
  ctx.fillText(`${cutString(sgArray[3])}`, canvas.width / 6, 80 + 10 * 3);
  ctx.fillText(`${cutString(sgArray[4])}`, canvas.width / 6, 100 + 10 * 4);
  ctx.fillText(`${cutString(sgArray[5])}`, canvas.width / 6, 120 + 10 * 5);

  let textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

  textLocationX = [];
  textLocationY = [];

  for (let i = 0; i < textCoordinates.width * textCoordinates.height; i += 1) {
    if (textCoordinates.data[i * 4 + 3] > 128) {
      const positionX = i % textCoordinates.width;
      const positionY = Math.floor(i / textCoordinates.width) + 10;

      textLocationX.push(positionX * 3);
      textLocationY.push(positionY * 3);
    }
  }
}

function init() {
  particles = [];
  for (let i = 0; i < textLocationX.length; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const px = textLocationX[i];
    const py = textLocationY[i];

    particles.push(
      new Particle(x, y, px, py, colorArray[Math.floor(Math.random() * 4)])
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

getTextLocation();
init();

animate();
