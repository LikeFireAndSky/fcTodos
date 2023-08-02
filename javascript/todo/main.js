const nodeList = document.querySelectorAll('div');

nodeList.forEach((el) => console.log(el.textContent))

const parentEl = document.querySelector('body');
const el = document.createElement('div');
el.textContent = 'Hello Friking World';

parentEl.prepend(el);