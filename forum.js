function renderForum(forumData, viewpointsContainer) {
    viewpointsContainer.innerHTML = 
        ""; // Limpa container

    forumData.viewpoints.forEach(viewpoint => {
        const viewpointElement = document.createElement("div");
        viewpointElement.classList.add("forum-viewpoint");
        viewpointElement.textContent = viewpoint;
        viewpointsContainer.appendChild(viewpointElement);
    });

    // A funcionalidade de adicionar comentários não será implementada no protótipo,
    // apenas a visualização dos pontos de vista pré-definidos.
}

