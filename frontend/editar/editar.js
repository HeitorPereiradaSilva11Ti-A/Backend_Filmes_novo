const API_URL = "https://backend-heitor-filmes.vercel.app/";

const params = new URLSearchParams(window.location.search);
const filmeId = params.get("id");

const form = document.getElementById("form-editar");
const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const inputDuracao = document.getElementById("duracao");
const inputClassificacao = document.getElementById("classificacao");

// 1. Busca todos os filmes na rota GET / e localiza o filme pelo ID
async function carregarDadosFilme() {
    if (!filmeId || filmeId === "undefined") {
        alert("ID de filme inválido.");
        window.location.href = "../index.html";
        return;
    }

    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao buscar a lista do servidor.");
        
        const filmes = await resposta.json();
        const filme = filmes.find(f => (f.id || f._id) == filmeId);

        if (!filme) {
            throw new Error("Filme não encontrado.");
        }

        // Preenche o formulário
        inputTitulo.value = filme.titulo_do_filme || "";
        inputGenero.value = filme.genero || "";
        inputDuracao.value = filme.duracao || "";
        inputClassificacao.value = filme.classificacao_etaria || "";

    } catch (erro) {
        console.error("Erro no carregamento:", erro);
        alert("Não foi possível carregar os dados para edição.");
    }
}

// 2. Envia a atualização para a rota correta PUT /update-movie/:id
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
        titulo_do_filme: inputTitulo.value,
        genero: inputGenero.value,
        duracao: inputDuracao.value,
        classificacao_etaria: inputClassificacao.value
    };

    const btnSalvar = document.getElementById("btn-salvar");
    btnSalvar.textContent = "Salvando...";
    btnSalvar.disabled = true;

    try {
        const resposta = await fetch(`${API_URL}update-movie/${filmeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosAtualizados)
        });

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao atualizar o filme.`);
        }

        alert("Filme atualizado com sucesso!");
        window.location.href = "../index.html";

    } catch (erro) {
        console.error("Erro na atualização:", erro);
        alert("Falha ao salvar as alterações.");
        btnSalvar.textContent = "Salvar Alterações";
        btnSalvar.disabled = false;
    }
});

carregarDadosFilme();