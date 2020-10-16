let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-direita');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let vBranco = true;

function comecarEtapa(){

    let etapa = etapas[etapaAtual];

    let numeroHtml = '';

    numero = '';
    vBranco= false;

    for (let i = 0; i < etapa.numeros; i++) {
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else{
            numeroHtml += '<div class="numero"></div>';
        }        
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML ='';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){

    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });

    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome} <br/>Partido: ${candidato.partido}`;

        let fotosHtml = '';
        for (let i in candidato.fotos) {
            if(candidato.fotos[i].pequeno){
                fotosHtml += `<div class="d-1-img pequeno"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }else {
                fotosHtml += `<div class="d-1-img"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
            
                  
        }

        lateral.innerHTML = fotosHtml;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = "<div class = 'aviso--grande pisca'>VOTO NULO</div>";
    }
    
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');

    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero =`${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        }else{
            atualizaInterface();
        }
       
    }
}

function branco(){
    if(numero === ''){
        vBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = "<div class = 'aviso--grande pisca'>VOTO EM BRANCO</div>";
    }else{
        alert("Para votar em BRANCO NÃO digite nenhum Número");
        comecarEtapa();        
    }
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(vBranco){
        alert('CONFIRMANDO VOTO BRANCO');
    }else if(numero.length === etapa.numeros){
        let vCandidato = etapa.candidatos.filter((item)=>{
            if (item.numero === numero){
                return true;            
            }else{
                return false;
            }            
        });
        if(vCandidato.length > 0){
            alert('CONFIRMANDO VOTO COMO '+vCandidato[0].nome); 
            votoConfirmado = true;
        }else{
            alert('CONFIRMANDO VOTO COMO NULO');    
            votoConfirmado = true;
        }

        if(votoConfirmado){
            etapaAtual++;
            if(etapas[etapaAtual] !== undefined){
                comecarEtapa();
            }else{
                document.querySelector('.tela').innerHTML = "<div class = 'aviso--gigante pisca'>FIM</div>";
            }
            
        }
    }
}

comecarEtapa();