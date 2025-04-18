document.querySelectorAll(".btnTelaPrincipal").forEach(button => {
    button.addEventListener("click", function() {
        window.location.href = "index.html"
    })
})

document.getElementById("HumanasBotao").addEventListener("click", function(){
    window.location.href = "Humanas.html"
})
document.getElementById("LinguagensBotao").addEventListener("click", function(){
    window.location.href = "Linguagens.html"
})
document.getElementById("MatematicaBotao").addEventListener("click", function(){
    window.location.href = "Matematica.html"
})
document.getElementById("NaturezaBotao").addEventListener("click", function(){
    window.location.href = "Natureza.html"
})
document.getElementById("TiBotao").addEventListener("click", function(){
    window.location.href = "Ti.html"
})

//--------------------------------{animação Scroll}-----------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    const elementosAnimados = document.querySelectorAll(".scroll-animado");

    function verificarScroll() {
        const alturaJanela = window.innerHeight;
        
        elementosAnimados.forEach((elemento) => {
            const posicaoElemento = elemento.getBoundingClientRect().top;

            if (posicaoElemento < alturaJanela * 0.85) {
                elemento.classList.add("ativo");
            }
        });
    }

    window.addEventListener("scroll", verificarScroll);
    verificarScroll(); // Para ativar os elementos visíveis no início
});


//------------------------{JavaScriptTI}--------------------------------------//

document.getElementById("botoesTriModelagem").addEventListener("click", function () {
    window.location.href = "Modelagem.html";
});

document.getElementById("botoesTriIot").addEventListener("click", function () {
    window.location.href = "IoT.html";
});