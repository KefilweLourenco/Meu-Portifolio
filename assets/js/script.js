// Seletores
const about = document.querySelector('#about');
const swiperWrapper = document.querySelector('.swiper-wrapper');

// Seletor do Formulário
const formulario = document.querySelector('#formulario');

// Regex de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Seção Sobre
async function getAboutGitHub() {
    try {
        const resposta = await fetch('https://api.github.com/users/KefilweLourenco');
        const perfil = await resposta.json();

        about.innerHTML = `
            <figure class="about-image">
                <img 
                    src="${perfil.avatar_url}" 
                    alt="Foto do perfil de Kefilwe Lourenço"
                >
            </figure>

            <article class="about-content">
                <h2>Sobre mim</h2>

                <p>
                    Sou Kefilwe Lourenço, desenvolvedor Full Stack JavaScript em formação,
                    com foco em criar soluções digitais organizadas, acessíveis e com impacto social.
                </p>

                <p>
                    Tenho experiência com HTML, CSS, JavaScript, TypeScript, Node.js, NestJS,
                    MySQL e GitHub. Também tenho trajetória como instrutor de tecnologia,
                    o que fortalece minha forma de aprender, ensinar e construir soluções pensando em pessoas reais.
                </p>

                <div class="about-buttons-data">
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">
                            Ver GitHub
                        </a>

                        <a href="#" target="_blank" class="botao-outline">
                            Currículo
                        </a>
                    </div>

                    <div class="data-container">
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <div class="data-item">
                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
    }
}

// Seção Projetos
async function getProjectsGithub() {
    try {
        const resposta = await fetch('https://api.github.com/users/KefilweLourenco/repos?sort=updated&per_page=6');
        const repositorios = await resposta.json();

        swiperWrapper.innerHTML = '';

        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        };

        repositorios.forEach(repositorio => {
            const linguagem = repositorio.language || 'GitHub';
            const logo = linguagens[linguagem] ?? linguagens['GitHub'];
            const urlLogo = `./assets/icons/languages/${logo}.svg`;

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .toUpperCase();

            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto;

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub.';

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics
                    .slice(0, 3)
                    .map(topic => `<span class="tag">${topic}</span>`)
                    .join('')
                : `<span class="tag">${linguagem}</span>`;

            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : '';

            swiperWrapper.innerHTML += `
                <div class="swiper-slide">
                    <article class="project-card">
                        <figure class="project-image">
                            <img 
                                src="${urlLogo}"
                                alt="Ícone ${linguagem}"
                                onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';"
                            >
                        </figure>

                        <div class="project-content">
                            <h3>${nomeFormatado}</h3>

                            <p>${descricao}</p>

                            <div class="project-tags">
                                ${tags}
                            </div>

                            <div class="project-buttons">
                                <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
                                    GitHub
                                </a>

                                ${botaoDeploy}
                            </div>
                        </div>
                    </article>
                </div>
            `;
        });

        iniciarSwiper();

    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
    }
}

// Carrossel
function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 32,
            },

            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 24,
            },

            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 24,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    });
}

// Validação do Formulário
formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    formulario.querySelectorAll('span').forEach(span => {
        span.textContent = '';
    });

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');

    if (nome.value.trim().length < 3) {
        erroNome.textContent = 'O nome deve ter pelo menos 3 caracteres.';
        nome.focus();
        isValid = false;
    }

    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');

    if (!emailRegex.test(email.value.trim())) {
        erroEmail.textContent = 'Digite um e-mail válido.';

        if (isValid) {
            email.focus();
        }

        isValid = false;
    }

    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');

    if (assunto.value.trim().length < 5) {
        erroAssunto.textContent = 'O assunto deve ter pelo menos 5 caracteres.';

        if (isValid) {
            assunto.focus();
        }

        isValid = false;
    }

    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (mensagem.value.trim().length < 10) {
        erroMensagem.textContent = 'A mensagem deve ter pelo menos 10 caracteres.';

        if (isValid) {
            mensagem.focus();
        }

        isValid = false;
    }

    if (isValid) {
        formulario.submit();
    }
});

// Executar funções
getAboutGitHub();
getProjectsGithub();