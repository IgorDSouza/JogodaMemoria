const container = document.querySelector('.cardContainer');
const points = document.getElementById('points');
const clicks = document.getElementById('clicks');
var click = 0;
var random = 0;
var tmp;
var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
var matchs = [];



randomCards();

var card = document.querySelectorAll(".card");

flag();

matchCards();


function randomCards() {
    for (let i = cards.length - 1; i > 1; i--) {

        random = Math.round(Math.random() * 5 + 1);

        tmp = cards[random];

        cards[random] = cards[i];

        cards[i] = tmp;
    }

    for (let i = 0; i < 12; i++) {

        let img = document.createElement('img');

        img.src = `img/${cards[i]}.png`;

        img.classList.add('card', `c${cards[i]}`);

        container.appendChild(img);
    }
}

function matchCards() {
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


                

                let time = 1000;

                setTimeout(() => {

                    if (equalCard[0].classList.contains("ok") && equalCard[1].classList.contains("ok")) {


                        if (!matchs.find((name) => { return name == e.className.slice(-4, e.className.length - 2) })) {

                            matchs.push(e.className.slice(-4, e.className.length - 2))
                            matchs.push(e.className.slice(-2, e.className.length))
                            let qtdMatchs = matchs.filter((qtd) => { return qtd == 'ok' }).length;

                            points.innerHTML = qtdMatchs 


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
    card.forEach((element) => {
        element.src = 'img/flag.png';
    });
}
