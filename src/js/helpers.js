/* библиотека функций-хэлперов */
function formatDate(time) {
    let now = [time.getHours(), time.getMinutes()];

    for (let i = 0; i < now.length; i++) {
        if (now[i] < 10) {
            now[i] = '0' + now[i];
        }
    }

    return now[0] + ':' + now[1];
}

function readURL(e) {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('#upload-img').setAttribute('src', e.target.result);
            document.querySelector('#upload-img').style.display = 'block';
            let cropTemplate = require('../templates/cropImage.hbs');
            let crop = cropTemplate({ img: e.target.result });
            document.querySelector('.uploadPhoto').innerHTML = crop;
            document.querySelector('.uploadPhoto').classList.add('crop');
        };
        reader.readAsDataURL(this.files[0]);
    }
}

export {
    formatDate,
    readURL
};