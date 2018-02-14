'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = require('mobx');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModalStore = function () {
    function ModalStore() {
        _classCallCheck(this, ModalStore);

        this.modalIsOpen = (0, _mobx.observable)(false);
        this.counter = (0, _mobx.observable)(0);
    }

    _createClass(ModalStore, [{
        key: 'incrementCounter',
        value: function incrementCounter() {
            this.counter.value++;
        }
    }, {
        key: 'closeModal',
        value: function closeModal() {
            this.modalIsOpen.value = false;
        }
    }, {
        key: 'openModal',
        value: function openModal() {
            console.log('open');
            this.modalIsOpen.value = true;
        }
    }]);

    return ModalStore;
}();

exports.default = new ModalStore();