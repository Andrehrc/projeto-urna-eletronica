let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
let nulo = document.querySelector('.d-1-5');
let somClick = document.querySelector('#s_click')
let somConfirma = document.querySelector('#s_confirma')
let sugest = document.querySelector('.sugest')

let botaoBranco = false
let etapaAtual = 0;
let numero = '';
let votos = []

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    botaoBranco = false
    for(let i=0;i<etapa.numeros; i++){
        if (i===0){
            numeroHTML += '<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
        
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if (item.numero === numero){
            return true;
        } else {
            return false;
        }
    })
    if (candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`

        let fotosHTML = ''
        for (let i in candidato.fotos){
            if (candidato.fotos[i].small){
                fotosHTML += `<div class="d-1-image small"><img src="Assets/Images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            } else {
            fotosHTML += `<div class="d-1-image"><img src="Assets/Images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHTML; 
    } else {
        descricao.style.fontSize = '20px'
        descricao.style.marginTop = '20px'
        aviso.style.display = 'block';
        descricao.innerHTML = `NÚMERO ERRADO`
        nulo.style.display = 'block'
        nulo.classList.add('pisca')
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface();
        }
        somClick.currentTime = 0
        somClick.play()
    }
}
function branco(){
    if (numero === ''){
        botaoBranco = true;
        descricao.style.fontSize = '20px'
        descricao.style.marginTop = '20px'
        aviso.style.display = 'block';
        nulo.innerHTML = 'VOTO EM BRANCO'
        nulo.style.display = 'block'
        nulo.style.marginBottom = '55px'
        nulo.classList.add('pisca')
        numeros.innerHTML = ''
        somClick.currentTime = 0
        somClick.play()
    }
}
function corrige(){
    if (numero !== '' || botaoBranco == true){
        comecarEtapa()
        nulo.style.display = 'none'
        nulo.innerHTML = 'VOTO NULO'
        nulo.style.marginBottom = '10px'
        somClick.currentTime = 0
        somClick.play()
    }
}
function confirma(){
    let etapa = etapas[etapaAtual];
    votoConfirmado = false
    if (botaoBranco === true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    } else if (numero.length === etapa.numeros){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }
    if (votoConfirmado){
        etapaAtual++;
        somConfirma.play()
        if (etapas[etapaAtual] !== undefined){
            comecarEtapa()
            nulo.style.display = 'none'
        } else{
            nulo.style.display = 'none'
            document.querySelector('.d-1').style.display = 'none'
            document.querySelector('.d-2').style.display = 'none'
            document.querySelector('.aviso--gigante').style.display = 'flex'
            console.log(votos)
        }
    }
}

window.addEventListener('keyup', (event)=>{
    if (event.code.toLowerCase() == 'numpad0'){
        clicou(0)
    } else if (event.code.toLowerCase() == 'numpad1'){
        clicou(1)
    } else if (event.code.toLowerCase() == 'numpad2'){
        clicou(2)
    } else if (event.code.toLowerCase() == 'numpad3'){
        clicou(3)
    } else if (event.code.toLowerCase() == 'numpad4'){
        clicou(4)
    } else if (event.code.toLowerCase() == 'numpad5'){
        clicou(5)
    } else if (event.code.toLowerCase() == 'numpad6'){
        clicou(6)
    } else if (event.code.toLowerCase() == 'numpad7'){
        clicou(7)
    } else if (event.code.toLowerCase() == 'numpad8'){
        clicou(8)
    } else if (event.code.toLowerCase() == 'numpad9'){
        clicou(9)
    } else if (event.code.toLowerCase() == 'numpadenter'){
        confirma()
    } else if (event.code.toLowerCase() == 'backspace'){
        corrige()
    }
})

function reset(){
    etapaAtual = 0
    votos = []
    document.querySelector('.d-1').style.display = 'flex'
    document.querySelector('.d-2').style.display = 'flex'
    document.querySelector('.aviso--gigante').style.display = 'none'
    comecarEtapa()
}

function toggleSugest(){
   if (document.querySelector('.sugest-area').style.marginBottom == "0px"){
        document.querySelector('.sugest-area').style.marginBottom = "-78px"
   } else {
        document.querySelector('.sugest-area').style.marginBottom = "0px"
   }
}

function light(){
    document.body.style.backgroundColor = 'white'
}
function dark (){
    document.body.style.backgroundColor = '#2F3136'
}
comecarEtapa()