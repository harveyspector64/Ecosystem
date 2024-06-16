// bird.js

function addBird(x, y) {
    console.log("Bird instantiated offscreen.");
    const playArea = document.getElementById('play-area');
    const birdElement = document.createElement('div');
    birdElement.textContent = EMOJIS.BIRD;
    birdElement.classList.add('emoji', 'bird');
    birdElement.style.position = 'absolute';
    birdElement.style.left = `${getRandomEdgePosition('x')}px`;
    birdElement.style.top = `${getRandomEdgePosition('y')}px`;
    playArea.appendChild(birdElement);

    birdElement.hunger = 100;
    birdElement.state = 'flying';

    startFlightPattern(birdElement, x, y);
}

function startFlightPattern(bird, targetX, targetY) {
    console.log("Bird started flight pattern.");
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 20 + 30;

        const newX = currentX + distance * Math.cos(angle);
        const newY = currentY + distance * Math.sin(angle);

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        if (Math.random() < 0.1) {
            clearInterval(interval);
            console.log("Bird is about to land.");
            birdLanding(bird, targetX, targetY);
        }
    }, 300);
}

function birdLanding(bird, treeX, treeY) {
    console.log("Bird landing initiated.");
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);
        const angle = Math.atan2(treeY - currentY, treeX - currentX);
        const newX = currentX + Math.cos(angle) * 2;
        const newY = currentY + Math.sin(angle) * 2;

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        const distanceToTree = Math.sqrt((newX - treeX) ** 2 + (newY - treeY) ** 2);
        if (distanceToTree < 20) {
            clearInterval(interval);
            console.log("Bird has landed on the tree.");
            bird.state = 'roosting';
            bird.style.left = `${treeX}px`;
            bird.style.top = `${treeY}px`;
            birdRoosting(bird, treeX, treeY);
        }
    }, 50);
}

function birdRoosting(bird, treeX, treeY) {
    console.log("Bird is roosting.");
    const interval = setInterval(() => {
        bird.hunger -= 1;
        console.log("Bird hunger: ", bird.hunger);
        if (bird.hunger <= 60) {
            clearInterval(interval);
            console.log("Bird is hungry and will start flying again.");
            bird.state = 'flying';
            startFlightPattern(bird, treeX, treeY);
        }
    }, 1000);
}

function birdHunting(bird) {
    console.log("Bird is hunting.");
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);
        const angle = Math.random() * Math.PI * 2;
        const distance = 5;

        const newX = currentX + distance * Math.cos(angle);
        const newY = currentY + distance * Math.sin(angle);

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        if (Math.random() < 0.1) {
            clearInterval(interval);
            console.log("Bird is roosting again.");
            bird.state = 'roosting';
            startFlightPattern(bird, currentX, currentY);
        }

        // Check for worms
        const worms = document.querySelectorAll('.worm');
        worms.forEach(worm => {
            const wormX = parseFloat(worm.style.left);
            const wormY = parseFloat(worm.style.top);
            const distanceToWorm = Math.sqrt((wormX - newX) ** 2 + (wormY - newY) ** 2);

            if (distanceToWorm < 10) {
                worm.remove();
                bird.hunger = Math.min(bird.hunger + 20, 100);
                console.log("Bird ate a worm. Hunger: ", bird.hunger);
            }
        });
    }, 500);
}

function getRandomEdgePosition(axis) {
    const playArea = document.getElementById('play-area');
    if (axis === 'x') {
        return Math.random() > 0.5 ? 0 : playArea.clientWidth - 20;
    } else {
        return Math.random() > 0.5 ? 0 : playArea.clientHeight - 20;
    }
}

function getRandomTime(min, max) {
    return Math.random() * (max - min) + min;
}
