function ibg(){
    let ibg=document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if(ibg[i].querySelector('img')){
            ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }
    }
}
ibg();

const ballText = document.querySelector('.ball__text');
const hiText = document.querySelector('.main-screen__content_hi');

window.onload = function() {
    ballText.innerHTML = '<p>Задай своє питання та натисни мене!</p>';
    setTimeout(() => {
        hiText.classList.remove('_hi-none');
    },554)
    
    setTimeout(() => {
        mainButton.classList.remove('_ball-none');
    },954)

    setTimeout(() => {
        ballText.classList.remove('_ballText-none');
    },1454)

    // First Frame
    frame();
    
    // First particle explosion
    initParticles(config.particleNumber);
}

const mainButton = document.getElementById('button');
mainButton.addEventListener('click',mainButtonClick);

const moreText = document.querySelector('.more');
const spinner = document.querySelector('.spinner');
let tomaPiska = true;

function mainButtonClick(){
    //moreText.classList.remove('_active-more');
    if(tomaPiska){
        tomaPiska = false;
        moreText.classList.add('_none-more');
        ballText.firstChild.classList.toggle('_none-p');
        ballText.style.display = 'none';
        mainButton.classList.add('_ball-none');
        spinner.classList.add('_spinner-active');
        setTimeout(() => {
            magicBall()
            spinner.classList.remove('_spinner-active');
            mainButton.classList.remove('_ball-none');
            ballText.style.display = 'block';
            ballText.innerHTML = '<p></p>';
            ballText.firstChild.innerHTML = `${answer}`;
            if(!ballText.innerHTML == ''){
                moreText.classList.remove('_none-more');
                tomaPiska = true;
            }
            //setTimeout(() => {
            //    
            //},500)
        },4000)
    }
}

const answers = ['Так','Ні','Та за що?','Ти бовдур!','Звісно ні, або так','Нунуну','Так, але ти піська','Спитай через 4 хвилини','Цьомчик','Звісно так, або ні','Ой, ну все','Хі-хі-хі','Я хочу пісять','Все буде добре!','Без коментарів','Лоль))','Коли таке питаєш, я думаю - нащо мене створили?',`Це що "чумор"?`,'Ти найкраща!','Довірся всесвіту','Довірся собі'];
let answer = '';

function magicBall(){
    let index = Math.floor(Math.random() * answers.length);
    answer = answers[index];
}



// Little Canvas things
var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d');

// Set Canvas to be window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Configuration, Play with these
var config = {
  particleNumber: 800,
  maxParticleSize: 10,
  maxSpeed: 40,
  colorVariation: 50
};

// Colors
var colorPalette = {
    bg: {r:12,g:9,b:29},
    matter: [
      {r:36,g:18,b:42}, // darkPRPL
      {r:78,g:36,b:42}, // rockDust
      {r:252,g:178,b:96}, // solorFlare
      {r:253,g:238,b:152} // totesASun
    ]
};

// Some Variables hanging out
var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    drawBg,

// Draws the background for the canvas, because space
drawBg = function (ctx, color) {
    ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
    ctx.fillRect(0,0,canvas.width,canvas.height);
};

// Particle Constructor
var Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)],true );
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r,g,b,a, variation;
    r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.r);
    g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.g);
    b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation/2)) + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {r,g,b,a};
    }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
    p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
    return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function () {
    particles = particles.filter((p) => { 
      return (p.x > -100 && p.y > -100); 
    });
};


var initParticles = function (numParticles, x, y) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }
    particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
};

// That thing
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function(callback) {
        window.setTimeout(callback, 1000 / 60);
     };
})();


// Our Frame function
var frame = function () {
  // Draw background first
  drawBg(ctx, colorPalette.bg);
  // Update Particle models to new position
  particles.map((p) => {
    return updateParticleModel(p);
  });
  // Draw em'
  particles.forEach((p) => {
      drawParticle(p.x, p.y, p.r, p.c);
  });
  // Play the same song? Ok!
  window.requestAnimFrame(frame);
};

// Click listener
document.body.addEventListener("click", function (event) {
    var x = event.clientX,
        y = event.clientY;
    cleanUpArray();
    initParticles(config.particleNumber, x, y);
});

