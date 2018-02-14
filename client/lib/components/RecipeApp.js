'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('../styles/Recipe.css');

require('../styles/index.css');

var _Navbar = require('../components/Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Recipe = require('../components/Recipe');

var _Recipe2 = _interopRequireDefault(_Recipe);

var _NewRecipeForm = require('../components/NewRecipeForm');

var _NewRecipeForm2 = _interopRequireDefault(_NewRecipeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeApp = (_temp = _class = function (_Component) {
    _inherits(RecipeApp, _Component);

    function RecipeApp(props) {
        _classCallCheck(this, RecipeApp);

        var _this = _possibleConstructorReturn(this, (RecipeApp.__proto__ || Object.getPrototypeOf(RecipeApp)).call(this, props));

        _this.state = {
            showing: false
        };
        return _this;
    }

    _createClass(RecipeApp, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_Navbar2.default, { store: _store2.default }),
                _react2.default.createElement(_NewRecipeForm2.default, { store: _store2.default }),
                _react2.default.createElement(
                    'div',
                    { className: 'recipe-list' },
                    this.props.recipes.map(function (recipe, index) {
                        return _react2.default.createElement(_Recipe2.default, _extends({ key: index }, recipe));
                    })
                )
            );
        }
    }]);

    return RecipeApp;
}(_react.Component), _class.defaultProps = {
    recipes: [{
        instructions: "Open jar of spaghetti sauce. Bring to simmer. Boil water Cook pasta until done. Combine pasta and sauce.",
        ingredients: ["pasta", "8 cups water", "1 box of spaghetti"],
        imageURL: "https://images.pexels.com/photos/41320/beef-cheese-cuisine-delicious-41320.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        title: "Spaghetti",
        time: '1 hour 15 mins.'
    }, {
        instructions: "Combine ice cream and milk. Blend until creamy.",
        ingredients: ["2 scoops ice cream", "8 ounces milk"],
        imageURL: "https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        title: "Milkshake",
        time: '15 mins'
    }, {
        instructions: "Toast bread. Slice avocado and spread on bread. Add salt, oil and pepper to taste.",
        ingredients: ["2 slice of bread", "1 avocado", "1 tablespoon of olive oil", "1 pinch of salt", "pepper"],
        imageURL: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        title: "Avocado Toast",
        time: '1/2 hour'
    }, {
        instructions: "Toast bread. Slice avocado and spread on bread. Add salt, oil and pepper to taste.",
        ingredients: ["2 slice of bread", "1 avocado", "1 tablespoon of olive oil", "1 pinch of salt", "pepper"],
        imageURL: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        title: "Avocado Toast",
        time: '1/2 hour'
    }]
}, _class.propTypes = {
    recipes: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
}, _temp);
exports.default = RecipeApp;