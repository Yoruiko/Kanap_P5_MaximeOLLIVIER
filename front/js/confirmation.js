function confirmation(){
    const orderId = document.getElementById('orderId');
    orderId.innerHTML = localStorage.getItem('orderId');
    localStorage.clear(); // je vide le localstorage après la commande 
}
confirmation();
