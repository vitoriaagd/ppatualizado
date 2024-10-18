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
    
    let data = { title, conteudo };
    
    const response = await fetch('http://localhost:3001/api/store/receitaCriar', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    });
    
    let content = await response.json();
    
    if (content.success) {
        const title = document.getElementById('recipe-title').value;
        const content = document.getElementById('recipe-content').value;
        
        const feedItem = document.createElement('div');
        feedItem.classList.add('feed-item');
        feedItem.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        
        feed.appendChild(feedItem);
        
        recipeForm.reset();
        formContainer.style.display = 'none';
    } else {
        alert("deu merda");
    }
});

// Função para carregar receitas na inicialização da página
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('http://localhost:3001/api/receitas');
        const content = await response.json();

        if (content.success) {
            content.data.forEach(receita => {
                const feedItem = document.createElement('div');
                feedItem.classList.add('feed-item');
                feedItem.innerHTML = `<h3>${receita.title}</h3><p>${receita.desc_receita}</p>`;
                feed.appendChild(feedItem);
            });
        } else {
            console.error("Erro ao buscar receitas: ", content.message);
        }
    } catch (error) {
        console.error("Erro ao fazer a requisição: ", error);
    }
});
