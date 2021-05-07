let app = {
    init: function() {
        console.log('app.init()');

        // On appelle la méthode s'occupant d'ajouter les EventListener sur les éléments déjà dans le DOM
        app.addAllEventListeners();

        // On appelle la méthode s'occupant de charger tous les jeux vidéo
        app.loadVideoGames();
    },
    addAllEventListeners: function() {
        // On récupère l'élément <select> des jeux vidéo

        // On ajoute l'écouteur pour l'event "change", et on l'attache à la méthode app.handleVideogameSelected

        // On récupère le bouton pour ajouter un jeu vidéo
        let addVideogameButtonElement = document.getElementById('btnAddVideogame');
        // On ajoute l'écouteur pour l'event "click"
        addVideogameButtonElement.addEventListener('click', app.handleClickToAddVideogame);

        let clickOnVideoGameList = document.querySelector("#videogameId");
        clickOnVideoGameList.addEventListener('click', app.handleVideogameSelected);

        let submitNewVideoGameButtonElement = document.querySelector("buttonAdd");
        submitNewVideoGameButtonElement.addEventListener('submit', app.handleSubmitNewGame);

    },

    handleVideogameSelected: function(evt) {

        // Récupérer la valeur du <select> (id du videogame)
        let videoGameSelectId = evt.currentTarget.value;
        console.log(videoGameSelectId);
        app.loadReviews(videoGameSelectId);


        // Vider le contenu de div#review

        // charger les données pour ce videogame
        // Dupliquer la template #reviewTemplate et personnaliser son contenu avec les données

        // Ajouter dans le DOM
    },
    handleClickToAddVideogame: function() {
        // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');

    },

    handleSubmitNewGame: function(evt) {
        evt.preventDefault();
        let newGameName = document.querySelector('.inputName').value;
        let newGameEditor = document.querySelector('.inputEditor').value;

        // console.log(newGameName);
        // console.log(newGameEditor);

        let data = {
            'name': newGameName,
            'editor': newGameEditor,
        };

        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://parcours-s07-codesieg/S07-parcours-v2.5-codesieg/backend/public/videogames';
        fetch(url, fetchOptions)
            .then(
                function(reponse) {
                    console.log(reponse);
                    return reponse.json();
                })
            .then(
                function(data) {
                    console.log(data);
                });
    },

    loadVideoGames: function() {
        // Charger toutes les données des videogames
        // Ajouter une balise <option> par videogame
        //! avec un fetch recuperer les données de la BDD listing dynamique ici
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('http://parcours-s07-codesieg/S07-parcours-v2.5-codesieg/backend/public/videogames', config)
            // Ensuite, lorsqu'on reçoit la réponse au format JSON
            .then(function(response) {
                // On convertit cette réponse en un objet JS et on le retourne
                console.log(response);
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                app.displayGamesInSelectElement(data);
            });
    },

    loadReviews: function($gameId) {
        // Charger toutes les données des videogames
        //! avec un fetch recuperer les données de la BDD listing dynamique ici
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        fetch('http://parcours-s07-codesieg/S07-parcours-v2.5-codesieg/backend/public/videogames/' + $gameId + '/reviews', config)
            // Ensuite, lorsqu'on reçoit la réponse au format JSON
            .then(function(response) {
                // On convertit cette réponse en un objet JS et on le retourne
                // console.log(response);
                return response.json();
            })
            .then(function(data) {
                console.log(data);

                app.createDOMElement(data);
            });
    },



    displayGamesInSelectElement: function(gamesList) {
        // pour chacune des categories, nous allons ajouter une option dans le select
        let selectElement = document.querySelector('#videogameId');
        console.log(gamesList);
        for (let game of gamesList) {
            // on crée un élément option
            let optionElement = document.createElement('option');
            // on le customize (on renseigne le nom de la categorie)
            optionElement.textContent = game.name;
            console.log(game.name);
            optionElement.setAttribute('value', game.id);
            // on injecte l'opption dans le select
            selectElement.appendChild(optionElement);
        }

    },


    createDOMElement: function(reviewsList) {
        let reviewElement = document.querySelector('#review');
        reviewElement.textContent = "";
        for (let review of reviewsList) {
            // ciblage du template HTML correspondant à une review
            let template = document.getElementById('reviewTemplate');
            // console.log(template);

            // création d'une copie du template pour pouvoir travailler dessus
            // et renseigner les infos de la nouvelle review.
            let templateForReview = template.content.cloneNode(true);
            // remplacer les valeurs dans la copie du template
            templateForReview.querySelector('.reviewPublication').textContent = review.created_at;
            templateForReview.querySelector('.reviewAuthor').textContent = review.author;
            templateForReview.querySelector('.reviewTitle').textContent = review.title;
            templateForReview.querySelector('.reviewText').textContent = review.text;
            templateForReview.querySelector('.reviewDisplay').textContent = review.display_note;
            templateForReview.querySelector('.reviewGameplay').textContent = review.gameplay_note;
            templateForReview.querySelector('.reviewScenario').textContent = review.scenario_note;
            templateForReview.querySelector('.reviewLifetime').textContent = review.lifetime_note;
            // console.log(reviewElement);
            // attache du template à ma page
            reviewElement.appendChild(templateForReview);
        }


    },


};

document.addEventListener('DOMContentLoaded', app.init);