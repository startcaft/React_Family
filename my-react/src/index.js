
import './index.css';

console.log('webpack!!!');


if (module.hot) {
    module.hot.accept('./index.js', function() {
        console.log('Accepting the updated intMe module!');
        printMe();
    })
}