class Chat {

    constructor() {
        this.autorize = document.querySelector('.authorize');
        this.chatBlock = document.querySelector('.chat');
        this.imageload = document.querySelector('.imageLoad');
        this.form = document.querySelector('.message');
        this.messgeElem = document.querySelector('.chat__list');
        this.autorizeForm = document.querySelector('.authorize__form');
        this.userName = document.querySelector('.uploadPhoto__name');
        this.uploadBlock = document.querySelector('.uploadPhoto');
        this.upload = document.querySelector('.uploadPhoto__upload');
        this.uploadPhoto = document.querySelector('#upload');
        this.savePhoto = document.querySelector('.button__safe');
        this.wrapper = document.querySelector('.wrapper');
    }

    addMessage(nik, date, img, message, selector) {
        let messageElem = document.createElement('div');
        messageElem.textContent = message;
        let messageTemplate = require('../templates/message.hbs');;
        let messageItem = messageTemplate({ nik: nik, text: message, time: date, img: img });
        selector.innerHTML = selector.innerHTML + messageItem;
        let left = document.querySelector('.chat__item[data-nik="' + nik + '"]');
        console.log(left);
        left.querySelector('.chat__text').textContent = message;
    }

    addUser(nik, img, name, selector) {
        let chatItem = require('../templates/chatLeftItem.hbs');
        let item1 = chatItem({ fio: name, nik: nik, img: img });
        selector.innerHTML = selector.innerHTML + item1;
    }

    reCountMessages(count, selector) {
        selector.textContent = count;
    }

}

export {
    Chat
}