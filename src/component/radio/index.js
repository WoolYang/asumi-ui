/**
 * Created by elly on 2017/4/8.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {noop} from "../util";

export default class Radio extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(e) {
        let {name, value, checked, disabled} = this.props;
        if (disabled) return;
        this.props.onChange({e, name, value, checked: !checked});
    }

    render() {
        let {label, type, checked, className, onChange, disabled, children, ...other} = this.props;
        let _className = classnames('el-checkbox-wrapper', disabled ? 'el-disabled' : '', className);
        let _innerClassName = classnames('el-checkbox', type === "switch" ? 'el-switch' : 'el-radio');
        return (
            <label className={_className}>
                <span className={_innerClassName}>
                    <input
                        {...other}
                        type="radio"
                        checked={checked}
                        disabled={disabled}
                        className="el-checkbox-input"
                        onChange={() => {
                        }}
                        onClick={this.handleChange.bind(this)}/>
                    <span/>
                </span>
                <span>{children || label}</span>
            </label>
        )
    }
}

Radio.propTypes = {
    label: PropTypes.any,
    checked: PropTypes.any,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    indeterminate: PropTypes.bool,
    type: PropTypes.oneOf(['switch', 'default', 'radio']),
};

Radio.defaultProps = {
    onChange: noop
};
