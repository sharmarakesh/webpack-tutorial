import './hello-world-button.scss';

class HelloWorldBButton {
    buttonCssClass = 'hello-world-button';
    
    render () {
        const button = document.createElement('button');
        button.innerHTML = 'Hello World!';
        button.classList.add(this.buttonCssClass);
        const body = document.querySelector('body');
        const div = document.createElement('div');
        button.onclick = function () {
            const p = document.createElement('p');
            p.innerText = 'Hello World!!!';
            p.classList.add('hello-world-text');
            div.appendChild(p);

        }
        div.id = 'example';
        div.classList.add('example');
        div.appendChild(button);
        body.appendChild(div);
    }
}

export default HelloWorldBButton;