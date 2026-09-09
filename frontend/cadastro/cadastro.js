async function cadastrarFilme() {
    const inputTitulo = document.getElementById("titulo")
    const inputGenero = document.getElementById("genero")
    const inputClassificacao_Etaria = document.getElementById("classificacao_etaria")
    const inputDuracao = document.getElementById("duracao")

    if (inputTitulo.value === "" || inputGenero.value === "" || inputClassificacao_Etaria.value === "" || inputDuracao.value === "") {
        alert("Preencha todas as informações!")
        return
    }

    const filme = {
        titulo_do_filme: inputTitulo.value,
        genero: inputGenero.value,
        classificacao_etaria: inputClassificacao_Etaria.value,
        duracao: inputDuracao.value
    }

    const informacoesAEnviar = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    }

    const resposta = await fetch("https://backend-filmes-novo.vercel.app/add-movie", informacoesAEnviar)
    const mensagemDecifrada = await resposta.json()

    alert(mensagemDecifrada.message)

    window.location.href = "../index.html"
}