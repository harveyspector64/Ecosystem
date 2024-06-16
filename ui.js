document.addEventListener('DOMContentLoaded', () => {
    const playArea = document.getElementById('play-area');

    // Adding event listener to tree emoji
    document.getElementById('tree-emoji').addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'tree');
    });

    // Adding event listener to bush emoji
    document.getElementById('bush-emoji').addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', 'bush');
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
        } else if (data === 'bush') {
            addBush(x, y);
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

function addBush(x, y) {
    const playArea = document.getElementById('play-area');
    const bushElement = document.createElement('div');
    bushElement.textContent = '🌹';
    bushElement.classList.add('emoji', 'bush');
    bushElement.style.position = 'absolute';
    bushElement.style.left = `${x}px`;
    bushElement.style.top = `${y}px`;
    playArea.appendChild(bushElement);

    addButterflies(x, y); // Add butterflies when a bush is placed
}
