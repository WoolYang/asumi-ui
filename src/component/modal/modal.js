/**
 * Created by elly on 2017/4/7.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import classnames from 'classnames';
import {noop} from "../util";

export default class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {size, mask, title, style, okText, closeText, maskClosable, className, footer, children, close, ok, onOk, onClose} = this.props;
        let obj = {
            'el-modal-content': true,
            'el-small': size === "small",
            'el-large': size === "large"
        };
        if (className) {
            obj[className] = true;
        }
        let _classNames = classnames(obj);
        return (
            <div>
                {!!mask && <div className="el-mask"/>}
                <div className="el-modal-wrapper">
                    <div className="el-modal">
                        <div className={_classNames} style={style}>
                            <div className="el-modal-close" onClick={onClose}>×</div>
                            {!!title && <div className="el-modal-header">{title}</div>}
                            <div className="el-modal-body">{children}</div>
                            {footer !== null &&
                            <div className="el-modal-footer">
                                {footer ||
                                <div>
                                    {close && <Button
                                        style={{marginRight: 10}}
                                        size={size === "large" ? "default" : "small"}
                                        onClick={onClose}>{closeText}</Button>}
                                    {ok &&
                                    <Button
                                        type="primary"
                                        size={size === "large" ? "default" : "small"}
                                        onClick={onOk}>{okText}</Button>}
                                </div>}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    mask: PropTypes.bool,
    onOk: PropTypes.func,
    title: PropTypes.any,
    okText: PropTypes.any,
    ok: PropTypes.bool,
    close: PropTypes.bool,
    closeText: PropTypes.any,
    onClose: PropTypes.func,
    style: PropTypes.object,
    footer: PropTypes.any,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'small', 'large'])
};

Modal.defaultProps = {
    mask: true,
    okText: '确定',
    closeText: '取消',
    ok: true,
    close: true,
    onOk: noop,
    onClose: noop
};
