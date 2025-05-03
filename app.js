document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('app-content');
    const initialScreen = document.getElementById('initial-screen');
    const moduleScreen = document.getElementById('module-screen');
    const dilemmaScreen = document.getElementById('dilemma-screen');
    const forumScreen = document.getElementById('forum-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const moduleListContainer = document.getElementById('module-list');

    let currentModuleData = null;

    // --- Data Loading ---
    async function loadModuleData(moduleId) {
        try {
            // For prototype, only one module exists
            if (moduleId === 'revolucao_francesa') {
                const response = await fetch('data/revolucao_francesa.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                currentModuleData = await response.json();
                return currentModuleData;
            } else {
                console.error('Módulo não encontrado:', moduleId);
                return null;
            }
        } catch (error) {
            console.error('Erro ao carregar dados do módulo:', error);
            appContent.innerHTML = '<p>Erro ao carregar dados. Tente recarregar a página.</p>';
            return null;
        }
    }

    // --- Screen Navigation ---
    function showScreen(screenToShow) {
        [initialScreen, moduleScreen, dilemmaScreen, forumScreen, quizScreen].forEach(screen => {
            screen.classList.add('hidden');
        });
        if (screenToShow) {
            screenToShow.classList.remove('hidden');
        }
    }

    // --- Initial Screen Logic ---
    function displayInitialScreen() {
        moduleListContainer.innerHTML = ''; // Limpa lista anterior
        // No protótipo, apenas um módulo
        const moduleId = 'revolucao_francesa'; // ID Fixo para o protótipo
        // Simula a busca de metadados do módulo (poderia vir de um index.json no futuro)
        fetch('data/revolucao_francesa.json') // Busca o próprio JSON para pegar título/descrição
            .then(response => response.json())
            .then(data => {
                const moduleCard = document.createElement('div');
                moduleCard.classList.add('module-card');
                moduleCard.dataset.moduleId = moduleId;
                moduleCard.innerHTML = `
                    <h4>${data.title}</h4>
                    <p>${data.description}</p>
                `;
                moduleCard.addEventListener('click', () => loadAndDisplayModule(moduleId));
                moduleListContainer.appendChild(moduleCard);
                showScreen(initialScreen);
            })
            .catch(error => {
                console.error('Erro ao carregar metadados do módulo:', error);
                moduleListContainer.innerHTML = '<p>Erro ao carregar lista de módulos.</p>';
                showScreen(initialScreen);
            });
    }

    // --- Module Screen Logic ---
    async function loadAndDisplayModule(moduleId) {
        const data = await loadModuleData(moduleId);
        if (!data) return;

        moduleScreen.innerHTML = `
            <button id="back-to-main">Voltar</button>
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <hr>
            <div id="timeline-content"></div>
            <hr>
            <button id="goto-dilemma">Simular Dilema</button>
            <button id="goto-forum">Ver Debate</button>
            <button id="goto-quiz">Iniciar Quiz</button>
        `;

        // Renderiza componentes
        renderTimeline(data.timeline, document.getElementById('timeline-content'));

        // Adiciona Event Listeners
        document.getElementById('back-to-main').addEventListener('click', displayInitialScreen);
        document.getElementById('goto-dilemma').addEventListener('click', () => displayDilemma(data.dilemma));
        document.getElementById('goto-forum').addEventListener('click', () => displayForum(data.forum));
        document.getElementById('goto-quiz').addEventListener('click', () => displayQuiz(data.quiz));

        showScreen(moduleScreen);
    }

    // --- Dilemma Screen Logic ---
    function displayDilemma(dilemmaData) {
        dilemmaScreen.innerHTML = `
            <button id="back-to-module-dilemma">Voltar ao Módulo</button>
            <h3>Dilema: ${dilemmaData.title}</h3>
            <p>${dilemmaData.scenario}</p>
            <div id="dilemma-choices"></div>
            <div id="dilemma-outcome-area" class="hidden"></div>
        `;
        renderDilemma(dilemmaData, document.getElementById('dilemma-choices'), document.getElementById('dilemma-outcome-area'));
        document.getElementById('back-to-module-dilemma').addEventListener('click', () => showScreen(moduleScreen));
        showScreen(dilemmaScreen);
    }

    // --- Forum Screen Logic ---
    function displayForum(forumData) {
        forumScreen.innerHTML = `
            <button id="back-to-module-forum">Voltar ao Módulo</button>
            <h3>Debate:</h3>
            <p><strong>${forumData.question}</strong></p>
            <div id="forum-viewpoints"></div>
            <!-- <textarea id="forum-comment" placeholder="Adicione seu comentário (apenas demonstração)"></textarea> -->
            <!-- <button id="submit-comment">Enviar</button> -->
        `;
        renderForum(forumData, document.getElementById('forum-viewpoints'));
        document.getElementById('back-to-module-forum').addEventListener('click', () => showScreen(moduleScreen));
        showScreen(forumScreen);
    }

    // --- Quiz Screen Logic ---
    function displayQuiz(quizData) {
        quizScreen.innerHTML = `
            <button id="back-to-module-quiz">Voltar ao Módulo</button>
            <h3>Quiz Interdisciplinar</h3>
            <div id="quiz-content"></div>
            <div id="quiz-results" class="hidden"></div>
        `;
        renderQuiz(quizData, document.getElementById('quiz-content'), document.getElementById('quiz-results'));
        document.getElementById('back-to-module-quiz').addEventListener('click', () => showScreen(moduleScreen));
        showScreen(quizScreen);
    }

    // --- Initialization ---
    displayInitialScreen();

});

