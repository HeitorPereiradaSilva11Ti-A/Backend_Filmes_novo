async function buscarfilmes(){
    const respota = await fetch("https://backend-heitor-filmes.vercel.app/")
    const filmes = await respota.json()
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
        <div>
<h2>${filme.titulo_do_filme}</h2>
<p><strong>Gênero:</strong>${filme.genero}</p>
<p><strong>Duração:</strong>${filme.duracao}</p>
<p><strong>Classificação etária:</strong>${filme.classificacao_etaria === "L" ? 'Livre':filme.classificacao_etaria + 'anos' }</p>
</div>
        `
    })
}

buscarfilmes()