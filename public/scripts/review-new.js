const stars=document.querySelectorAll('.fa-star');

function newReviewStars(e) {
    for (let i=0; i<stars.length; i++) {
        const currentStar=document.getElementById(`star${i}`);
        currentStar.classList.remove('filled');
    };
    selectedStar=e.target;
    selectedStarId=selectedStar.id;
    selectedIndex=Number(selectedStarId.slice(4));
    for (let i=0; i<=selectedIndex; i++) {
        const currentStar=document.getElementById(`star${i}`);
        currentStar.classList.add('filled');
    };
    const ratingInput = document.getElementById('rating');
    ratingInput.setAttribute('value',selectedIndex+1);
};
stars.forEach(element=>{
    element.addEventListener('click',newReviewStars);
})