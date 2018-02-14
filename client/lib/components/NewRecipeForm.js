'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _mobxReact = require('mobx-react');

require('../styles/form.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = (0, _mobxReact.observer)(function (_Component) {
  _inherits(NewRecipeForm, _Component);

  function NewRecipeForm() {
    _classCallCheck(this, NewRecipeForm);

    return _possibleConstructorReturn(this, (NewRecipeForm.__proto__ || Object.getPrototypeOf(NewRecipeForm)).call(this));
  }

  _createClass(NewRecipeForm, [{
    key: 'closeModal',
    value: function closeModal() {
      //this.props.store.modalIsOpen = observable(false);
    }
  }, {
    key: 'componentWillReact',
    value: function componentWillReact() {
      console.log("changing");
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'modal-container' },
        _react2.default.createElement(
          _reactModal2.default,
          { isOpen: this.props.store.modalIsOpen.value, className: 'modal' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'h3',
              null,
              'Add a recipe'
            ),
            _react2.default.createElement('i', { className: 'fa fa-times fa-2x', onClick: this.closeModal.bind(this) })
          ),
          _react2.default.createElement(
            'form',
            { className: 'recipe-form' },
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h3',
                null,
                'Name'
              ),
              _react2.default.createElement('input', { id: 'name', placeholder: 'Enter recipe name' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h3',
                null,
                'Ingredients (separate with commas)'
              ),
              _react2.default.createElement('input', { id: 'ingredients', placeholder: 'Enter ingredients' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h3',
                null,
                'Instructions'
              ),
              _react2.default.createElement('textarea', { id: 'instructions', rows: '4', placeholder: 'Recipe instructions' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h3',
                null,
                'Time'
              ),
              _react2.default.createElement('input', { id: 'time', placeholder: 'Estimated time' })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h3',
                null,
                'Image Link'
              ),
              _react2.default.createElement('input', { id: 'url', placeholder: 'Image URL' })
            ),
            _react2.default.createElement(
              'div',
              { id: 'buttons', className: 'form-group' },
              _react2.default.createElement(
                'a',
                { href: '#', id: 'submit' },
                'Submit'
              ),
              _react2.default.createElement(
                'a',
                { href: '#', id: 'cancel' },
                'Cancel'
              )
            )
          )
        )
      );
    }
  }]);

  return NewRecipeForm;
}(_react.Component));