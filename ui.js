// ui.js

document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.getElementById('play-area');

    // Adding event listener to tree emoji
    document.getElementById('tree-emoji').addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'tree');
    });

    // Adding event listener to worm emoji
    document.getElementById('worm-emoji').addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'worm');
    });

    playArea.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    playArea.addEventListener('drop', function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const x = event.clientX - playArea.offsetLeft;
        const y = event.clientY - playArea.offsetTop;

        if (data === 'tree') {
            addTree(x, y);
        } else if (data === 'worm') {
            addWorm(x, y);
        }
    });
});

function addTree(x, y) {
    const playArea = document.getElementById('play-area');
    const treeElement = document.createElement('div');
    treeElement.textContent = '🌳';
    treeElement.classList.add('emoji', 'tree');
    treeElement.style.position = 'absolute';
    treeElement.style.left = `${x}px`;
    treeElement.style.top = `${y}px`;
    playArea.appendChild(treeElement);

    addBird(x, y); // Add a bird when a tree is placed
}

function addWorm(x, y) {
    const playArea = document.getElementById('play-area');
    const wormElement = document.createElement('div');
    wormElement.textContent = '🐛';
    wormElement.classList.add('emoji', 'worm');
    wormElement.style.position = 'absolute';
    wormElement.style.left = `${x}px`;
    wormElement.style.top = `${y}px`;
    playArea.appendChild(wormElement);
}
