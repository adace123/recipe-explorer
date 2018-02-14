'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../styles/Recipe.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recipe = function (_Component) {
    _inherits(Recipe, _Component);

    function Recipe(props) {
        _classCallCheck(this, Recipe);

        var _this = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

        _this.state = {};

        return _this;
    }

    _createClass(Recipe, [{
        key: 'render',
        value: function render() {
            var ingredients = this.props.ingredients.map(function (ingredient, index) {
                return _react2.default.createElement(
                    'li',
                    { key: index },
                    ingredient
                );
            });
            return _react2.default.createElement(
                'div',
                { className: 'recipe' },
                _react2.default.createElement('img', { src: this.props.imageURL, alt: 'recipe' }),
                _react2.default.createElement(
                    'div',
                    { className: 'overlay' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        this.props.title
                    )
                )
            );
        }
    }]);

    return Recipe;
}(_react.Component);

exports.default = Recipe;