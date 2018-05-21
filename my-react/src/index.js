
import './index.css';

const func = (str) => {
    document.getElementById('app').innerHTML = str;
};

func('现在开始使用Bable!');


if (module.hot) {
    module.hot.accept('./index.js', function() {
        console.log('Accepting the updated intMe module!');
        printMe();
    })
}