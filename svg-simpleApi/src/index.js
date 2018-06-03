
import './assets/styles/index.less';


var SVG_NS = 'http://www.w3.org/2000/svg';

const textarea = document.getElementById('input');
const canvas = document.getElementById('canvas');
const path = document.createElementNS(SVG_NS,'path');

window.onload = function(){
    const svg = createSVG();
    path.setAttribute('d',textarea.value.trim());
    path.setAttribute('stroke','green');
    path.setAttribute('stroke-width','2px');
    svg.appendChild(path);

    console.log(svg);
}

textarea.addEventListener('change',(e) => {
    let sourcePath = path.getAttribute('d').trim();
    sourcePath += ',' + e.target.value;
    path.setAttribute('d',sourcePath);
    console.log(sourcePath);
})

function createSVG() {
    let svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    canvas.appendChild(svg);
    return svg;
}

if (module.hot) { 
    module.hot.accept('./index.js', function(){ 
        console.log('Accepting the updated intMe module!'); printMe(); 
    }) 
}