
// import './index.css';
import less from './assets/styles/index.less';

// const func = (str) => {
//     document.getElementById('app').innerHTML = str;
// };

// func('现在开始使用Bable!');

/**
 * jsx片段会转译成为 React.createElement 方法包裹的代码
 * createElement 记录了DOM节点的所有信息，这个记录DOM信息的对象，在React中成为虚拟DOM。
 * @param {*} tag 标签名
 * @param {*} attrs 属性
 * @param {*} children 子节点
 */
function createElement(tag,attrs,...children){
    return {
        tag,
        attrs,
        children
    }
}

function render(vnode,container){
    if(typeof vnode === 'string'){
        const textNode = document.createTextNode(vnode);
        return container.appendChild(textNode);
    }

    const dom = document.createElement(vnode.tag);

    if(vnode.attrs){
        Object.keys(vnode.attrs).forEach(key => {
            if(key === 'className'){
                key = 'class';
            }
            dom.setAttribute(key,vnode.attrs[key]);
        })
    }

    // 递归渲染子节点
    vnode.children.forEach(child => {
        render(child,dom);
    })

    // 讲渲染结果挂在到真正的DOM节点上
    return container.appendChild(dom);
}

const React = {
    createElement
}

const ReactDOM = {
    render: ( vnode, container ) => {
        container.innerHTML = '';
        return render( vnode, container );
    }
}

const element = (
    <div>
        hello<span>workd!</span>
    </div>
)

console.log('React组件',element);

// ReactDOM.render(
//     <div>
//         hello，<span>workd!</span>
//     </div>,
//     document.getElementById('root')
// );

function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
    ReactDOM.render(
        element,
        document.getElementById( 'root' )
    );
}

setInterval( tick, 1000 );


if (module.hot) {
    module.hot.accept('./index.js', function() {
        console.log('Accepting the updated intMe module!');
        printMe();
    })
}