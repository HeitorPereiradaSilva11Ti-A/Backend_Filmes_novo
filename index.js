import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes_03MA"
})


const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_HeitorPereira"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})


app.post("/add-movie", (request, response) => {
    const { titulo_do_filme, genero, duracao, classificacao_etaria } = request.body

    const insertCommand = 
        "INSERT INTO filmes_HeitorPereira(titulo_do_filme, genero, duracao, classificacao_etaria) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [titulo_do_filme, genero, duracao, classificacao_etaria], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme adicionado com sucesso!"
            })
        }
    })
})

app.delete("/delete-movie/:id", (request, response) => {

    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_HeitorPereira WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    })

})

app.put("/update-movie/:id", (request, response) => {
    const { id } = request.params
    const { titulo_do_filme, genero, duracao, classificacao_etaria } = request.body

    const updateCommand = 
        "UPDATE filmes_HeitorPereira SET titulo_do_filme = ?, genero = ?, duracao = ?, classificacao_etaria = ? WHERE id = ?"

    database.query(updateCommand, [titulo_do_filme, genero, duracao, classificacao_etaria, id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Informações do filme atualizadas com sucesso!"
            })
        }
    })
})

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080")
})                                         
