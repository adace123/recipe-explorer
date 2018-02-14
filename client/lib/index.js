'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _RecipeApp = require('./components/RecipeApp');

var _RecipeApp2 = _interopRequireDefault(_RecipeApp);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _registerServiceWorker = require('./registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_RecipeApp2.default, { store: _store2.default }), document.getElementById('root'));
(0, _registerServiceWorker2.default)();