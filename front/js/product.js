//recuperation de l'ID du produit
let params = new URLSearchParams(window.location.search); //URLSearchParams et après avec get me permet de récuperer dans l'url le produit 
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
  let addProductInLocalStorage = () => {
    productInLocalStorage.push(selectedProduct);
    localStorage.setItem('product', JSON.stringify(productInLocalStorage));
  }
  let itemAddedInCart = () => {
    alert('Votre Kanap a été ajouté dans le panier !');
  }
  //cette fonction verifie si on a selectionné une couleur et si on a mis la bonne quantité 
  let getQuantValue= () => { 
    let colorVal= colorSelect.value;
    if (itemQuantity.value <= 100 &&  !colorVal==''){
      return true;
  } else {
      alert('Veuillez saisir une couleur et une quantité entre 1 et 100'); 
      return false;}
  }
  
  let update = false;
  if (productInLocalStorage && getQuantValue()) {                   // si j'ai deja un produit dans le local storage et si ma quantité est en dessous de 100 + couleur selectionée
    productInLocalStorage.forEach (function (productCheck, key) {
     if (productCheck.id == itemId &&                 // verification si il n'y a pas le même article dans le local storage en verifiant ID + couleur 
      productCheck.color == colorSelect.value) {
        productInLocalStorage[key].quantity = parseInt(productCheck.quantity) + parseInt(selectQuantity.value);
        localStorage.setItem('product', JSON.stringify(productInLocalStorage));
        update = true;
        itemAddedInCart();
      }
    });
    if (!update) { // ! est un operateur de NON logique = l'inverse
      addProductInLocalStorage();
      itemAddedInCart();
    }
  }
  else if (getQuantValue()) { // si je n'ai pas de produit dans le localstorage
    productInLocalStorage = []; //je créer un tableau vide pour y mettre le produit 
    addProductInLocalStorage();
    itemAddedInCart();         
  }
  });
