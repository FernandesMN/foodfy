const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const linksHeader = document.querySelector('.links');

for (let card of cards) {
    card.addEventListener('click', function() {
        const idCard = card.getAttribute('id');
        const textCard = card.querySelector('p').innerText;
        const titleCard = card.querySelector('h2').innerText;

        modalOverlay.classList.add('active');
        modalOverlay.querySelector('img').src = `./assets/${idCard}`;
        modalOverlay.querySelector('h2').innerText = titleCard;
        modalOverlay.querySelector('p').innerText = textCard;
    });
};

document.querySelector('.close-modal').addEventListener('click',function(){
    modalOverlay.classList.remove('active');
    modalOverlay.querySelector('iframe').src = '';
});