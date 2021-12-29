function confirmation() {
    let params = new URLSearchParams(window.location.search); //URLSearchParams et après avec get me permet de récuperer dans l'url le produit 
    let orderId= params.get('id');
    const confirm = document.getElementById("orderId");
    confirm.innerHTML += `${orderId}`
    localStorage.clear();
};
confirmation();
