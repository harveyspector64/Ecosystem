// behaviors.js

function addButterflies(x, y) {
    setTimeout(() => createButterfly(x, y), getRandomTime(10, 20));
    setTimeout(() => createButterfly(x, y), getRandomTime(10, 20));
}

function createButterfly(targetX, targetY) {
    const playArea = document.getElementById('play-area');
    const butterflyElement = document.createElement('div');
    butterflyElement.textContent = EMOJIS.BUTTERFLY;
    butterflyElement.classList.add('emoji');
    butterflyElement.style.position = 'absolute';
    butterflyElement.style.left = getRandomEdgePosition('x') + 'px';
    butterflyElement.style.top = getRandomEdgePosition('y') + 'px';
    playArea.appendChild(butterflyElement);

    moveButterfly(butterflyElement, targetX, targetY);
}

function moveButterfly(butterfly, targetX, targetY) {
    // Placeholder for golden ratio flight path
    // We'll implement a simple looping pattern for now
    const interval = setInterval(() => {
        const currentX = parseFloat(butterfly.style.left);
        const currentY = parseFloat(butterfly.style.top);

        const newX = currentX + (Math.random() - 0.5) * 10;
        const newY = currentY + (Math.random() - 0.5) * 10;

        butterfly.style.left = `${newX}px`;
        butterfly.style.top = `${newY}px`;

        const distanceToTarget = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);
        if (distanceToTarget < 50) {
            clearInterval(interval);
            butterflyLand(butterfly, targetX, targetY);
        }
    }, 100);
}

function butterflyLand(butterfly, targetX, targetY) {
    setTimeout(() => {
        // Move away again after landing
        moveButterfly(butterfly, targetX, targetY);
    }, getRandomTime(5, 10) * 1000);
}

function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomEdgePosition(axis) {
    const playArea = document.getElementById('play-area');
    if (axis === 'x') {
        return Math.random() > 0.5 ? 0 : playArea.clientWidth - 20; // Adjust 20 for margin
    } else {
        return Math.random() > 0.5 ? 0 : playArea.clientHeight - 20;
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

    console.log(`Bird placed at: (${x}, ${y})`);

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
    return Math.floor(Math.random() * 50) - 25;
}
