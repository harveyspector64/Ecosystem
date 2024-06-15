// behaviors.js

function addButterflies(x, y) {
    const playArea = document.getElementById('play-area');
    const butterflyCount = 3; // Initial number of butterflies
    for (let i = 0; i < butterflyCount; i++) {
        const butterflyElement = document.createElement('div');
        butterflyElement.textContent = EMOJIS.BUTTERFLY;
        butterflyElement.classList.add('emoji');
        butterflyElement.style.position = 'absolute';
        butterflyElement.style.left = `${x + getRandomOffset()}px`;
        butterflyElement.style.top = `${y + getRandomOffset()}px`;
        playArea.appendChild(butterflyElement);

        // Implement movement logic here
        // For now, we'll just log the position
        console.log(`Butterfly ${i + 1} placed at: (${x + getRandomOffset()}, ${y + getRandomOffset()})`);
    }
}

function addBird(x, y) {
    const playArea = document.getElementById('play-area');
    const birdElement = document.createElement('div');
    birdElement.textContent = EMOJIS.BIRD;
    birdElement.classList.add('emoji');
    birdElement.style.position = 'absolute';
    birdElement.style.left = `${x}px`;
    birdElement.style.top = `${y}px`;
    playArea.appendChild(birdElement);

    // Implement bird behavior here
    console.log(`Bird placed at: (${x}, ${y})`);

    // Trigger worms to appear
    setTimeout(() => addWorms(x, y), 2000);
}

function addWorms(x, y) {
    const playArea = document.getElementById('play-area');
    const wormElement = document.createElement('div');
    wormElement.textContent = EMOJIS.WORM;
    wormElement.classList.add('emoji');
    wormElement.style.position = 'absolute';
    wormElement.style.left = `${x + getRandomOffset()}px`;
    wormElement.style.top = `${y + getRandomOffset()}px`;
    playArea.appendChild(wormElement);

    console.log(`Worm placed at: (${x + getRandomOffset()}, ${y + getRandomOffset()})`);
}

function getRandomOffset() {
    return Math.floor(Math.random() * 50) - 25; // Random offset between -25 and 25
}
