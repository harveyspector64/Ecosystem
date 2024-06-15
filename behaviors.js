// behaviors.js

let butterflyCount = 0;

function addButterflies(x, y) {
    const numButterflies = Math.floor(Math.random() * 2) + 1; // 1-2 butterflies per bush
    for (let i = 0; i < numButterflies; i++) {
        setTimeout(() => createButterfly(x, y), getRandomTime(10, 20) * 1000);
    }
}

function createButterfly(targetX, targetY) {
    const playArea = document.getElementById('play-area');
    const butterflyElement = document.createElement('div');
    butterflyElement.textContent = EMOJIS.BUTTERFLY;
    butterflyElement.classList.add('emoji', 'butterfly');
    butterflyElement.style.position = 'absolute';
    butterflyElement.style.left = getRandomEdgePosition('x') + 'px';
    butterflyElement.style.top = getRandomEdgePosition('y') + 'px';
    playArea.appendChild(butterflyElement);

    butterflyElement.hunger = 100; // Initialize hunger bar
    moveButterfly(butterflyElement, targetX, targetY);
}

function moveButterfly(butterfly, targetX, targetY) {
    const interval = setInterval(() => {
        const currentX = parseFloat(butterfly.style.left);
        const currentY = parseFloat(butterfly.style.top);

        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * 20 + 30; // Smaller distance for smoother movement

        const newX = currentX + distance * Math.cos(angle);
        const newY = currentY + distance * Math.sin(angle);

        butterfly.style.left = `${newX}px`;
        butterfly.style.top = `${newY}px`;

        butterfly.hunger -= 1; // Decrease hunger over time

        if (butterfly.hunger <= 0) {
            clearInterval(interval);
            butterflyLand(butterfly, targetX, targetY);
        }
    }, 300); // Slower interval for smoother, less jerky movement
}

function butterflyLand(butterfly, targetX, targetY) {
    const bushes = document.querySelectorAll('.emoji');
    let nearestBush = null;
    let minDistance = Infinity;

    bushes.forEach(bush => {
        if (bush.textContent === EMOJIS.BUSH) {
            const bushX = parseFloat(bush.style.left);
            const bushY = parseFloat(bush.style.top);
            const distance = Math.sqrt((bushX - targetX) ** 2 + (bushY - targetY) ** 2);

            if (distance < minDistance) {
                minDistance = distance;
                nearestBush = bush;
            }
        }
    });

    if (nearestBush) {
        butterfly.style.left = nearestBush.style.left;
        butterfly.style.top = nearestBush.style.top;

        setTimeout(() => {
            butterfly.hunger = 100; // Reset hunger
            moveButterfly(butterfly, parseFloat(nearestBush.style.left), parseFloat(nearestBush.style.top));
        }, getRandomTime(5, 10) * 1000);
    }
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
