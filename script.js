document.addEventListener("DOMContentLoaded", function () {

    document.documentElement.classList.add('js-loading');
    window.addEventListener('load', () => {
      document.documentElement.classList.remove('js-loading');
    });

//-----------------{naveg Principal}-----------------------------
    document.querySelectorAll(".btnTelaPrincipal").forEach(button => {
        button.addEventListener("click", function() {
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.location.href = "index.html";
            }
        });
    });


    const setupNavigation = (id, url) => {
        const element = document.getElementById(id);
        if (element) { 
            element.addEventListener("click", () => {
                window.location.href = url;
            });
        }
    };

    setupNavigation("HumanasBotao", "Humanas.html");
    setupNavigation("LinguagensBotao", "Linguagens.html");
    setupNavigation("MatematicaBotao", "Matematica.html");
    setupNavigation("NaturezaBotao", "Natureza.html");
    setupNavigation("TiBotao", "Ti.html");


//----------------------{animação Scroll}-------------------------
    const sectionsToAnimate = document.querySelectorAll(".fade-in-section");

    if (sectionsToAnimate.length > 0) {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1 
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);
        sectionsToAnimate.forEach(section => {
            observer.observe(section);
        });
    } else {
        console.warn("Error.");
    }


//------------------------------{Botões TI}--------------------------
    const modelagemButton = document.getElementById("botoesTriModelagem");
    if (modelagemButton) {
        modelagemButton.addEventListener("click", function () {
            window.location.href = "Modelagem.html";
        });
    }

    const iotButton = document.getElementById("botoesTriIot");
    if (iotButton) {
        iotButton.addEventListener("click", function () {
            window.location.href = "IoT.html";
        });
    }

//------------------------{Ir Para os Lugar certinho}-----------------------
const scrollButtons = document.querySelectorAll('button[data-scroll-to]'); 

    if (scrollButtons.length > 0) {
        scrollButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); 

                const targetId = this.dataset.scrollTo; 
                const targetElement = document.getElementById(targetId); 

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                    console.warn(`error`);
                }
            });
        });
    }

}); 

const emailButton = document.getElementById("emailBotao");
const emailText = document.getElementById("emailTexto");

if (emailButton && emailText) {
    emailText.style.display = ''; 

    emailButton.addEventListener("click", function(event) {
        event.preventDefault();

        emailText.classList.toggle("visible");
    });
} else {
    console.warn("error.");
}

//----------------------{Jogo do Dino The Games Awards}-------------------------

document.addEventListener('DOMContentLoaded', () => {
    const modalElement = document.getElementById('ModalGame'); 
    const btnAbrirModal = document.getElementById('BotaoAbrirModalGame');
    const btnFecharModal = document.querySelector('.fecharModal');
    const iframeJogo = document.getElementById('frameJogoDino');
    const urlJogo = 'https://chromedino.com/'; 

    function abrirModal() { 
        console.log("Tentando abrir modal..."); 
        if (!modalElement) { 
            console.error("Elemento do modal não encontrado!");
            return;
        }
        if (iframeJogo && iframeJogo.src !== urlJogo){
            iframeJogo.src = urlJogo;
        }
        modalElement.classList.add('modalDinoAbrido');

        setTimeout(() => {
            try {
                 if(iframeJogo) iframeJogo.focus();
            } catch (e) {
                console.warn("Erro ao focar iframe, clique manualmente para jogar.", e);
            }
        }, 150);
    }

    function fecharModal() {
        console.log("Tentando fechar modal..."); 
        if (!modalElement) { 
             console.error("Elemento do modal não encontrado ao tentar fechar!");
             return;
         }
        modalElement.classList.remove('modalDinoAbrido');
    }

    if (btnAbrirModal) {
        btnAbrirModal.addEventListener('click', abrirModal); 
    } else {
        console.error("Botão para ABRIR modal (BotaoAbrirModalGame) não encontrado!");
    }

    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModal); 
    } else {
        console.warn("Botão para FECHAR modal (.fecharModal) não encontrado.");
    }

    if (modalElement) {
        modalElement.addEventListener('click', (event) => {
            if (event.target === modalElement) {
                fecharModal();
            }
        });
    } else {
         console.error("Elemento principal do modal (ModalGame) não encontrado para listener de clique fora.");
    }

    window.addEventListener('keydown', (event) => {
        if(modalElement && modalElement.classList.contains('modalDinoAbrido') && event.key === 'Escape') {
            fecharModal();
        }
    });
}); 