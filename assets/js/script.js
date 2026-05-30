const githubAvatar = document.querySelector('#github-avatar');
const followersStat = document.querySelector('[data-github-stat="followers"]');
const reposStat = document.querySelector('[data-github-stat="repos"]');
const projectsList = document.querySelector('#projects-list');
const formulario = document.querySelector('#formulario');
const themeToggle = document.querySelector('#theme-toggle');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const projects = [
    {
        name: 'PeopleCore ERP',
        description: 'ERP para gestão de pessoas, funcionários e departamentos. Atuei no desenvolvimento, na Home, em componentes, responsividade e QA para apresentação.',
        technologies: ['React', 'TypeScript', 'Vite', 'NestJS', 'MySQL'],
        deploy: 'https://people-core-front.vercel.app/login',
        github: 'https://github.com/Grupo-03-Turma-JavaScript-14/people-core-front',
        icon: 'typescript',
    },
    {
        name: 'Save Drive',
        description: 'Aplicação importante da minha trajetória, com foco em experiência do usuário, organização visual e construção de uma interface funcional.',
        technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
        deploy: 'https://save-drive-front.vercel.app/home',
        github: '',
        icon: 'typescript',
    },
    {
        name: 'App Meteorologia',
        description: 'Aplicativo de meteorologia com busca por cidade, geolocalização do navegador e consumo da API Open-Meteo.',
        technologies: ['React', 'JavaScript', 'API', 'CSS'],
        deploy: '',
        github: 'https://github.com/KefilweLourenco/app-meteorologia',
        icon: 'javascript',
    },
    {
        name: 'RotaDelas',
        description: 'Projeto em equipe voltado a necessidades reais, com atenção a usabilidade, impacto social e experiência humana. Roda localmente.',
        technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
        deploy: '',
        github: 'https://github.com/Grupo-03-Turma-JavaScript-14/rotadelas-front',
        icon: 'typescript',
    },
    {
        name: 'Blog Pessoal',
        description: 'Aplicação full stack de blog pessoal com front-end em React e API REST em NestJS, criada durante a formação Full Stack JavaScript.',
        technologies: ['React', 'TypeScript', 'Vite', 'NestJS', 'MySQL'],
        deploy: 'https://blogpessoal-frontend-hazel.vercel.app',
        github: 'https://github.com/KefilweLourenco/blogpessoal_frontend',
        icon: 'typescript',
    },
];

function renderTags(tags) {
    return tags.map(tag => `<span class="tag">${tag}</span>`).join('');
}

function renderProjectButtons(project) {
    const buttons = [];

    if (project.deploy) {
        buttons.push(`<a href="${project.deploy}" target="_blank" rel="noopener noreferrer" class="botao-outline botao-sm">Deploy</a>`);
    }

    if (project.github) {
        buttons.push(`<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="botao botao-sm">GitHub</a>`);
    }

    return buttons.join('');
}

function renderProjects() {
    projectsList.innerHTML = projects.map(project => {
        const urlLogo = `./assets/icons/languages/${project.icon}.svg`;
        const buttons = renderProjectButtons(project);

        return `
            <div class="swiper-slide">
                <article class="project-card">
                    <figure class="project-image">
                        <img
                            src="${urlLogo}"
                            alt=""
                            aria-hidden="true"
                            onerror="this.onerror=null; this.src='./assets/icons/languages/github.svg';"
                        >
                    </figure>

                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p>${project.description}</p>

                        <div class="project-tags">
                            ${renderTags(project.technologies)}
                        </div>

                        ${buttons ? `<div class="project-buttons">${buttons}</div>` : ''}
                    </div>
                </article>
            </div>
        `;
    }).join('');
}

async function getAboutGitHub() {
    try {
        const resposta = await fetch('https://api.github.com/users/KefilweLourenco');

        if (!resposta.ok) {
            throw new Error('Não foi possível buscar dados do GitHub.');
        }

        const perfil = await resposta.json();

        if (perfil.avatar_url && githubAvatar) {
            githubAvatar.src = perfil.avatar_url;
        }

        if (followersStat) {
            followersStat.textContent = perfil.followers;
        }

        if (reposStat) {
            reposStat.textContent = perfil.public_repos;
        }
    } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);

        if (followersStat) {
            followersStat.textContent = 'GitHub';
        }

        if (reposStat) {
            reposStat.textContent = 'Perfil';
        }
    }
}

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
    });
}

function setFieldError(field, errorElement, message) {
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
}

function clearFieldErrors() {
    formulario.querySelectorAll('span').forEach(span => {
        span.textContent = '';
    });

    formulario.querySelectorAll('[aria-invalid="true"]').forEach(field => {
        field.removeAttribute('aria-invalid');
    });
}

function validateForm(event) {
    event.preventDefault();
    clearFieldErrors();

    let isValid = true;

    const nome = document.querySelector('#nome');
    const erroNome = document.querySelector('#erro-nome');
    const email = document.querySelector('#email');
    const erroEmail = document.querySelector('#erro-email');
    const assunto = document.querySelector('#assunto');
    const erroAssunto = document.querySelector('#erro-assunto');
    const mensagem = document.querySelector('#mensagem');
    const erroMensagem = document.querySelector('#erro-mensagem');

    if (nome.value.trim().length < 3) {
        setFieldError(nome, erroNome, 'O nome deve ter pelo menos 3 caracteres.');
        nome.focus();
        isValid = false;
    }

    if (!emailRegex.test(email.value.trim())) {
        setFieldError(email, erroEmail, 'Digite um e-mail válido.');

        if (isValid) {
            email.focus();
        }

        isValid = false;
    }

    if (assunto.value.trim().length < 5) {
        setFieldError(assunto, erroAssunto, 'O assunto deve ter pelo menos 5 caracteres.');

        if (isValid) {
            assunto.focus();
        }

        isValid = false;
    }

    if (mensagem.value.trim().length < 10) {
        setFieldError(mensagem, erroMensagem, 'A mensagem deve ter pelo menos 10 caracteres.');

        if (isValid) {
            mensagem.focus();
        }

        isValid = false;
    }

    if (isValid) {
        formulario.submit();
    }
}

function updateThemeButton(isLightTheme) {
    if (!themeToggle) {
        return;
    }

    themeToggle.setAttribute('aria-pressed', String(isLightTheme));
    themeToggle.querySelector('span').textContent = isLightTheme ? '☀' : '☾';
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const shouldUseLightTheme = savedTheme ? savedTheme === 'light' : prefersLight;

    document.body.classList.toggle('light-theme', shouldUseLightTheme);
    updateThemeButton(shouldUseLightTheme);
}

function toggleTheme() {
    const isLightTheme = document.body.classList.toggle('light-theme');

    localStorage.setItem('portfolio-theme', isLightTheme ? 'light' : 'dark');
    updateThemeButton(isLightTheme);
}

applySavedTheme();
renderProjects();
getAboutGitHub();
iniciarSwiper();
formulario.addEventListener('submit', validateForm);

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}
