'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Util = require('../Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 16/9/19.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.state = { toggle: false };
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.addEventListener('click', this.clickToClose.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('click', this.clickToClose.bind(this));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            if (this.state.toggle) {
                this.setState(function (old) {
                    old.toggle = false;
                    return old;
                });
            }
        }
    }, {
        key: 'handleToggle',
        value: function handleToggle() {
            this.setState(function (old) {
                old.toggle = !old.toggle;
                return old;
            });
        }
    }, {
        key: 'clickToClose',
        value: function clickToClose(e) {
            var target = this.refs.dropdown;
            if (!(0, _Util.contains)(target, e.target)) {
                this.setState(function (old) {
                    old.toggle = false;
                    return old;
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var list = _props.list;
            var children = _props.children;
            var _onClick = _props.onClick;

            return _react2['default'].createElement(
                'div',
                { className: 'dropdown', style: { display: 'inline-block' }, ref: 'dropdown' },
                _react2['default'].createElement(
                    'button',
                    {
                        type: 'button',
                        className: 'btn dropdown-toggle',
                        onClick: this.handleToggle.bind(this) },
                    children,
                    _react2['default'].createElement('span', {
                        className: 'caret',
                        style: this.state.toggle ? { borderTop: 0, borderBottom: '4px solid' } : null })
                ),
                _react2['default'].createElement(
                    'ul',
                    { className: 'dropdown-menu', style: { display: this.state.toggle && 'block' || null } },
                    list.map(function (item, index) {
                        return _react2['default'].createElement(
                            'li',
                            { key: index },
                            _react2['default'].createElement(
                                'a',
                                { href: item.href || '#',
                                    onClick: function onClick(e) {
                                        if (!item.href) {
                                            e.preventDefault();
                                        }
                                        _onClick(item);
                                    } },
                                item.label || item
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Dropdown;
}(_react.Component);

exports['default'] = Dropdown;


Dropdown.defaultProps = {
    onClick: function onClick() {}
};