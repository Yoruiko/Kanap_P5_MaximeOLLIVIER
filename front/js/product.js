//recuperation de l'ID du produit
let params = new URLSearchParams(window.location.search);
let itemId= params.get('id');

//creation des constantes des caractéristiques du produit
const itemImage = document.getElementsByClassName('item__img');
const itemTitle = document.getElementById('title');
const itemPrice = document.getElementById('price');
const itemDescription = document.getElementById('description');
const itemColors = document.getElementById('colors');
let imageURL= ""; //ajout de imageURL pour l'affiche dans le panier

// requete fetch pour récuperer le produit dans la base de données
fetch('http://localhost:3000/api/products/'+itemId) //rajout de itemID pour avoir le produit selectionné
    .then(res => res.json())
    .then(data => {
        itemImage[0].innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        imageURL = data.imageUrl;
        itemTitle.innerHTML = `<h1>${data.name}</h1>`;
        itemPrice.innerText = `${data.price}`;
        itemDescription.innerText = `${data.description}`;
        for (number in data.colors) { // for/in puisque color dans la doc est de type array of string
            colors.options[colors.options.length] = new Option(
              data.colors[number],
              data.colors[number]
            );
          }
    })
    .catch(err => {
      alert('Error');
  });
// mise en variable des choix de l'utilisateur
const itemQuantity = document.getElementById('quantity');
const colorSelect = document.getElementById('colors');

//Ajouter l'article au panier
  const addToCart = document.getElementById('addToCart');
  //Ecoute du bouton et envoie au panier
  addToCart.addEventListener("click", (event)=>{
    event.preventDefault();
    //récupération des valeurs
    let selectedProduct = {
      name: itemTitle.textContent,
      id: itemId,
      price: itemPrice.textContent,
      color: colorSelect.value,
      quantity: itemQuantity.value,
      image: imageURL,
    }
  console.log(selectedProduct);
  //le local storage-------------------------------------------------------
  // stockage des valeurs dans le local storage
  // déclaration de la variable ou on va mettre les key et value
  let productInLocalStorage = JSON.parse(localStorage.getItem('product')); //JSON.parse convertit les données JSON du local storage en objet Javascript
  // verification si il ya deja le produit enregistré dans le local storage ou non
  let addProductInLocalStorage = () => {
    productInLocalStorage.push(selectedProduct);
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }
  let itemAddedInCart = () => {
    alert('Votre Kanap a été ajouté dans le panier !');
  }
  let update = false;
  if (productInLocalStorage) {
    productInLocalStorage.forEach (function (productCheck, key) {
     if (productCheck.id == itemId && productCheck.color == colorSelect.value) {
        productInLocalStorage[key].quantity = parseInt(productCheck.quantity) + parseInt(selectQuantity.value);
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        update = true;
        itemAddedInCart();
      }
    });
    if (!update) { // operateur de NON logique
      addProductInLocalStorage();
      itemAddedInCart();
    }
  }
  else {
    productInLocalStorage = []; //je créer un tableau vide 
    addProductInLocalStorage(); //je met dans ce tableau le contenu de mon selectedProduct
    itemAddedInCart();//je créer la clé produit que je convertis en JSON pour le local storage
  }
  });
