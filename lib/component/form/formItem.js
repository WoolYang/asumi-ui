'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _radio = require('../radio');

var _radio2 = _interopRequireDefault(_radio);

var _upload = require('../upload');

var _upload2 = _interopRequireDefault(_upload);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _editor = require('../editor');

var _editor2 = _interopRequireDefault(_editor);

var _popover = require('../popover');

var _popover2 = _interopRequireDefault(_popover);

var _datetime = require('../datetime');

var _datetime2 = _interopRequireDefault(_datetime);

var _transfer = require('../transfer');

var _transfer2 = _interopRequireDefault(_transfer);

var _tagInput = require('../tagInput');

var _tagInput2 = _interopRequireDefault(_tagInput);

var _option = require('../select/option');

var _option2 = _interopRequireDefault(_option);

var _numberInput = require('../numberInput');

var _numberInput2 = _interopRequireDefault(_numberInput);

var _index = require('../checkbox/index');

var _index2 = _interopRequireDefault(_index);

var _radioGroup = require('../radio/radioGroup');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _checkGroup = require('../checkbox/checkGroup');

var _checkGroup2 = _interopRequireDefault(_checkGroup);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by elly on 2017/4/13.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


function isRequired(validate, required) {
    return required || validate && validate.some(function (item) {
        return item.required;
    });
}

var FormItem = function (_Component) {
    _inherits(FormItem, _Component);

    function FormItem(props) {
        _classCallCheck(this, FormItem);

        var _this = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props));

        _this.msg_str = "";
        return _this;
    }

    _createClass(FormItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(_ref) {
            var _this2 = this;

            var beforeSubmit = _ref.beforeSubmit,
                value = _ref.value,
                validate = _ref.validate,
                validator = _ref.validator;

            if (beforeSubmit && validate && validate.length) {
                var disabled = false;
                validate.map(function (item) {
                    if (!disabled && item.trigger === "submit") {
                        disabled = _this2.validator(item, value, "submit");
                    }
                });
                validator && validator(disabled);
            }
        }
    }, {
        key: 'validator',
        value: function validator(item, value) {
            var maxLength = item.maxLength,
                length = item.length,
                isLocaleCompare = item.isLocaleCompare,
                min = item.min,
                max = item.max,
                minLength = item.minLength,
                message = item.message,
                pattern = item.pattern,
                instance = item.instance,
                rule = item.rule,
                required = item.required,
                validator = item.validator,
                type = item.type;

            var reg = void 0,
                fail = validator && validator(this.props);
            var valueType = (0, _util.getType)(value);
            var hasLen = valueType === "array" && (!type || type === "array") || valueType === "string" && (!type || type === "string");
            if (!fail && required && (value == null || value === "" || valueType === "array" && value.length === 0)) {
                fail = true;
            }
            if (!fail && instance && !value instanceof instance) {
                fail = true;
            }
            if (!fail && type && valueType !== type) {
                fail = true;
            }
            if (!fail && min != null) {
                if (isLocaleCompare && valueType === "string" && value.localeCompare(min) < 0) {
                    fail = true;
                } else if (value < min) {
                    fail = true;
                }
            }
            if (!fail && max != null) {
                if (isLocaleCompare && valueType === "string" && value.localeCompare(max) > 0) {
                    fail = true;
                } else if (value > max) {
                    fail = true;
                }
            }
            if (!fail && length != null && hasLen && value.length !== length) {
                fail = true;
            }
            if (!fail && minLength != null && hasLen && value.length < minLength) {
                fail = true;
            }
            if (!fail && maxLength != null && hasLen && value.length > maxLength) {
                fail = true;
            }
            if (!fail && Object.prototype.toString.call(pattern) === '[object RegExp]') {
                reg = pattern;
            } else if (!fail && rule) {
                reg = _util.rules[rule];
            }
            if (!fail && reg && !reg.test(value)) {
                fail = true;
            }
            if (fail) {
                this.msg_str = message;
                this._message.innerHTML = message;
                this._form_item.classList.add('el-form-item-' + this.props.validateType);
            }
            return fail;
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur() {
            var _this3 = this;

            var _props = this.props,
                value = _props.value,
                onBlur = _props.onBlur,
                validate = _props.validate,
                validator = _props.validator,
                required = _props.required,
                validateType = _props.validateType;

            var disabled = false;
            if (validate && validate.length) {
                validate.map(function (item) {
                    if (!disabled && item.trigger === "blur") {
                        disabled = _this3.validator(item, value);
                    }
                });
            }
            if (!disabled && this.msg_str) {
                this._form_item.classList.remove('el-form-item-' + validateType);
                this._message.innerHTML = "";
                this.msg_str = "";
            }
            if (!disabled && required && (value == null || value === "" || (0, _util.getType)(value) === "array" && value.length === 0)) {
                disabled = true;
            }
            validator && validator(disabled);
            onBlur && onBlur.apply(null, arguments);
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _this4 = this;

            var _props2 = this.props,
                value = _props2.value,
                onChange = _props2.onChange,
                validate = _props2.validate,
                validator = _props2.validator,
                validateType = _props2.validateType;

            var disabled = false;
            var _value = e.value === undefined ? value : e.value;
            if (validate && validate.length) {
                validate.map(function (item) {
                    if (!disabled && item.trigger === "change") {
                        disabled = _this4.validator(item, _value);
                    }
                });
            }
            if (!disabled && this.msg_str) {
                this._form_item.classList.remove('el-form-item-' + validateType);
                this._message.innerHTML = "";
                this.msg_str = "";
            }
            validator && validator(disabled);
            onChange && onChange.apply(null, arguments);
        }
    }, {
        key: 'itemRender',
        value: function itemRender() {
            var _props3 = this.props,
                on = _props3.on,
                off = _props3.off,
                tips = _props3.tips,
                col = _props3.col,
                requiredMark = _props3.requiredMark,
                name = _props3.name,
                value = _props3.value,
                colon = _props3.colon,
                component = _props3.component,
                className = _props3.className,
                dataFormat = _props3.dataFormat,
                content = _props3.content,
                type = _props3.type,
                onBlur = _props3.onBlur,
                beforeSubmit = _props3.beforeSubmit,
                onChange = _props3.onChange,
                children = _props3.children,
                options = _props3.options,
                validate = _props3.validate,
                validateType = _props3.validateType,
                validator = _props3.validator,
                labelWidth = _props3.labelWidth,
                config = _objectWithoutProperties(_props3, ['on', 'off', 'tips', 'col', 'requiredMark', 'name', 'value', 'colon', 'component', 'className', 'dataFormat', 'content', 'type', 'onBlur', 'beforeSubmit', 'onChange', 'children', 'options', 'validate', 'validateType', 'validator', 'labelWidth']);

            if (type !== "upload" && children) return children;
            var output = null;
            switch (type) {
                case "textarea":
                    output = _react2['default'].createElement(_input2['default'], _extends({}, config, {
                        type: 'textarea',
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this) }));
                    break;
                case "number":
                    output = _react2['default'].createElement(_numberInput2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this) }));
                    break;
                case "select":
                    output = _react2['default'].createElement(
                        _select2['default'],
                        _extends({}, config, {
                            name: name,
                            value: value,
                            onBlur: this.handleBlur.bind(this),
                            onChange: this.handleChange.bind(this) }),
                        !!options && options.map(function (item) {
                            return _react2['default'].createElement(_option2['default'], _extends({ key: item.value }, item));
                        })
                    );
                    break;
                case "switch":
                    output = _react2['default'].createElement(_radio2['default'], _extends({}, config, {
                        type: 'switch',
                        value: on,
                        name: name,
                        label: null,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this),
                        checked: typeof value === "boolean" ? value : on === value
                    }));
                    break;
                case "radio":
                    output = _react2['default'].createElement(_radio2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this),
                        checked: typeof value === "boolean" ? value : value === value
                    }));
                    break;
                case "radiogroup":
                    output = _react2['default'].createElement(_radioGroup2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        options: options,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "checkbox":
                    output = _react2['default'].createElement(_index2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "checkgroup":
                    output = _react2['default'].createElement(_checkGroup2['default'], _extends({}, config, {
                        name: name,
                        options: options,
                        checkedList: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "checkboxgroup":
                    output = _react2['default'].createElement(_checkGroup2['default'], _extends({}, config, {
                        name: name,
                        options: options,
                        checkedList: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "datetime":
                    output = _react2['default'].createElement(_datetime2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "editor":
                    output = _react2['default'].createElement(_editor2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "upload":
                    output = _react2['default'].createElement(_upload2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        children: children,
                        onBlur: this.handleBlur.bind(this)
                    }));
                    break;
                case "transfer":
                    output = _react2['default'].createElement(_transfer2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "taginput":
                    output = _react2['default'].createElement(_tagInput2['default'], _extends({}, config, {
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
                case "static":
                    output = _react2['default'].createElement(
                        'div',
                        {
                            className: 'el-form-control-static' },
                        dataFormat ? dataFormat(content || value) : content || value
                    );
                    break;
                case "component":
                    output = _react2['default'].cloneElement(component, _extends({
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }, config));
                    break;
                default:
                    output = _react2['default'].createElement(_input2['default'], _extends({}, config, {
                        type: type,
                        name: name,
                        value: value,
                        onBlur: this.handleBlur.bind(this),
                        onChange: this.handleChange.bind(this)
                    }));
                    break;
            }
            return output;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var props = this.props;
            var tips = props.tips,
                label = props.label,
                colon = props.colon,
                className = props.className,
                required = props.required,
                validate = props.validate,
                requiredMark = props.requiredMark,
                labelWidth = props.labelWidth,
                col = props.col,
                colSpan = props.colSpan;

            var _className = (0, _classnames2['default'])('el-form-item clearfix', col ? 'el-col-' + col * (colSpan || 1) + ' el-col-inline' : null, className);
            if (tips && typeof tips === "string") {
                tips = { title: tips };
            }
            var popover = tips ? _react2['default'].createElement(
                _popover2['default'],
                _extends({}, tips, { trigger: 'hover', placement: 'top' }),
                _react2['default'].createElement('span', { className: 'el-form-tips fa fa-question-circle-o',
                    style: { paddingLeft: 4, paddingRight: label ? null : 4 } })
            ) : null;
            var _required = isRequired(validate, required);
            return _react2['default'].createElement(
                'div',
                { className: _className, ref: function ref(c) {
                        return _this5._form_item = c;
                    } },
                !label && _required && _react2['default'].createElement(
                    'span',
                    { className: 'el-required' },
                    requiredMark
                ),
                !label && popover,
                !!label && _react2['default'].createElement(
                    'label',
                    { className: 'el-form-label', style: labelWidth ? { width: labelWidth, float: 'left' } : null },
                    _required && _react2['default'].createElement(
                        'span',
                        { className: 'el-required' },
                        requiredMark
                    ),
                    label,
                    colon && ":",
                    popover
                ),
                _react2['default'].createElement(
                    'div',
                    { className: 'el-form-control',
                        style: labelWidth ? { marginLeft: labelWidth, display: 'block' } : null },
                    this.itemRender(),
                    _react2['default'].createElement('div', { className: 'el-form-message', ref: function ref(c) {
                            return _this5._message = c;
                        } })
                )
            );
        }
    }]);

    return FormItem;
}(_react.Component);

exports['default'] = FormItem;


FormItem.propTypes = {
    value: _propTypes2['default'].any,
    colon: _propTypes2['default'].bool,
    name: _propTypes2['default'].string,
    label: _propTypes2['default'].string,
    required: _propTypes2['default'].bool,
    onChange: _propTypes2['default'].func,
    requiredMark: _propTypes2['default'].any,
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    dataFormat: _propTypes2['default'].func,
    tips: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].shape({
        title: _propTypes2['default'].string,
        content: _propTypes2['default'].any
    })]),
    validateType: _propTypes2['default'].oneOf(['error', 'warning']),
    validate: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
        maxLength: _propTypes2['default'].any,
        minLength: _propTypes2['default'].any,
        length: _propTypes2['default'].number,
        strict: _propTypes2['default'].bool,
        validator: _propTypes2['default'].func,
        isLocaleCompare: _propTypes2['default'].bool,
        pattern: _propTypes2['default'].instanceOf(RegExp),
        instance: _propTypes2['default'].any,
        trigger: _propTypes2['default'].oneOf(['blur', 'change', 'submit']),
        mix: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
        max: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
        rule: _propTypes2['default'].oneOf(['color', 'price', 'nature', 'positiveInt']),
        type: _propTypes2['default'].oneOf(['boolean', 'array', 'string', 'object', 'number', 'moment'])
    })),
    type: _propTypes2['default'].oneOf(['text', 'color', 'editor', 'static', 'datetime', 'number', 'component', 'password', 'textarea', 'select', 'checkbox', 'radio', 'switch', 'upload', 'radiogroup', 'checkgroup', 'checkboxgroup', 'transfer', 'taginput'])
};

FormItem.defaultProps = {
    type: "text",
    requiredMark: "*",
    validateType: "error"
};

FormItem._component_name = "FormItem";