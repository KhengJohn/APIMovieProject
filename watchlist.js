if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
    ready();
}

function ready () {
    const removeCartItemButtons = document.getElementsByClassName('btn-remove');
    console.log(removeCartItemButtons);
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem )
    }  
    

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
}

