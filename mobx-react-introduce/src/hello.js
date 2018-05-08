import React,{Component} from 'react';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';

// observable 定义的一般是组件的状态
const user = mobx.observable({
    name:'startcaft',
    age:22
});

// action 定义如何修改组件的状态（可观察数据）
const changeName = mobx.action(name => user.name = name);
const changeAge = mobx.action(age =>  user.age = age);

// observer 定义 React 组件
const Hello = mobxReact.observer(class Hello extends Component {
    componentDidMount(){
        changeName('pikai');// 引发组件重绘
    }

    render(){
        console.log('render',user.name);
        return <div>Hello，{user.name}</div>
    }
});

changeName('kai');// 外部触发action，一样引发重绘
changeAge(18);// 中带你不会引起组件重绘，因为组件并没有使用 user.age 这个可观察数据

export default Hello;