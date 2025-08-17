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
    setupNavigation("IotBotao", "IoT.html");
    setupNavigation("ModelagemBotao", "Modelagem.html");


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

}); 

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


// -----------------------{Locomoção entre trimestres}--------------------------
document.addEventListener('DOMContentLoaded', function() {
    const trimestreBtns = document.querySelectorAll('.trimestre-btn');
    const conteudos = document.querySelectorAll('.conteudo-trimestre');

    trimestreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            trimestreBtns.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            const targetId = this.getAttribute('data-target');
            conteudos.forEach(conteudo => {
                conteudo.style.display = 'none';
            });
            const targetConteudo = document.getElementById(targetId);
            if(targetConteudo) {
                targetConteudo.style.display = 'block';
            }
        });
    });
});

//-----------------{ LÓGICA DO SUBMENU DE TI }-----------------------------
document.addEventListener('DOMContentLoaded', function() {
    const tiBotao = document.getElementById('TiBotao');
    if (tiBotao) {
        const submenu = tiBotao.querySelector('.submenu-ti');
        const seta = tiBotao.querySelector('.seta-submenu');

        tiBotao.addEventListener('click', function(event) {
            event.stopPropagation();
            submenu.classList.toggle('visivel');
            seta.innerHTML = submenu.classList.contains('visivel') ? 'ʌ' : 'v';
        });
    };
});

//-----------------{ LÓGICA DOS CARDS DE ATIVIDADE }-----------------------------
document.addEventListener('DOMContentLoaded', function() {
    const todosOsTrimestres = document.querySelectorAll('.conteudo-trimestre');

    todosOsTrimestres.forEach(trimestre => {
        const containerDosCartoes = trimestre.querySelector('.container-cartoes');
        if (!containerDosCartoes) return;

        containerDosCartoes.querySelectorAll('.cartao-atividade').forEach(cartao => {
            const iconeFavorito = cartao.querySelector('.icone-favorito');
            const tagsDeHabilidades = cartao.querySelectorAll('.tag-habilidade');
            const elementoResumo = cartao.querySelector('.resumo-habilidade');
            const textoResumoPadrao = elementoResumo.textContent;

            iconeFavorito.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const estaFavoritado = cartao.classList.toggle('favoritado');
                
                iconeFavorito.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    iconeFavorito.style.transform = 'scale(1.15)';
                     setTimeout(() => {
                        iconeFavorito.style.transform = 'scale(1)';
                    }, 100);
                }, 100);

                if (estaFavoritado) {
                    iconeFavorito.textContent = 'favorite'; 
                    iconeFavorito.classList.add('favoritado');
                    containerDosCartoes.prepend(cartao); 
                } else {
                    iconeFavorito.textContent = 'favorite_border'; 
                    iconeFavorito.classList.remove('favoritado');
                    
                    const cartoesNaoFavoritados = Array.from(containerDosCartoes.querySelectorAll('.cartao-atividade:not(.favoritado)'));
                    cartoesNaoFavoritados.sort((a, b) => a.dataset.originalOrder - b.dataset.originalOrder);
                    cartoesNaoFavoritados.forEach(cf => containerDosCartoes.appendChild(cf));
                }
            });

            tagsDeHabilidades.forEach(tag => {
                tag.addEventListener('mouseover', () => {
                    elementoResumo.textContent = tag.dataset.summary;
                });
            });

            const containerTags = cartao.querySelector('.tags-habilidades');
            if (containerTags) {
                containerTags.addEventListener('mouseout', () => {
                    elementoResumo.textContent = textoResumoPadrao;
                });
            }
        });
    });
});

//-----------------{ LÓGICA DO MODAL DE DESCRIÇÃO }-----------------------------
document.addEventListener('DOMContentLoaded', function() {
    const sobreposicaoModal = document.getElementById('modalDescricao');
    const tituloModal = document.getElementById('modalTitulo');
    const descricaoModal = document.getElementById('paragrafoModalDescricao');
    const btnFecharModal = document.getElementById('btnFecharModal');
    const linksLerMais = document.querySelectorAll('.ler-mais');

    function abrirModal(cartao) {
        const titulo = cartao.querySelector('.cartao-titulo').textContent;
        const descricaoCompleta = cartao.dataset.fullDescription;

        tituloModal.textContent = titulo;
        descricaoModal.textContent = descricaoCompleta;
        
        document.body.classList.add('modal-aberto');
        sobreposicaoModal.classList.add('visivel');
    }

    function fecharModal() {
        document.body.classList.remove('modal-aberto');
        sobreposicaoModal.classList.remove('visivel');
    }

    linksLerMais.forEach(link => {
        link.addEventListener('click', function(evento) {
            const cartao = evento.target.closest('.cartao-atividade');
            if (cartao) {
                abrirModal(cartao);
            }
        });
    });

    btnFecharModal.addEventListener('click', fecharModal);

    sobreposicaoModal.addEventListener('click', function(evento) {
        if (evento.target === sobreposicaoModal) {
            fecharModal();
        }
    });

    window.addEventListener('keydown', function(evento) {
        if (evento.key === 'Escape' && sobreposicaoModal.classList.contains('visivel')) {
            fecharModal();
        }
    });
});

//-----------------{ LÓGICA PARA MOSTRAR E-MAIL NO FOOTER }-----------------------------
document.addEventListener('DOMContentLoaded', function() {
    const emailBotao = document.getElementById("emailBotao");
    const emailTexto = document.getElementById("emailTexto");

    if (emailBotao && emailTexto) {
        emailTexto.style.display = ''; 

        emailBotao.addEventListener("click", function(event) {
            event.preventDefault(); 
            
            emailTexto.classList.toggle("visible");
        });
    }
});