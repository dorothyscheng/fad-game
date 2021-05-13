const $imageUrl=$('#gameImage');

function updateImage() {
    const urlText=$imageUrl.val();
    const displayImage=$('#display-game-img');
    displayImage.attr('src',urlText);
}


$imageUrl.on('change',updateImage);