import { formatDate } from './helpers';
import { readURL } from './helpers';
import { Chat } from './chat';

let chat = new Chat();

window.onload = function() {

    let [name, nik, date, img] = ['noname', 'noname', new Date(), 'https://today.ua/wp-content/uploads/2019/11/acfc79e81a538cfda851c7a56b622828__1920x-696x696.jpg'];

    let url = 'ws://localhost:8090';
    let socket = new WebSocket(url);

    socket.onmessage = function(event) {

        let nnn = JSON.parse(event.data);
        let window = document.querySelector('.chat__window');

        if (nnn.type == 'user') {
            chat.messgeElem.innerHTML = '';
            for (let i = 0; i < nnn.items.length; i++) {
                chat.addUser(nnn.items[i].nik, nnn.items[i].img, nnn.items[i].name, chat.messgeElem);
            }

            chat.reCountMessages(nnn.items.length, document.querySelector('.chat__number'));
        } else if (nnn.type == 'messages') {
            window.innerHTML = '';
            for (let i = 0; i < nnn.items.length; i++) {
                console.log(nnn.items[i].nik);
                chat.addMessage(nnn.items[i].nik, nnn.items[i].date, nnn.items[i].img, nnn.items[i].message, window);
            }
        } else {
            console.log(nnn.nik);
            chat.addMessage(nnn.nik, nnn.date, nnn.img, nnn.message, window);
        }
    };

    socket.onclose = event => console.log(`Closed ${event.code}`);

    //загрузка пользователя при авторизации
    chat.autorizeForm.onsubmit = function(e) {
        e.preventDefault();
        name = document.querySelector('.authorize__input[name="name"]').value;
        nik = document.querySelector('.authorize__input[name="nik"]').value;

        [chat.uploadBlock.style.display, chat.autorize.style.display] = ['block', 'none'];

        chat.userName = name;

    };

    chat.uploadPhoto.onchange = readURL;

    chat.wrapper.onclick = function(e) {
        if (e.target.className == 'button__safe') {
            img = chat.uploadBlock.querySelector('.cropImages__image img').getAttribute('src');
            console.log(img);
            [chat.chatBlock.style.display, chat.uploadBlock.style.display] = ['block', 'none'];
            socket.send(JSON.stringify({
                'type': 'new',
                'name': name,
                'img': img,
                'nik': nik
            }));
        }
    }

    chat.upload.onclick = function(e) {
        chat.uploadPhoto.click();
    }

    // отправка сообщения из формы
    chat.form.onsubmit = function(e) {
        e.preventDefault();
        let onemessage = JSON.stringify({
            'name': name,
            'nik': nik,
            'img': img,
            'date': formatDate(date),
            'message': this.message.value,
        })

        socket.send(onemessage);
        this.message.value = '';
    };
}