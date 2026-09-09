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
        title: inputTitulo.value,
        gender: inputGenero.value,
        ageLimit: inputClassificacao_Etaria.value,
        duration: inputDuracao.value
    }

    const informacoesAEnviar = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    }

    const resposta = await fetch("https://backend-filmes-novo.vercel.app/cadastro/cadastro.html/add-movie", informacoesAEnviar)
    const mensagemDecifrada = await resposta.json()

    alert(mensagemDecifrada.message)

    window.location.href = "../index.html"
}