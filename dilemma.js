function renderDilemma(dilemmaData, choicesContainer, outcomeArea) {
    choicesContainer.innerHTML = 
        `<p><strong>Sua Escolha:</strong></p>`; // Limpa e adiciona título
    outcomeArea.innerHTML = 
        ""; // Limpa área de resultado
    outcomeArea.classList.add("hidden"); // Esconde área de resultado

    dilemmaData.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.classList.add("dilemma-choice-btn");
        choiceButton.textContent = choice.text;
        choiceButton.addEventListener("click", () => {
            // Mostra o resultado correspondente
            outcomeArea.innerHTML = `
                <p><strong>Resultado da sua escolha:</strong></p>
                <div class="dilemma-outcome">${choice.outcome}</div>
            `;
            outcomeArea.classList.remove("hidden");

            // Opcional: Desabilitar botões após a escolha
            choicesContainer.querySelectorAll(".dilemma-choice-btn").forEach(btn => {
                btn.disabled = true;
                btn.style.cursor = "not-allowed";
                btn.style.opacity = "0.7";
            });
            choiceButton.style.fontWeight = "bold"; // Destaca a escolha feita
        });
        choicesContainer.appendChild(choiceButton);
    });
}

