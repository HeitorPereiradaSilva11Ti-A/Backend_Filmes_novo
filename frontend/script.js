const API_URL = "https://backend-heitor-filmes.vercel.app/";

async function buscarFilmes() {
    const container = document.getElementById("container-filmes");
    const totalBadge = document.getElementById("total-filmes");

    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao carregar os filmes do servidor.");
        
        const filmes = await resposta.json();
        
        totalBadge.textContent = `${filmes.length} filme(s)`;
        container.innerHTML = "";

        if (filmes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Nenhum filme cadastrado até o momento.</p>
                </div>
            `;
            return;
        }

        filmes.forEach((filme) => {
            const id = filme.id || filme._id;
            const classificacao = filme.classificacao_etaria === "L" ? "Livre" : `${filme.classificacao_etaria} anos`;

            let classeBadge = "";
            if (filme.classificacao_etaria === "L") {
                classeBadge = "livre";
            } else if (filme.classificacao_etaria === "18") {
                classeBadge = "idade-18";
            }

            const cardHtml = `
                <article class="card-filme" data-id="${id}">
                    <div>
                        <div class="card-header">
                            <span class="card-genre">${filme.genero || 'Gênero n/a'}</span>
                            <h3 class="card-title">${filme.titulo_do_filme}</h3>
                        </div>

                        <div class="card-info-list">
                            <div class="card-info-item">
                                <span class="info-label">Duração</span>
                                <span class="info-value">${filme.duracao}</span>
                            </div>
                            <div class="card-info-item">
                                <span class="info-label">Classificação</span>
                                <span class="badge-age ${classeBadge}">${classificacao}</span>
                            </div>
                        </div>
                    </div>

                    <div class="card-actions">
                        <a href="./editar/editar.html?id=${id}" class="btn btn-secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            Editar
                        </a>
                        <button onclick="deletarFilme('${id}', '${filme.titulo_do_filme}')" class="btn btn-danger">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            Excluir
                        </button>
                    </div>
                </article>
            `;

            container.innerHTML += cardHtml;
        });

    } catch (erro) {
        console.error(erro);
        container.innerHTML = `
            <div class="empty-state">
                <p>Não foi possível carregar os filmes. Verifique se o servidor está ativo.</p>
            </div>
        `;
        totalBadge.textContent = "Erro";
    }
}

async function deletarFilme(id, titulo) {
    if (!id || id === "undefined") {
        alert("Erro: ID do filme não encontrado.");
        return;
    }

    const confirmacao = confirm(`Tem certeza que deseja apagar o filme "${titulo}"?`);
    if (!confirmacao) return;

    try {
        // Rota correta do seu backend
        const resposta = await fetch(`${API_URL}delete-movie/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao excluir filme.`);
        }

        const cardTarget = document.querySelector(`.card-filme[data-id="${id}"]`);
        if (cardTarget) {
            cardTarget.style.opacity = '0';
            cardTarget.style.transform = 'scale(0.9)';
            setTimeout(() => {
                buscarFilmes();
            }, 250);
        }
    } catch (erro) {
        alert("Falha ao apagar o filme. Tente novamente.");
        console.error(erro);
    }
}

buscarFilmes();