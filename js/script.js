function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}
ibg();

const ballText = document.querySelector('.ball__text');
const hiText = document.querySelector('.main-screen__content_hi');

window.onload = function () {
    ballText.innerHTML = '<p>Задай своє питання та натисни мене!</p>';
    setTimeout(() => {
        hiText.classList.remove('_hi-none');
    }, 554)

    setTimeout(() => {
        mainButton.classList.remove('_ball-none');
    }, 954)

    setTimeout(() => {
        ballText.classList.remove('_ballText-none');
    }, 1454)
}

const mainButton = document.getElementById('button');
mainButton.addEventListener('click', mainButtonClick);

const moreText = document.querySelector('.more');
const spinner = document.querySelector('.spinner');
let animationForEnd = true;

function mainButtonClick() {
    if (animationForEnd) {
        animationForEnd = false;
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
            if (!ballText.innerHTML == '') {
                //hiText.style.position = 'absolute';
                hiText.classList.add('_hi-goaway');
                moreText.classList.remove('_none-more');
                moreText.style['margin-top'] = '-50%';
                animationForEnd = true;
            }
        }, 4000)
    }
}

const answers = ['Так', 'Ні', 'Ну-ну-ну, не треба', 'Так, але у тебе лапки', 'Спитай через 4 хвилини', 'Все буде добре!', 'Коли таке питаєш, я думаю - нащо мене створили?', `Таааак`, 'Довірся всесвіту',];
let answer = '';
//console.log(answers.length)

function magicBall() {
    let index = Math.floor(Math.random() * answers.length);
    answer = answers[index];
}