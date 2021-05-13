const $imageUrl=$('#image');
const displayImage=$('#display-img');

if (! displayImage.attr('src')) {
    displayImage.attr('src',$imageUrl.val());
}

function updateImage() {
    const urlText=$imageUrl.val();
    displayImage.attr('src',urlText);
}

$imageUrl.on('change',updateImage);