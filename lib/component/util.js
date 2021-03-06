'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getType = getType;
/**
 * Created by elly on 2016/9/23.
 */
var idCounter = 0;

var uniqueID = exports.uniqueID = function uniqueID() {
    return idCounter++ + new Date().getTime() + Math.random();
};

var noop = exports.noop = function noop() {};

var isObj = exports.isObj = function isObj(input) {
    return Object.prototype.toString.call(input) === '[object Object]';
};

var isArr = exports.isArr = function isArr(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
};

var diff = exports.diff = function diff(a, b) {
    return a.filter(function (x) {
        return b.indexOf(x) === -1;
    });
};

var getScrollBarWidth = exports.getScrollBarWidth = function getScrollBarWidth() {
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return w1 - w2;
};

var extend = exports.extend = function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};

var sort = exports.sort = function sort(arr) {
    var auto = [];
    var left = [];
    var right = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i].props || arr[i];
        if (item.dataFixed === 'left') {
            left.push(arr[i]);
        } else if (item.dataFixed === 'right') {
            right.push(arr[i]);
        } else {
            auto.push(arr[i]);
        }
    }
    var sorted = left.concat(auto).concat(right);
    return { sorted: sorted, left: left, right: right };
};

var addEvent = exports.addEvent = function addEvent(el, event, listener) {
    if (el.addEventListener) {
        el.addEventListener(event, listener, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + event, listener);
    } else {
        el['on' + event] = listener;
    }
};

var removeEvent = exports.removeEvent = function removeEvent(el, event, listener) {
    if (el.removeEventListener) {
        el.removeEventListener(event, listener, false);
    } else if (el.detachEvent) {
        el.attachEvent('on' + event, listener);
    }
};

var contains = exports.contains = function contains(root, el) {
    if (root.compareDocumentPosition) return root === el || !!(root.compareDocumentPosition(el) & 16);

    if (root.contains && el.nodeType === 1) return root.contains(el) && root !== el;

    while (el = el.parentNode) {
        if (el === root) return true;
    }return false;
};

var KeyCode = exports.KeyCode = {
    DELETE: 8,
    SPACE: 32,
    ENTER: 13,
    DOWN: 40,
    UP: 38,
    TAB: 9
};

var rules = exports.rules = {
    price: /^((0|[1-9]\d{0,7})(\.\d{0,2})?)?$/,
    positiveInt: /^([1-9]\d{0,7})?$/,
    nature: /^(0?|[1-9]\d{0,7})$/,
    color: /^#[0-9a-fA-F]{0,6}$/
};

var MAX_SAFE_INTEGER = exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

function getType(value) {
    return Object.prototype.toString.call(value).toLowerCase().slice(8, -1);
}