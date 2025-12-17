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
    // --- 2. Lógica do Chat WhatsApp Antigo ---
    // ------------------------------------------------------------------
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const whatsappForm = document.getElementById('whatsappForm');

    if (chatToggle && chatWindow && whatsappForm) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nomeChat = document.getElementById('chatName').value;
            const msgChat = document.getElementById('chatMessage').value;
            const link = `https://wa.me/5512988827745?text=Nome: ${encodeURIComponent(nomeChat)}%0AMensagem: ${encodeURIComponent(msgChat)}`;
            window.open(link, '_blank');
        });
    }

    // ------------------------------------------------------------------
    // ✅ 3. Lógica do Modal de Credenciamento DEDICADO
    // ------------------------------------------------------------------
    const btnAbrirCredenciamento = document.getElementById('btnAbrirCredenciamento');
    const btnAbrirCredenciamentoSec = document.getElementById('btnAbrirCredenciamentoSec');
    const modalCredenciamento = document.getElementById('modalCredenciamento');
    const fecharCredenciamento = document.getElementById('fecharCredenciamento');
    const formCredenciamento = document.getElementById('formCredenciamento');

    function openCredModal(event) {
        if (event) event.preventDefault();
        if (modalCredenciamento) modalCredenciamento.style.display = 'block';
    }

    function closeCredModal() {
        if (modalCredenciamento) modalCredenciamento.style.display = 'none';
        if (formCredenciamento) formCredenciamento.reset();
    }

    if (btnAbrirCredenciamento) {
        btnAbrirCredenciamento.addEventListener('click', openCredModal);
    }
    if (btnAbrirCredenciamentoSec) {
        btnAbrirCredenciamentoSec.addEventListener('click', openCredModal);
    }

    if (fecharCredenciamento) {
        fecharCredenciamento.addEventListener('click', closeCredModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modalCredenciamento) {
            closeCredModal();
        }
    });

    if (formCredenciamento) {
        formCredenciamento.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('inputNomeCred').value.trim();
            const especialidade = document.getElementById('inputEspecCred').value.trim();
            const email = document.getElementById('inputEmailCred').value.trim();
            const telefone = document.getElementById('inputTelCred').value.trim();

            const WHATSAPP_NUMBER = '5512988827745';
            let fullMessage = `*SOLICITAÇÃO DE CREDENCIAMENTO - SITE*\n\n`;
            fullMessage += `Olá, tenho interesse em ser um conveniado.\n`;
            fullMessage += `\n*Dados do Profissional:*\n`;
            fullMessage += `Nome: ${nome}\n`;
            fullMessage += `Especialidade: ${especialidade}\n`;
            fullMessage += `E-mail: ${email}\n`;
            fullMessage += `Telefone: ${telefone}`;

            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
            window.open(whatsappLink, '_blank');
            closeCredModal();
        });
    }


    // ------------------------------------------------------------------
    // --- 4. Lógica do Carrossel ---
    // ------------------------------------------------------------------
    const track = document.querySelector('.carousel-track');

    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');

        const getSlideWidth = () => slides[0].getBoundingClientRect().width;
        let slideWidth = getSlideWidth();

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        };
        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        }

        if (slides.length > 0 && !track.querySelector('.current-slide')) {
            slides[0].classList.add('current-slide');
        }

        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            let nextSlide = currentSlide.nextElementSibling;
            if (!nextSlide) { nextSlide = slides[0]; }
            moveToSlide(track, currentSlide, nextSlide);
        });

        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            let prevSlide = currentSlide.previousElementSibling;
            if (!prevSlide) { prevSlide = slides[slides.length - 1]; }
            moveToSlide(track, currentSlide, prevSlide);
        });

        window.addEventListener('resize', () => {
            slideWidth = getSlideWidth();
            slides.forEach(setSlidePosition);
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
        });
    }
});

// ------------------------------------------------------------------
// ✅ 5. LISTA DE MÉDICOS (MOBILE) - SEM "ATUACAO"
// ------------------------------------------------------------------
const listaMedicosAryel = [
    { id: 1, nome: "Lineker", cargo: "Clínico Geral", img: "Lineker-mobile.png", desc: "Atua no diagnóstico, prevenção e tratamento de diversas doenças." },
    { id: 2, nome: "Gabriela", cargo: "Clínica Geral", img: "Gabriela-mobile.png", desc: "Focada em diagnósticos precisos e cuidados primários abrangentes." },
    { id: 3, nome: "Rita", cargo: "Nutricionista", img: "Rita-mobile.png", desc: "Elabora planos alimentares personalizados para promover a saúde." },
    { id: 4, nome: "Karen", cargo: "Nutricionista Esportiva", img: "Karen-mobile.png", desc: "Otimização de desempenho físico e composição corporal." },
    { id: 5, nome: "Maury", cargo: "Terapia Integrativa", img: "Maury-mobile.png", desc: "Equilíbrio emocional e mental através de métodos holísticos." },
    { id: 6, nome: "Irineu", cargo: "Terapia Avançada", img: "Irineu-mobile.png", desc: "Harmonização energética e resolução de traumas profundos." },
    { id: 7, nome: "Sanders", cargo: "Psicólogo", img: "Sanders-mobile.png", desc: "Suporte terapêutico para lidar com questões emocionais." },
    { id: 8, nome: "Victoria", cargo: "Psicóloga", img: "Victoria-mobile.png", desc: "Apoia pacientes na gestão da ansiedade e melhoria da autoestima." },
    { id: 9, nome: "Carla", cargo: "Gastroenterologia", img: "Carla-mobile.png", desc: "Diagnóstico e tratamento de doenças do aparelho digestivo." },
    { id: 10, nome: "Viviane", cargo: "Constelação Familiar", img: "Viviane-mobile.png", desc: "Trabalha dinâmicas familiares e relacionais ocultas." },
    { id: 11, nome: "Rafael", cargo: "Clínico Geral", img: "Rafael-mobile.png", desc: "Saúde integral, check-ups de rotina e coordenação do cuidado." }
];

function renderizarListaMobile() {
    const wrapper = document.getElementById('aryel-doctors-list');
    if (!wrapper) return;
    wrapper.innerHTML = listaMedicosAryel.map(medico => `
        <div class="mobile-doctor-card-btn" onclick="abrirModalMedico(${medico.id})">
            <img src="${medico.img}" alt="${medico.nome}">
            <div class="btn-text">
                <span>${medico.nome}</span>
                <small>${medico.cargo}</small>
            </div>
            <div class="arrow">❯</div>
        </div>
    `).join('');
}

function abrirModalMedico(id) {
    const medico = listaMedicosAryel.find(m => m.id === id);
    const render = document.getElementById('aryel-modal-render');
    if (!render) return;

    render.innerHTML = `
        <img src="${medico.img}" class="modal-img-top">
        <div class="modal-info-padding">
            <h2 style="margin:0; font-size:24px; color:#222;">${medico.nome.toUpperCase()}</h2>
            <p style="color:#6a5acd; font-weight:bold; margin: 10px 0;">${medico.cargo}</p>
            <p style="font-size:14px; color:#666; line-height:1.6;">${medico.desc}</p>
        </div>
    `;
    document.getElementById('aryel-custom-modal').style.display = 'block';
}

function fecharModalMedico() {
    document.getElementById('aryel-custom-modal').style.display = 'none';
}

renderizarListaMobile();
