//je recupere les produits dans le localstorage
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem('product'));
console.log(productInLocalStorage);
//j'affiche les produits sur la page
const cartAndFormContainer = document.getElementById('cartAndFormContainer');
// si les panier est vide
if(productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML =`
  <div class="cart__empty">
    <p>Vous n'avez pas de Kanap dans votre panier :( ! <br> Veuillez selectionner vos produit depuis la page d'acceuil !</p>
  </div>`;
}
// si le panier n'est pas vide : afficher les produits dans le localStorage
else  {
let itemCards = [];
// "for" déclare une variable i, verifie que i est bien inferieur au nombre d'options
// puis passe a l'option suivante en incrémentant i a chaque iteration
for (i = 0; i < productInLocalStorage.length; i++) { //for ([expressionInitiale]; [condition]; [expressionIncrément])
products.push(productInLocalStorage[i].id);
// la ce code va s'ajouter a chaque boucle
itemCards = itemCards + `  
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].name}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  `;
}
if (i === productInLocalStorage.length) {
  const itemCart = document.getElementById('cart__items');
  itemCart.innerHTML += itemCards;
  }
//je dois pouvoir modifier la quantité dans le panier
function changeQuantity() {
    let itemQuantity = document.getElementsByClassName('itemQuantity');
    for (let n = 0; n < itemQuantity.length; n++) {
        itemQuantity[n].addEventListener('change', (event) => {
        event.preventDefault();
        // je vais devoir faire un nouveau tableau avec la nouvelle quantité
        let itemWithNewQuantity = itemQuantity[n].value;
        const newLocalStorage = {
            id: productInLocalStorage[n].id,
            image: productInLocalStorage[n].image,
            alt: productInLocalStorage[n].alt,
            name: productInLocalStorage[n].name,
            color: productInLocalStorage[n].color,
            price: productInLocalStorage[n].price,   
            quantity: itemWithNewQuantity, 
        };
        // je remplace le localstorage avec les nouvelles valeurs
        productInLocalStorage[n] = newLocalStorage;
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        })
    }
}
changeQuantity();

// je dois aussi pouvoir supprimer un article
function deleteProduct() {
    const deleteItem = document.getElementsByClassName('deleteItem');
    for (let a = 0; a < deleteItem.length; a++) { 
        deleteItem[a].addEventListener('click', (event) => {
        event.preventDefault();
    
        // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        let deleteId = productInLocalStorage[a].id;
        let deleteColor = productInLocalStorage[a].color;
    
        /* avec la methode filter je selectione les elements a garder et je supprime 
        l'élément ou le bouton a été cliqué grace au !== qui inverse */
        productInLocalStorage = productInLocalStorage.filter( el => el.id !== deleteId || el.color !== deleteColor);      
        // je met à jour le localstorage
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
    
        // Je créer une alerte pour dire que le Kanap a bien été supprimé et je recharge la page
        alert('Votre Kanap a bien été supprimé !');
        window.location.href = "cart.html";
        });
      }
    }
deleteProduct(); 

function totalArticles() {
    let totalItems = 0;
    for (l in productInLocalStorage) {
      // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
      // et renvoie un entier (parseInteger), sur la base décimale de 10
      const newQuantity = parseInt(productInLocalStorage[l].quantity, 10);
  
      // attribuer la valeur retournée de parseInt à la variable totalItems
      totalItems += newQuantity;
    }
      // attribuer à totalQuantity la valeur de totalItems et l'afficher dans le DOM
      const totalQuantity = document.getElementById('totalQuantity');
      totalQuantity.textContent = totalItems;
  }
totalArticles();

function priceAmount() {
  const calculPrice = [];
  for (m = 0; m < productInLocalStorage.length; m++) {
    // prix de l'item = quantité * prix
    const cartAmount = productInLocalStorage[m].price * productInLocalStorage[m].quantity;
    calculPrice.push(cartAmount);

    // la fonction reduce() permet de garder en mémoire les résultats de l'opération
    const reduce = (previousValue, currentValue) => previousValue + currentValue;
    total = calculPrice.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;
}
priceAmount();
}



// j'envoie le formulaire dans le serveur
function postForm() {
  const order = document.getElementById('order');
  order.addEventListener('click', (event) => {
  event.preventDefault();

  // je récupère les données du formulaire dans un objet
  const contact = {
    firstName : document.getElementById('firstName').value,
    lastName : document.getElementById('lastName').value,
    address : document.getElementById('address').value,
    city : document.getElementById('city').value,
    email : document.getElementById('email').value
  }
    //contrôle prénom
     function formFirstName() {
        const validFirstName = contact.firstName;
        if (/^[a-zA-Z-]{2,20}$/.test(validFirstName)) {  //ce regex autorise uniquement un prénom avec des lettres minuscules ou maj + un " - " entre 2 et 20 caractères
          return true;
        } else {
          let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
          firstNameErrorMsg.innerText = "Prénom invalide";
        }
      };

    // contrôle nom
    function formName() {
      const validName = contact.lastName;
      if (/^[a-zA-Z\s-]{2,20}$/.test(validName)) { // meme chose + un espace
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
        lastNameErrorMsg.innerText = "Nom invalide";
      }
    };

    // contrôle adresse
    function formAddress() {
      const validAddress = contact.address;
      if (/^[a-zA-Z0-9\s-]{2,50}$/.test(validAddress)) { // meme chose + chiffres
        return true;
      } else {
        let addressErrorMsg = document.getElementById('addressErrorMsg');
        addressErrorMsg.innerText = "addresse invalide";
      }
    };

    // contrôle ville
    function formCity() {
      const validAddress = contact.city;
      if (/^[a-zA-Z-\s-]{2,20}$/.test(validAddress)) {
        return true;
      } else {
        let cityErrorMsg = document.getElementById('cityErrorMsg');
        cityErrorMsg.innerText = "Ville invalide";
      }
    };

    // contrôle email
    function formEmail() {
      const validEmail = contact.email;
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) { // ici on autorise  "texte/chiffres" " @ " " "texte/chiffres" puis nom de domaine avec un " . " et des lettres entre 2 et 4 caractères
        return true;
      } else {
        let emailErrorMsg = document.getElementById('emailErrorMsg');
        emailErrorMsg.innerText = "Mail invalide";
      }
    };
// fonction qui empeche l'envoie du formulaire si le panier est vide 
function cartState() {
 if (productInLocalStorage === null || productInLocalStorage == 0){
  return false;
} else {
  return true;
}
}
// je vérifie les différentes infos récupéré, que j'envoie dans le localStorage
function formControl() {
  if (formFirstName() && formName() && formAddress() && formCity() && formEmail() && cartState()) {
    localStorage.setItem('contact', JSON.stringify(contact));
    return true;
  } else {
      alert('Une erreur est survenue, merci de vérifier vos informations')
    }
};
formControl()

// je mets les données récupéré + les produits dans un objet
  const formData = {
    contact,
    products,
  }

 // J'envoie toutes ces données au serveur avec la méthode POST

  const formAndCheckout = {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 
      'Content-Type': 'application/json',
    }
  };

  fetch("http://localhost:3000/api/products/order", formAndCheckout)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('orderId', data.orderId);
        if (formControl()) {
          document.location.href = 'confirmation.html?id='+ data.orderId;
        }
    });
})
} 
postForm()