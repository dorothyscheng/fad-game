function editReviewStars() {
    const ratingEl = document.getElementById('rating');
    const rating=ratingEl.getAttribute('value');
    for (let i=0; i<rating; i++) {
        const currentStar=document.getElementById(`star${i}`);
        currentStar.classList.add('filled');
    };
};
editReviewStars();