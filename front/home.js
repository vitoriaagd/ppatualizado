const formContainer = document.getElementById('form-container');
const toggleFormButton = document.getElementById('toggle-form');
const recipeForm = document.getElementById('recipe-form');
const feed = document.getElementById('feed');

toggleFormButton.addEventListener('click', () => {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});

const botão_criar = document.getElementById("b-criar");

botão_criar.addEventListener("click", async function(event) {
    event.preventDefault();
    
    let title = document.getElementById("recipe-title").value;
    let conteudo = document.getElementById("recipe-content").value;
    let userId = localStorage.getItem('userId')
    
    let data = { title, conteudo, userId };
    
    const response = await fetch('http://localhost:3001/api/store/receitaCriar', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    });
    
    let content = await response.json();
    
    if (content.success) {
        recipeForm.reset();
    } else {
        alert("deu merda");
    }
});

// Função para carregar receitas na inicialização da página
document.addEventListener('DOMContentLoaded', async function buscarReceitas(event) {
    event.preventDefault()

    let user_id = localStorage.getItem('userId')

    let response = await fetch("http://localhost:3001/api/getReceitas", {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify({user_id})
    })

    let content = await response.json()

    console.log(content)
    if (content.success) {
        console.log("deu bom")

        content.data.forEach(function (receita) {
            criarReceitas(receita)
        })
    } else {
        console.log("deu merda")
    }
});

function criarReceitas(receita) {
    let {title, desc_receita} = receita
    
    const feedItem = document.createElement('div');
    feedItem.classList.add('feed-item');
    feedItem.innerHTML = `<h3>${title}</h3><p>${desc_receita}</p>`;
    
    feed.appendChild(feedItem);
    
    formContainer.style.display = 'none';
}