const ingredient = document.querySelector('.ingredient-recipe');
const preparation = document.querySelector('.preparation-recipe');
const information = document.querySelector('.additional-information-recipe');

function toHide(content) {
    if(content.classList.contains('active')){
        content.classList.remove('active');
    }else {
        content.classList.add('active');
    }
}

document.querySelector('.to_hide-ingredient').addEventListener("click", function() {
    toHide(ingredient);
});

document.querySelector('.to_hide-preparation').addEventListener("click", function() {
    toHide(preparation);
});

document.querySelector('.to_hide-information').addEventListener("click", function() {
    toHide(information);
});