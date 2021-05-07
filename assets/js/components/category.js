// const category = {

//     loadCategories: function() {
//         let config = {
//             method: 'GET',
//             mode: 'cors',
//             cache: 'no-cache'
//         };
//         // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
//         fetch('https://benoclock.github.io/S07-todolist/categories.json', config)
//             // Ensuite, lorsqu'on reçoit la réponse au format JSON
//             .then(function(response) {
//                 // On convertit cette réponse en un objet JS et on le retourne
//                 console.log(response);
//                 return response.json();
//             })
//             .then(function(data) {
//                 console.log(data);
//                 for (let i = 0; i < data.length; i++) {
//                     console.log(data[i].name);
//                     let selectCategoriesElement = document.querySelector(".filters__task select");
//                     let newOptionElement = document.createElement("option");
//                     newOptionElement.textContent = data[i].name;
//                     selectCategoriesElement.appendChild(newOptionElement);
//                     let selectFormCategoriesElement = document.querySelector(".task__category select");
//                     let newFormOptionElement = document.createElement("option");
//                     newFormOptionElement.textContent = data[i].name;
//                     selectFormCategoriesElement.appendChild(newFormOptionElement);
//                 }
//             });
//     }
// }