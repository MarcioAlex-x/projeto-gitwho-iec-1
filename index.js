const input = document.querySelector('.input')
const form = document.querySelector('.form')

const infosFn = async (nome) => {
    try {
        const resposta = await fetch(`https://api.github.com/users/${nome}`)
        const data = await resposta.json()
        let ctx = document.createElement('div')
        ctx = `
            <div class="ctx">
                <div>
                    <img src="${data.avatar_url}">
                    <h2>${data.name}</h2>
                    <p>${data.login}</p>
                </div>
                <div>
                    <p>Bio: ${data.bio}</p>
                    <p>Seguidores: ${data.followers} | Seguindo: ${data.following}</p>
                    <p>Repositórios públicos: ${data.public_repos}</p>
                    <a href="${data.html_url}" target="_blank">Acesse o perfil</a>
                </div>
            </div>
        `
        document.querySelector('.infos').innerHTML = ctx
        console.log(data.name)
    } catch (err) {
        console.log(err)
    }
}

const reposFn = async (nome) => {
    try {
        const resposta = await fetch(`https://api.github.com/users/${nome}/repos`)
        const data = await resposta.json()

        let ctx = ''
        data.forEach((repo) => {
            ctx += `
                <div class="repo">
                    <h2>${repo.name}</h2>
                    <hr>
                    <p>Permite fork ${repo.allow_forking}</p>
                    <p>URL para clone ${repo.clone_url}</p>
                    <p>Criado em: ${repo.created_at}</p>
                    <p>Última atualização: ${repo.updated_at}</p>
                    <p>Branch: ${repo.default_branch}</p>
                    <p>Descrição: ${repo.description}</p>
                    <p>Linguagem: ${repo.language}</p>
                    <p>Visibilidade: ${repo.visibility}</p>
                </div>
            `
            document.querySelector('.repos').innerHTML = ctx
        })
    } catch (err) {
        console.log(err)
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    infosFn(input.value)
    reposFn(input.value)
})
