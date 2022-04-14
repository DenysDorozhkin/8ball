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
window.onload = function() {
    ballText.innerHTML = '<p>Задай своє питання та натисни мене!</p>';
}

const mainButton = document.getElementById('button');
mainButton.addEventListener('click',mainButtonClick);

const moreText = document.querySelector('.more');
const spinner = document.querySelector('.spinner');

function mainButtonClick(){
    //moreText.classList.remove('_active-more');
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
        setTimeout(() => {
            if(!ballText.innerHTML == ''){
                moreText.classList.remove('_none-more');
            }
        },2000)
    },4000)
}

const answers = ['Так','Ні','Та за що?','Ти бовдур!','Звісно ні, або так','Нунуну','Так, але ти піська','Спитай через 4 хвилини','Цьомчик','Звісно так, або ні','Ой, ну все','Хі-хі-хі','Я хочу пісять','Все буде добре!','Без коментарів','Лоль))','Коли таке питаєш, я думаю - нащо мене створили?',`Це що "чумор"?`,'Ти найкраща!','Довірся всесвіту','Довірся собі'];
let answer = '';

function magicBall(){
    let index = Math.floor(Math.random() * answers.length);
    answer = answers[index];
}