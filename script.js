document.addEventListener('DOMContentLoaded', function () {

    //-----------------{ INICIALIZAÇÃO GERAL E ANIMAÇÃO DE SCROLL (CORRIGIDO) }-----------------------------
    document.documentElement.classList.add('js-loading');
    window.addEventListener('load', () => {
        document.documentElement.classList.remove('js-loading');
    });

    const sectionsToAnimate = document.querySelectorAll(".fade-in-section");
    if (sectionsToAnimate.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // SE O ELEMENTO ESTÁ NA TELA, ADICIONA A CLASSE 'visible'
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } 
                // SE O ELEMENTO SAIU DA TELA, REMOVE A CLASSE 'visible' PARA PERMITIR A REANIMAÇÃO
                else {
                    entry.target.classList.remove("visible");
                }
            });
        }, { threshold: 0.1 });
        sectionsToAnimate.forEach(section => observer.observe(section));
    }

    //-----------------{ NAVEGAÇÃO DA BARRA SUPERIOR }-----------------------------
    const setupNavigation = (id, url) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("click", () => window.location.href = url);
        }
    };

    document.querySelectorAll(".btnTelaPrincipal").forEach(button => {
        button.addEventListener("click", () => {
            // Se o botão "Início" ou "Voltar" for clicado, sempre vai para a index.html
             window.location.href = 'index.html';
        });
    });
    
    setupNavigation("HumanasBotao", "Humanas.html");
    setupNavigation("LinguagensBotao", "Linguagens.html");
    setupNavigation("MatematicaBotao", "Matematica.html");
    setupNavigation("NaturezaBotao", "Natureza.html");
    setupNavigation("IotBotao", "IoT.html");
    setupNavigation("ModelagemBotao", "Modelagem.html");

    //------------------------{ SCROLL SUAVE PARA ÂNCORAS (INDEX.HTML) }-----------------------
    const scrollButtons = document.querySelectorAll('button[data-scroll-to]');
    if (scrollButtons.length > 0) {
        scrollButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = this.dataset.scrollTo;
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    //----------------------{ MODAL DO JOGO DO DINO (INDEX.HTML) }-------------------------
    const modalGame = document.getElementById('ModalGame');
    if (modalGame) {
        const btnAbrirModalGame = document.getElementById('BotaoAbrirModalGame');
        const btnFecharModalGame = modalGame.querySelector('.fecharModal');
        const iframeJogo = document.getElementById('frameJogoDino');
        const urlJogo = 'https://chromedino.com/';

        const abrirModal = () => {
            if (iframeJogo && iframeJogo.src !== urlJogo) iframeJogo.src = urlJogo;
            modalGame.classList.add('modalDinoAbrido');
        };
        const fecharModal = () => modalGame.classList.remove('modalDinoAbrido');

        if (btnAbrirModalGame) btnAbrirModalGame.addEventListener('click', abrirModal);
        if (btnFecharModalGame) btnFecharModalGame.addEventListener('click', fecharModal);
        modalGame.addEventListener('click', (e) => { if (e.target === modalGame) fecharModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalGame.classList.contains('modalDinoAbrido')) fecharModal(); });
    }

    //-----------------{ LÓGICA DO SUBMENU DE TI }-----------------------------
    const tiBotao = document.getElementById('TiBotao');
    if (tiBotao) {
        const submenu = tiBotao.querySelector('.submenu-ti');
        const seta = tiBotao.querySelector('.seta-submenu');
        tiBotao.addEventListener('click', function (event) {
            event.stopPropagation();
            submenu.classList.toggle('visivel');
            seta.innerHTML = submenu.classList.contains('visivel') ? 'ʌ' : 'v';
        });
    }

    //-----------------{ LÓGICA PARA MOSTRAR E-MAIL NO FOOTER }-----------------------------
    const emailBotao = document.getElementById("emailBotao");
    const emailTexto = document.getElementById("emailTexto");
    if (emailBotao && emailTexto) {
        emailTexto.style.display = '';
        emailBotao.addEventListener("click", function (event) {
            event.preventDefault();
            emailTexto.classList.toggle("visible");
        });
    }

    //-----------------{ LÓGICA DA ÁREA PROFISSIONAL (INDEX.HTML) }-----------------------------
    const profissionalBtns = document.querySelectorAll('.profissional-btn');
    if (profissionalBtns.length > 0) {
        const profissionalConteudos = document.querySelectorAll('.profissional-conteudo');
        profissionalBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                profissionalBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const targetId = this.getAttribute('data-target');
                profissionalConteudos.forEach(conteudo => conteudo.style.display = 'none');
                const targetConteudo = document.getElementById(targetId);
                if (targetConteudo) targetConteudo.style.display = 'block';
            });
        });
    }

    // =================================================================================
    // =========== CÓDIGO RESTAURADO PARA PÁGINAS DE MATÉRIAS ==========================
    // =================================================================================

    // -----------------------{ TROCA DE TRIMESTRES }--------------------------
    const trimestreBtns = document.querySelectorAll('.trimestre-btn');
    if (trimestreBtns.length > 0) {
        const conteudos = document.querySelectorAll('.conteudo-trimestre');
        trimestreBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                trimestreBtns.forEach(b => b.classList.remove('ativo'));
                this.classList.add('ativo');
                const targetId = this.getAttribute('data-target');
                conteudos.forEach(conteudo => conteudo.style.display = 'none');
                const targetConteudo = document.getElementById(targetId);
                if (targetConteudo) targetConteudo.style.display = 'block';
            });
        });
    }

    //-----------------{ LÓGICA DOS CARDS DE ATIVIDADE (FAVORITO E HOVER) }-----------------------------
    const todosOsTrimestres = document.querySelectorAll('.conteudo-trimestre');
    if (todosOsTrimestres.length > 0) {
        todosOsTrimestres.forEach(trimestre => {
            const containerDosCartoes = trimestre.querySelector('.container-cartoes');
            if (!containerDosCartoes) return;

            containerDosCartoes.querySelectorAll('.cartao-atividade').forEach((cartao, index) => {
                cartao.dataset.originalOrder = index;
            });

            containerDosCartoes.querySelectorAll('.cartao-atividade').forEach(cartao => {
                const iconeFavorito = cartao.querySelector('.icone-favorito');
                const tagsDeHabilidades = cartao.querySelectorAll('.tag-habilidade');
                const elementoResumo = cartao.querySelector('.resumo-habilidade');
                const textoResumoPadrao = elementoResumo ? elementoResumo.textContent : "";

                if (iconeFavorito) {
                    iconeFavorito.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const estaFavoritado = cartao.classList.toggle('favoritado');
                        
                        iconeFavorito.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                           iconeFavorito.style.transform = 'scale(1.15)';
                            setTimeout(() => iconeFavorito.style.transform = 'scale(1)', 100);
                        }, 100);

                        if (estaFavoritado) {
                            iconeFavorito.textContent = 'favorite';
                            iconeFavorito.classList.add('favoritado-ico');
                            containerDosCartoes.prepend(cartao);
                        } else {
                            iconeFavorito.textContent = 'favorite_border';
                            iconeFavorito.classList.remove('favoritado-ico');
                            
                            const naoFavoritados = Array.from(containerDosCartoes.querySelectorAll('.cartao-atividade:not(.favoritado)'));
                            naoFavoritados.sort((a, b) => a.dataset.originalOrder - b.dataset.originalOrder);
                            naoFavoritados.forEach(cf => containerDosCartoes.appendChild(cf));
                        }
                    });
                }

                if(elementoResumo) {
                    tagsDeHabilidades.forEach(tag => {
                        tag.addEventListener('mouseover', () => elementoResumo.textContent = tag.dataset.summary);
                    });
                    const containerTags = cartao.querySelector('.tags-habilidades');
                    if (containerTags) {
                        containerTags.addEventListener('mouseout', () => elementoResumo.textContent = textoResumoPadrao);
                    }
                }
            });
        });
    }

    //-----------------{ LÓGICA DO MODAL DE DESCRIÇÃO ("LER MAIS") }-----------------------------
    const sobreposicaoModal = document.getElementById('modalDescricao');
    if (sobreposicaoModal) {
        const tituloModal = document.getElementById('modalTitulo');
        const descricaoModal = document.getElementById('paragrafoModalDescricao');
        const btnFecharModal = document.getElementById('btnFecharModal');
        const linksLerMais = document.querySelectorAll('.ler-mais');

        const abrirModal = (cartao) => {
            const titulo = cartao.querySelector('.cartao-titulo').textContent;
            const descricaoCompleta = cartao.dataset.fullDescription;
            tituloModal.textContent = titulo;
            descricaoModal.textContent = descricaoCompleta;
            document.body.classList.add('modal-aberto');
            sobreposicaoModal.classList.add('visivel');
        };

        const fecharModal = () => {
            document.body.classList.remove('modal-aberto');
            sobreposicaoModal.classList.remove('visivel');
        };

        linksLerMais.forEach(link => {
            link.addEventListener('click', function (evento) {
                const cartao = evento.target.closest('.cartao-atividade');
                if (cartao) abrirModal(cartao);
            });
        });

        if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModal);
        sobreposicaoModal.addEventListener('click', (e) => { if (e.target === sobreposicaoModal) fecharModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sobreposicaoModal.classList.contains('visivel')) fecharModal(); });
    }
});