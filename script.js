document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Lógica Geral (Menu e Scroll) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Menu Mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Animação de Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));


    // ------------------------------------------------------------------
    // --- 2. Lógica do Chat WhatsApp Antigo (Mantida, mas Desconectada dos botões) ---
    // ------------------------------------------------------------------
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const whatsappForm = document.getElementById('whatsappForm');

    // A lógica de envio do whatsappForm é mantida, mas SÓ funcionará se o chatWindow for aberto pelo chatToggle.
    if (chatToggle && chatWindow && whatsappForm) {
        // Abrir/Fechar Chat (Lógica original, acionada pelo chatToggle)
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        // Enviar WhatsApp da janela flutuante original
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // (Seu código original de envio do whatsappForm aqui)
            // ...
            // Fim do código original
        });
    }

    // ------------------------------------------------------------------
    // ✅ 3. Lógica do Modal de Credenciamento DEDICADO (Envio para WhatsApp)
    // ------------------------------------------------------------------

    // Botões que abrem o Modal (IDs que funcionam agora)
    const btnAbrirCredenciamento = document.getElementById('btnAbrirCredenciamento');
    const btnAbrirCredenciamentoSec = document.getElementById('btnAbrirCredenciamentoSec');

    // Elementos do NOVO MODAL
    const modalCredenciamento = document.getElementById('modalCredenciamento');
    const fecharCredenciamento = document.getElementById('fecharCredenciamento');
    const formCredenciamento = document.getElementById('formCredenciamento');

    // Funções de Controle do Modal
    function openCredModal(event) {
        if (event) event.preventDefault();
        if (modalCredenciamento) modalCredenciamento.style.display = 'block';
    }

    function closeCredModal() {
        if (modalCredenciamento) modalCredenciamento.style.display = 'none';
        if (formCredenciamento) formCredenciamento.reset();
    }

    // Event Listeners para Abrir
    if (btnAbrirCredenciamento) {
        btnAbrirCredenciamento.addEventListener('click', openCredModal);
    }
    if (btnAbrirCredenciamentoSec) {
        btnAbrirCredenciamentoSec.addEventListener('click', openCredModal);
    }

    // Event Listeners para Fechar
    if (fecharCredenciamento) {
        fecharCredenciamento.addEventListener('click', closeCredModal);
    }

    // Fechar Modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === modalCredenciamento) {
            closeCredModal();
        }
    });

    // Submissão do Formulário (ENVIO PARA WHATSAPP)
    if (formCredenciamento) {
        formCredenciamento.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('inputNomeCred').value.trim();
            const especialidade = document.getElementById('inputEspecCred').value.trim();
            const email = document.getElementById('inputEmailCred').value.trim();
            const telefone = document.getElementById('inputTelCred').value.trim();

            if (!nome || !especialidade || !email || !telefone) {
                alert("Por favor, preencha todos os campos do formulário.");
                return;
            }

            // ⚠️ ATENÇÃO: Confirme se este é o número da Uniplan Med
            const WHATSAPP_NUMBER = '5512988827745';

            // Mensagem formatada para o WhatsApp
            let fullMessage = `*SOLICITAÇÃO DE CREDENCIAMENTO - SITE*\n\n`;
            fullMessage += `Olá, tenho interesse em ser um conveniado.\n`;
            fullMessage += `\n*Dados do Profissional:*\n`;
            fullMessage += `Nome: ${nome}\n`;
            fullMessage += `Especialidade: ${especialidade}\n`;
            fullMessage += `E-mail: ${email}\n`;
            fullMessage += `Telefone: ${telefone}`;

            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;

            // ✅ AÇÃO CRÍTICA: Abre o WhatsApp (app ou pop-up) sem redirecionar a página principal
            window.open(whatsappLink, '_blank');

            // Fecha o modal e exibe feedback para o usuário
            closeCredModal();
            alert(`Sua solicitação foi enviada para o WhatsApp! Verifique seu aplicativo para confirmar o envio.`);
        });
    }


    // ------------------------------------------------------------------
    // --- 4. Lógica do Carrossel (Mantida) ---
    // ------------------------------------------------------------------
    const track = document.querySelector('.carousel-track');

    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');

        // Função para calcular largura do slide
        const getSlideWidth = () => slides[0].getBoundingClientRect().width;
        let slideWidth = getSlideWidth();

        // Posiciona os slides um ao lado do outro
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        }

        // Adiciona classe 'current-slide' ao primeiro slide ao carregar
        if (slides.length > 0 && !track.querySelector('.current-slide')) {
            slides[0].classList.add('current-slide');
        }

        // Clique no botão Direito (Próximo)
        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;

            if (!nextSlide) { nextSlide = slides[0]; } // Loop
            moveToSlide(track, currentSlide, nextSlide);
        });

        // Clique no botão Esquerdo (Anterior)
        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            let prevSlide = currentSlide.previousElementSibling;

            if (!prevSlide) { prevSlide = slides[slides.length - 1]; } // Loop
            moveToSlide(track, currentSlide, prevSlide);
        });

        // Ajuste de redimensionamento de janela (Responsividade)
        window.addEventListener('resize', () => {
            slideWidth = getSlideWidth();
            slides.forEach(setSlidePosition);

            const currentSlide = track.querySelector('.current-slide') || slides[0];
            track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
        });
    }
});