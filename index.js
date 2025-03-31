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
                    <img src="">
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
        data.forEach((repo) => {
            console.log(repo)
        })
    } catch (err) {
        console.log(err)
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    infosFn(input.value)
})
