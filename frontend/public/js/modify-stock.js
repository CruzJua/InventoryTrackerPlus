const fileInput = document.getElementById('image');
const previewImg = document.querySelector('.image-preview img');

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        if (previewImg) {
            previewImg.src = e.target.result;
        } else {
            const div = document.createElement('div');
            div.className = 'image-preview';
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'New image preview';
            div.appendChild(img);
            fileInput.closest('form').before(div);
        }
    };
    reader.readAsDataURL(file);
});
