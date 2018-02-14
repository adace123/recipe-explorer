'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

require('../styles/navbar.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = (0, _mobxReact.observer)(function (_Component) {
    _inherits(Navbar, _Component);

    function Navbar(props) {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

        setInterval(function () {
            _this.props.store.incrementCounter();
        }, 1000);
        _this.state = {
            show: {},
            hide: {
                maxHeight: 0

            },
            showing: false
        };
        return _this;
    }

    _createClass(Navbar, [{
        key: 'openModal',
        value: function openModal() {
            // this.props.store.modalIsOpen = ;
            this.props.store.openModal();
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu() {
            this.setState({ showing: !this.state.showing });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'nav-container' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        'Recipe App'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            { onClick: this.openModal.bind(this) },
                            _react2.default.createElement(
                                'a',
                                null,
                                'Add Recipe'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                null,
                                'Home'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                null,
                                this.props.store.counter.value
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                null,
                                'Contact Us'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { id: 'hamburger', onClick: this.toggleMenu.bind(this) },
                            _react2.default.createElement(
                                'div',
                                { className: 'bar-container' },
                                _react2.default.createElement('div', { className: 'bar' }),
                                _react2.default.createElement('div', { className: 'bar' }),
                                _react2.default.createElement('div', { className: 'bar' })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { id: 'mobile-menu', style: this.state.showing ? this.state.show : this.state.hide },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'New Recipe'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'Home'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'About'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'a',
                            { href: '#' },
                            'Contact Us'
                        )
                    )
                )
            );
        }
    }]);

    return Navbar;
}(_react.Component));