document.addEventListener('DOMContentLoaded', () => {
    const apiKeyNewsAPI = '9257b882ad5a4ca1b361a067240d67d0';
    const newsContainer = document.getElementById('news-container');
    const buttons = document.querySelectorAll('nav button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            fetchNews(category);
        });
    });

    function fetchNews(category) {
        newsContainer.innerHTML = '<p>Cargando noticias...</p>';
        
        let url;
        if (category === 'movies') {
            url = `https://newsapi.org/v2/everything?q=movies&language=es&apiKey=${apiKeyNewsAPI}`;
        } else if (category === 'sports') {
            url = `https://newsapi.org/v2/top-headlines?category=sports&language=es&apiKey=${apiKeyNewsAPI}`;
        } else if (category === 'technology') {
            url = `https://newsapi.org/v2/top-headlines?category=technology&language=es&apiKey=${apiKeyNewsAPI}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = '';

                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    newsItem.innerHTML = `
                        <h2>${article.title}</h2>
                        <img src="${article.urlToImage || 'https://via.placeholder.com/500'}" alt="${article.title}" />
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Acceder</a>
                    `;

                    newsContainer.appendChild(newsItem);
                });
            })
            .catch(error => {
                newsContainer.innerHTML = '<p>Error al cargar noticias</p>';
                console.error('Error:', error);
            });
    }

    
    fetchNews('movies');
});
