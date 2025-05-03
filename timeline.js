function renderTimeline(timelineData, container) {
    container.innerHTML = 
        `<h4>Linha do Tempo Interativa</h4>
         <p>Clique nos eventos para ver detalhes e conexões.</p>`;

    timelineData.forEach(item => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("timeline-event");
        eventElement.innerHTML = `
            <h5>${item.year}: ${item.event}</h5>
            <p>${item.details}</p>
            <button class="details-btn" data-type="philosophy">Contexto Filosófico</button>
            <button class="details-btn" data-type="sociology">Análise Sociológica</button>
            <div class="details-content philosophy hidden"><strong>Filosofia:</strong> ${item.philosophy_context}</div>
            <div class="details-content sociology hidden"><strong>Sociologia:</strong> ${item.sociology_context}</div>
        `;

        const buttons = eventElement.querySelectorAll(".details-btn");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                const type = button.dataset.type;
                const contentDiv = eventElement.querySelector(`.details-content.${type}`);
                // Toggle visibility
                contentDiv.classList.toggle("hidden");
                // Opcional: Esconder o outro detalhe se estiver visível
                const otherType = type === "philosophy" ? "sociology" : "philosophy";
                const otherContentDiv = eventElement.querySelector(`.details-content.${otherType}`);
                // if (!otherContentDiv.classList.contains('hidden')) {
                //     otherContentDiv.classList.add('hidden');
                // }
            });
        });

        container.appendChild(eventElement);
    });
}

