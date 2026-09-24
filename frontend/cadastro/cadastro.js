const API_URL = "https://backend-heitor-filmes.vercel.app/add-movie";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputTitulo = document.getElementById("titulo");
    const inputGenero = document.getElementById("genero");
    const inputClassificacaoEtaria = document.getElementById("classificacao_etaria");
    const inputDuracao = document.getElementById("duracao");

    if (!inputTitulo.value || !inputGenero.value || !inputClassificacaoEtaria.value || !inputDuracao.value) {
        alert("Preencha todas as informações!");
        return;
    }

    const filme = {
        titulo_do_filme: inputTitulo.value,
        genero: inputGenero.value,
        classificacao_etaria: inputClassificacaoEtaria.value,
        duracao: inputDuracao.value
    };

    const btnCadastrar = document.getElementById("btn-cadastrar");
    btnCadastrar.textContent = "Cadastrando...";
    btnCadastrar.disabled = true;

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filme)
        });

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao cadastrar filme.`);
        }

        const mensagemDecifrada = await resposta.json();
        alert(mensagemDecifrada.message || "Filme cadastrado com sucesso!");

        window.location.href = "../index.html";

    } catch (erro) {
        console.error(erro);
        alert("Falha ao cadastrar o filme. Tente novamente.");
        btnCadastrar.textContent = "Cadastrar Filme";
        btnCadastrar.disabled = false;
    }
});