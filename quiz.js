function renderQuiz(quizData, contentContainer, resultsContainer) {
    contentContainer.innerHTML = 
        ""; // Limpa container de conteúdo
    resultsContainer.innerHTML = 
        ""; // Limpa container de resultados
    resultsContainer.classList.add("hidden"); // Esconde resultados

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    function displayQuestion() {
        contentContainer.innerHTML = 
            ""; // Limpa questão anterior
        selectedOption = null; // Reseta opção selecionada

        if (currentQuestionIndex >= quizData.length) {
            displayResults();
            return;
        }

        const questionData = quizData[currentQuestionIndex];
        const questionElement = document.createElement("div");
        questionElement.classList.add("quiz-question");

        const questionText = document.createElement("p");
        questionText.innerHTML = `<strong>${currentQuestionIndex + 1}. ${questionData.question}</strong>`;
        questionElement.appendChild(questionText);

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("quiz-options");

        questionData.options.forEach((optionText, index) => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("quiz-option");
            optionElement.textContent = optionText;
            optionElement.dataset.index = index;

            optionElement.addEventListener("click", () => {
                // Remove seleção anterior
                optionsContainer.querySelectorAll(".quiz-option").forEach(opt => opt.classList.remove("selected"));
                // Marca nova seleção
                optionElement.classList.add("selected");
                selectedOption = optionText;
                // Habilita botão de confirmar se não estiver habilitado
                confirmButton.disabled = false;
            });
            optionsContainer.appendChild(optionElement);
        });

        questionElement.appendChild(optionsContainer);

        const feedbackElement = document.createElement("div");
        feedbackElement.classList.add("feedback");
        questionElement.appendChild(feedbackElement);

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirmar Resposta";
        confirmButton.disabled = true; // Desabilitado até selecionar uma opção
        confirmButton.addEventListener("click", () => {
            if (selectedOption === null) return; // Não faz nada se nada foi selecionado

            const correctAnswer = questionData.answer;
            if (selectedOption === correctAnswer) {
                feedbackElement.textContent = "Correto!";
                feedbackElement.className = "feedback correct";
                score++;
            } else {
                feedbackElement.textContent = `Incorreto. A resposta correta é: ${correctAnswer}`;
                feedbackElement.className = "feedback incorrect";
            }

            // Desabilita opções e botão de confirmar
            optionsContainer.querySelectorAll(".quiz-option").forEach(opt => {
                opt.style.pointerEvents = "none"; // Impede novos cliques
                opt.style.opacity = "0.7";
            });
            confirmButton.style.display = "none"; // Esconde botão de confirmar
            nextButton.style.display = "inline-block"; // Mostra botão de próxima
        });

        const nextButton = document.createElement("button");
        nextButton.textContent = "Próxima Questão";
        nextButton.style.display = "none"; // Escondido inicialmente
        nextButton.addEventListener("click", () => {
            currentQuestionIndex++;
            displayQuestion();
        });

        questionElement.appendChild(confirmButton);
        questionElement.appendChild(nextButton);
        contentContainer.appendChild(questionElement);
    }

    function displayResults() {
        contentContainer.innerHTML = 
            ""; // Limpa a última questão
        resultsContainer.innerHTML = `Você acertou ${score} de ${quizData.length} questões.`;
        resultsContainer.classList.remove("hidden");
    }

    // Inicia o quiz exibindo a primeira questão
    displayQuestion();
}

