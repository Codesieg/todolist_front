console.log('%c' + 'taskForm.js chargé', 'color: #f0f; font-size: 1rem; background-color:#fff');
const taskForm = {

    addAllEventListeners: function() {
        // cibler le form
        let formElement = document.querySelector('.task--add form')
            // ajouter écouteur d'évenement sur "submit"
        formElement.addEventListener('submit', taskForm.handleFormSubmit);
    },

    handleFormSubmit: function(event) {
        // empecher le comportement par défaut (envoie des datas/refresh de la page)
        event.preventDefault();
        // recupération du nom de la tache saisie par le user
        let taskNewNameElement = document.querySelector('.task__name-edit');
        //récupération de la valeur saisie par l'utilisateur
        let taskNewName = taskNewNameElement.value;
        console.log(taskNewName);

        let selectCategoriesElement = document.querySelector('.task__category select')
        let categoryName = selectCategoriesElement.value;

        //appel de la méthode permettant de créer le DOM pour une nouvelle tâche


        // appel à l'api pour ajouter une tache à notre bdd


        let data = {
            'title': taskNewName,
            'categoryId': categoryName,
            'status': 0,
            'completion': 0,
        };

        // data['title'] = taskNewName;
        // data['category_id'] = categoryName;


        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://s07-e04-backend-codesieg/tasks';
        fetch(url, fetchOptions)
            .then(
                function(reponse) {
                    console.log(reponse);
                    return reponse.json()
                })
            .then(
                function(data) {
                    console.log(data)
                    let taskElement = task.createDOMElement(taskNewName, categoryName);

                    // appel de la méthode qui permet d'ajouter la tache dans le DOM (dans la LISTE DES TACHES)
                    tasksList.addTaskInDOM(taskElement);
                });
    }





}