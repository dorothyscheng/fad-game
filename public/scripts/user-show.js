function editReviewStars(x) {
    const ratingEl = document.getElementById(`rating${x}`);
    const rating=ratingEl.getAttribute(`value`);
    for (let i=0; i<rating; i++) {
        const currentStar=document.getElementById(`star${i}${x}`);
        currentStar.classList.add('filled');
    };
};

function iterateGameReviews() {
    const gameEl = document.querySelectorAll('.game-link');
    for (let i=0; i<gameEl.length; i++) {
        editReviewStars(i);
    }
}

iterateGameReviews();