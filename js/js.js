const container = document.querySelector('.cardContainer');
const points = document.getElementById('points');
const clicks = document.getElementById('clicks');
const chooseQtd = document.querySelector('.chooseQtd');
const btnSend = document.querySelector('.send');
const qtdRadio = document.querySelectorAll('.qtd');
var time = 1000;
var numberCards = 0;
var click = 0;
var random = 0;
var tmp;
var cards = [];
var matchs = [];


qtdCards();








function randomCards() {
    for (let i = cards.length - 1; i > 1; i--) {

        random = Math.round(Math.random() * 5 + 1);

        tmp = cards[random];

        cards[random] = cards[i];

        cards[i] = tmp;
    }

    for (let i = 0; i < cards.length; i++) {

        let img = document.createElement('img');

        img.src = `img/${cards[i]}.png`;

        img.classList.add('card', `c${cards[i]}`);

        container.appendChild(img);
    }
}

function matchCards() {
    var card = document.querySelectorAll(".card");
    card.forEach((element) => {

        let cardId = element.className.replace("card c", "");

        let equalCard = document.querySelectorAll(`.c${cardId}`);

   

        equalCard.forEach(e => {

            e.addEventListener('click', ()=>{
                if(!e.classList.contains('ok')){
                     click++;
                clicks.innerHTML= click;
                }
            });

            e.addEventListener("click", () => {
                e.classList.add('ok');
                e.src = `img/${cardId}.png`;


                

                

                setTimeout(() => {

                    if (equalCard[0].classList.contains("ok") && equalCard[1].classList.contains("ok")) {


                        if (!matchs.find((name) => { return name == e.className.slice(-6, e.className.length - 2) })) {

                            matchs.push(e.className.slice(-6, e.className.length - 2))

                            matchs.push(e.className.slice(-2, e.className.length))

                            let qtdMatchs = matchs.filter((qtd) => { return qtd == 'ok' }).length;

                            points.innerHTML = qtdMatchs 

                            console.log(matchs)


                            if (qtdMatchs  == card.length / 2) {

                                if (confirm("Parabens!! Deseja jogar novamente?")) {
                                    document.location.reload(true);
                                }
                            }
                        }
                    } else {
                        element.src = 'img/flag.png'
                        e.classList.remove('ok');
                    }
                }, time);
            })
        })
    })
}

function flag() {
    var card = document.querySelectorAll(".card");
    card.forEach((element) => {
        element.src = 'img/flag.png';
    });

}
function qtdCards(){
    let number;
    btnSend.addEventListener('click',()=>{

       if(qtdRadio[0].checked){
        number = 6;

       } else if(qtdRadio[1].checked){
        number = 12;

       }

        for(let i = 1 ; i<number+1; i++){
        cards.push(i);
        cards.push(i);

    }
    chooseQtd.style.display='none';

    randomCards();
    flag();
    matchCards();

    
    })
    
}