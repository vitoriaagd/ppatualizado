const formContainer = document.getElementById('form-container');
const toggleFormButton = document.getElementById('toggle-form');
const recipeForm = document.getElementById('recipe-form');
const feed = document.getElementById('feed');

toggleFormButton.addEventListener('click', () => {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
});


const botão_criar = document.getElementById("b-criar")

botão_criar.addEventListener("click", async function(event) {
    event.preventDefault()
    
    
    let title = document.getElementById("recipe-title").value;
    let conteudo = document.getElementById("recipe-content").value;
    
    
    let data = {title , conteudo}
    
    const response = await fetch('http://localhost:3000/api/store/receitaCriar', {
        method: 'POST',
        headers: { 'Content-type': 'application/json;charset=UTF-8' }, // Define o tipo de conteúdo como JSON
        body: JSON.stringify(data) // Converte o objeto 'data' em uma string JSON
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
        alert("deu merda")
    }
})