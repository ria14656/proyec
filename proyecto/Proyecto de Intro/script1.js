document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '38c7ed0ecdba627641f7337dd7e7f400';
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
            url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=es`;
        } else if (category === 'sports' || category === 'technology') {

                url = `https://newsapi.org/v2/top-headlines?category=entertainment&apiKey=${apiKey}&language=es`;
            // Aquí podrías agregar más URLs de APIs específicas para deportes y tecnología si las encuentras
            newsContainer.innerHTML = '<p>No hay noticias disponibles para esta categoría</p>';
            return;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                newsContainer.innerHTML = '';

                data.results.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.classList.add('news-item');
                    newsItem.innerHTML = `
                        <h2>${item.title || item.name}</h2>
                        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}" />
                        <p>${item.overview}</p>
                        <a href="https://www.themoviedb.org/movie/${item.id}" target="_blank">Acceder</a>
                    `;

                    newsContainer.appendChild(newsItem);
                });
            })
            .catch(error => {
                newsContainer.innerHTML = '<p>Error al cargar noticias</p>';
                console.error('Error:', error);
            });
    }

    // Cargar noticias de una categoría predeterminada al inicio
    fetchNews('movies');
});
