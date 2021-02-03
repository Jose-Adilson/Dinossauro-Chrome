const dino = document.querySelector(".dinossauro");
const bg = document.querySelector(".background");
var isJumping = false;
var position = 0;

//Limita as teclas que acionam o EventListener para apenas 'espaço' e 'up'
function limitKeys(event){
    if(event.keyCode === 32 || event.keyCode === 38){
        if (!isJumping){
            jump();
        }
    }
}

function jump(){
    
    isJumping=true;    
    var upInterval = setInterval(() => {
        if(position >= 150) {
            //Não permite que o dinossauro suba mais que 150px
            clearInterval(upInterval);

            var downInterval = setInterval(() => {
                if(position <= 0){
                    //Não permite que o dinossauro fique abaixo de 0px
                    clearInterval(downInterval);
                    isJumping=false;
                }else{
                    //Descer
                    position-=20;
                    dino.style.bottom = position + 'px';
                }    
            },20);
        }else{
            //Subir
            position += 20;
            dino.style.bottom = position + 'px';
        }    
    },20);

}

function createCactus(){
    const cactus = document.createElement("div");
    var cactusPosition = 1000;
    var randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    bg.appendChild(cactus);

    var leftInterval = setInterval(() => {
        if(cactusPosition < -60){
            //Remove o cacto quando ele sai da tela
            clearInterval(leftInterval);
            bg.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && position <60) {
            //Se o cacto atingir o dinossauro o jogo acaba
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
        }else {
            //Move o cacto
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    },20);

    //Cria cactos aleatoriamente
    setTimeout(createCactus,randomTime);

}

createCactus();
document.addEventListener('keyup', limitKeys);
document.addEventListener('click', jump);