/**
 * Created by elly on 2017/4/6.
 */
import React, {Component} from 'react';
import {
    Select,
    Option,
    Group
} from '../../../src/Index.js';

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit1: "",
            fruit2: "",
            flower1: "",
            flower2: "",
            flower3: "",
            animal1: [],
            animal2: [],
            animal3: [],
        }
    }

    handleChange(event) {
        let {name, value} = event;
        this.setState(prev=> {
            prev[name] = value;
            return prev;
        })
    }

    handleChangeMultiple(event) {
        let {name, value, selected} = event;
        this.setState(prev=> {
            if (selected) {
                prev[name].push(value);
            } else {
                prev[name].splice(prev[name].indexOf(value), 1);
            }
            return prev;
        })
    }

    render() {
        let style = {
            marginBottom: 10,
            verticalAlign: 'top'
        };
        let {fruit1, fruit2, flower1, flower2, flower3, animal1, animal2, animal3} = this.state;
        return (
            <div className="content">
                <h1>Normal Select</h1>
                <Group style={style}
                       onChange={this.handleChange.bind(this)}>
                    <Select placeholder="请选择" name="fruit1" value={fruit1}>
                        <Option value="apple">Apple</Option>
                        <Option value="banana">Banana</Option>
                        <Option value="watermelon">Watermelon</Option>
                        <Option value="peach">Peach</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                    </Select>
                    <Select placeholder="请选择" name="fruit2" value={fruit2} defaultValue="banana">
                        <Option value="apple">Apple</Option>
                        <Option value="banana">Banana</Option>
                        <Option value="watermelon">Watermelon</Option>
                        <Option value="peach">Peach</Option>
                    </Select>
                </Group>
                <h1>Disabled Select</h1>
                <Group style={style} name="fruit3">
                    <Select placeholder="请选择" disabled>
                        <Option value="apple">Apple</Option>
                        <Option value="banana">Banana</Option>
                        <Option value="watermelon">Watermelon</Option>
                        <Option value="peach">Peach</Option>
                    </Select>
                </Group>
                <h1>Small & Large Select</h1>
                <Group style={style}
                       onChange={this.handleChange.bind(this)}>
                    <Select placeholder="请选择" size="small" name="flower1" value={flower1}>
                        <Option value="iris">Iris</Option>
                        <Option value="jasmine">Jasmine</Option>
                        <Option value="poppy">Peach</Option>
                        <Option value="rose">Rose</Option>
                    </Select>
                    <Select placeholder="请选择" size="large" name="flower2" value={flower2}>
                        <Option value="iris">Iris</Option>
                        <Option value="jasmine">Jasmine</Option>
                        <Option value="poppy">Peach</Option>
                        <Option value="rose">Rose</Option>
                    </Select>
                </Group>
                <h1>Multiple Select</h1>
                <Group style={style}
                       multiple onChange={this.handleChangeMultiple.bind(this)}>
                    <Select placeholder="请选择" name="animal1" value={animal1}>
                        <Option value="monkey">Monkey</Option>
                        <Option value="lion">Lion</Option>
                        <Option value="elephant">Elephant</Option>
                        <Option value="chicken">Chicken</Option>
                    </Select>
                    <Select placeholder="请选择" selectedAll name="animal2" value={animal2}>
                        <Option value="monkey">Monkey</Option>
                        <Option value="lion">Lion</Option>
                        <Option value="elephant">Elephant</Option>
                        <Option value="chicken">Chicken</Option>
                    </Select>
                </Group>
                <h1>Searchable Select</h1>
                <Group
                    searchable
                    style={style}
                    placeholder="请输入搜索"
                >
                    <Select name="flower3" value={flower3} onChange={this.handleChange.bind(this)}>
                        <Option value="iris">Iris</Option>
                        <Option value="jasmine">Jasmine</Option>
                        <Option value="poppy">Peach</Option>
                        <Option value="rose">Rose</Option>
                    </Select>
                    <Select
                        name="animal3"
                        value={animal3}
                        multiple selectedAll
                        onChange={this.handleChangeMultiple.bind(this)}>
                        <Option value="monkey">Monkey</Option>
                        <Option value="lion">Lion</Option>
                        <Option value="elephant">Elephant</Option>
                        <Option value="chicken">Chicken</Option>
                    </Select>
                </Group>
            </div>
        )
    }
}