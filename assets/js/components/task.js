console.log('%c' + 'tasks.js chargé', 'color: #f0f; font-size: 1rem; background-color:#fff');

const task = {

    addAllEventListeners: function(taskElement) {

        // ciblage du nom de la tache
        let taskNameElement = taskElement.querySelector('.task__name-display');
        taskNameElement.addEventListener('click', task.handleClickOnTaskName);

        // ciblage du bouton d'édition de la tâche
        let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
        taskEditButtonElement.addEventListener('click', task.handleClickOnEditButton);

        // ciblage de l'input d'édition du nom de la tache
        let taskInputNameElement = taskElement.querySelector('.task__name-edit');
        taskInputNameElement.addEventListener('blur', task.handleBlurOnTaskInputName);
        //on surveille les frappes de clavier (le moment ou on relache la touche)
        taskInputNameElement.addEventListener('keyup', task.handleKeyUpOnTaskInputName);

        //ciblage du bouton pour mettre une tache en status terminé
        let validateButtonElement = taskElement.querySelector('.task__button--validate');
        validateButtonElement.addEventListener('click', task.handleClickOnValidateButtonElement);

        //ciblage du bouton pour incompléter la tâche
        let incompleteButtonElement = taskElement.querySelector('.task__button--incomplete');
        incompleteButtonElement.addEventListener('click', task.handleClickOnIncompleteButtonElement);

        //ciblage du bouton tache archiver
        let archivedButtonElement = taskElement.querySelector('.task__button--archive');
        archivedButtonElement.addEventListener('click', task.handleClikOnArchiveButtonElement);

        //ciblage du bouton tache desarchiver
        let unArchivedButtonElement = taskElement.querySelector('.task__button--desarchive');
        unArchivedButtonElement.addEventListener('click', task.handleClikOnUnArchiveButtonElement);
    },

    handleClikOnUnArchiveButtonElement: function(event) {
        let unarchivedButtonElement = event.currentTarget;
        let taskElement = unarchivedButtonElement.closest('.task');
        console.log('tache non archivée');


        // taskElement.classList.remove('task--complete');

        const taskId = taskElement.dataset.taskId;
        console.log(taskId);

        let data = {
            'status': 1, // la tache n'est pas archivée
        }


        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(data) // On modifie les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://s07-e04-backend-codesieg/tasks/' + taskId;
        fetch(url, fetchOptions)
            .then(
                function(reponse) {
                    //console.log(reponse.status);
                    if (reponse.status == 200) {
                        console.log("tache desarchivée");
                        return reponse.json();
                    } else {
                        console.log("erreur modification du statut");
                    }
                })
            .then(
                function(data) {
                    console.log(data);
                    taskElement.classList.remove('task--archive');
                    taskElement.classList.add('task--todo');

                });
        return taskElement;
    },

    handleClikOnArchiveButtonElement: function(event) {
        let archivedButtonElement = event.currentTarget;
        let taskElement = archivedButtonElement.closest('.task');


        // taskElement.classList.remove('task--complete');

        const taskId = taskElement.dataset.taskId;
        console.log(taskId);

        let data = {
            'status': 2, // la tache est archivées
        }

        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(data) // On modifie les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://s07-e04-backend-codesieg/tasks/' + taskId;
        fetch(url, fetchOptions)
            .then(
                function(reponse) {
                    console.log(reponse.status);
                    if (reponse.status == 200) {
                        console.log("tache archivée");
                        return reponse.json();
                    } else {
                        console.log("erreur modification du statut");
                    }
                })
            .then(
                function(data) {

                    console.log(data);
                    taskElement.classList.add('task--archive');
                    taskElement.classList.remove('task--todo');

                });
        return taskElement;
    },

    handleClickOnIncompleteButtonElement: function(event) {
        let incompleteButtonElement = event.currentTarget;
        let taskElement = incompleteButtonElement.closest('.task');

        taskElement.classList.add('task--todo');
        taskElement.classList.remove('task--complete');

        const taskId = taskElement.dataset.taskId;

        task.setCompletion(taskId, taskElement, 0);

    },

    handleClickOnValidateButtonElement: function(event) {
        //alert('Validate');
        // récupération du bouton validation (qui a déclenché l'event)
        let validateButtonElement = event.currentTarget;
        let taskElement = validateButtonElement.closest('.task');
        // une fois que l'élement du DOM correspondant a une tache
        // a été récupété, nous lui appliquons les bonnes classes CSS
        taskElement.classList.add('task--complete');
        taskElement.classList.remove('task--todo');
        // bonus
        // taskElement.classList.replace('task--todo', 'task--complete');
        // récupération de l'id de la tâche
        const taskId = taskElement.dataset.taskId;

        task.setCompletion(taskId, taskElement, 100);

        // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache


    },

    handleClickOnTaskName: function(event) {
        // récupération de l'élément ayant déclenché l'event
        let taskNameElement = event.currentTarget;
        console.log(taskNameElement);

        // récupération de l'élément "ancêtre" le plus proche
        // ayant la classe "task"
        let taskElement = taskNameElement.closest('.task');
        //console.log(taskElement);
        // une fois l'élément tâche récupéré
        // nous lui ajoutons la classe CSS 'task--edit'
        taskElement.classList.add('task--edit');
        // ciblage de l'input d'édition de la tache
        let taskNameInputElement = taskElement.querySelector('.task__name-edit');
        //console.log(taskNameInputElement);
        taskNameInputElement.focus();

        // BONUS placer le cuseur à la fin de l'input
        // récupérer la taille de texte dans l'input
        let length = taskNameInputElement.value.length;
        // on placer le cuseur  la fin de l'input (on débute une
        //selection à la fin de l'input; et on arrete la selection à la fin de l'input ; ça fait une selection vide !!)
        taskNameInputElement.setSelectionRange(length, length);
    },

    handleClickOnEditButton: function(event) {
        //alert('clic edit tache');
        task.handleClickOnTaskName(event);
    },

    handleBlurOnTaskInputName: function(event) {
        //alert('blur');
        //récupération de la valeur saisie par l'utilisateur
        let taskInputNameElement = event.currentTarget;
        let taskNewName = taskInputNameElement.value;
        // récupération de l'élément "ancêtre" le plus proche
        // ayant la classe "task"
        let taskElement = taskInputNameElement.closest('.task');
        //console.log(taskElement);

        //ciblage de l'élément affichant le nom de la tâche (le p)
        let taskNameElement = taskElement.querySelector('.task__name-display');
        // mise à jour du contenu texte de l'élement affichant le nom de la tache
        taskNameElement.textContent = taskNewName;

        // on retire la classe CSS task--edit de l'élement task
        taskElement.classList.remove('task--edit');

    },

    handleKeyUpOnTaskInputName: function(event) {
        // event.key nous permet de récupérér le nom de la touche qui a été pressé
        console.log(event.key);
        if (event.key === 'Enter') {
            // on appelle le meme callback quie lorsuq'il y a un event blur sur l'input
            task.handleBlurOnTaskInputName(event);
        }

    },

    createDOMElement: function(taskName, taskCategoryName) {
        //ciblage du template HTML correspondant à une tache
        let template = document.getElementById('task-template');

        // création d'une copie du template pour pouvoir travailler dessus
        // et renseigner les infos de la nouvelle tache.
        let templateForNewTask = template.content.cloneNode(true);

        // remplacer les valeurs dans la copie du template
        // ci dessous cf data-category dans les task
        templateForNewTask.querySelector('.task').dataset.category = taskCategoryName;
        templateForNewTask.querySelector('.task__category p').textContent = taskCategoryName;

        // remplacement du nom de la tâche dans la copie du template
        templateForNewTask.querySelector('.task__name-display').textContent = taskName;

        // input ...
        templateForNewTask.querySelector('.task__name-edit').setAttribute('value', taskName);
        //templateForNewTask.querySelector('.task__name-edit').value = taskName;

        // on enrgistre tous les events sur l'élement du DOM que nous venons de créer
        task.addAllEventListeners(templateForNewTask);

        return templateForNewTask;

    },

    setStatus: function(taskElement, status) {
        //! MERCI LAURENT !
        taskElement.querySelector('.task').classList.replace('task--todo', 'task--' + status);
        //return taskElement;
    },

    addCompletion: function(taskElement) {
        taskElement.querySelector('.task').classList.replace('task--todo', 'task--complete');
    },

    setCompletion: function(taskId, taskElement, completion) {

        let data = {
            'completion': completion, // la tache est terminée
        }

        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(data) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://s07-e04-backend-codesieg/tasks/' + taskId;
        fetch(url, fetchOptions)
            .then(
                function(reponse) {
                    return reponse.json();
                })
            .then(
                function(data) {
                    console.log(data);
                    let progressBar = taskElement.querySelector('.progress-bar__level');
                    progressBar.style.width = completion + '%';
                });
        return taskElement;
    },

    getCompletion: function(taskElement, completion) {
        let progressBar = taskElement.querySelector('.progress-bar__level');
        progressBar.style.width = completion + '%';
        return taskElement;
    },

    setId: function(taskElement, id) {
        taskElement.querySelector('.task').dataset.taskId = id;
        //return taskElement;
    }

}