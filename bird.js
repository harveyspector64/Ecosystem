function addBird(x, y) {
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

    flyToTree(birdElement, x, y);
}

function flyToTree(bird, treeX, treeY) {
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);
        const angle = Math.atan2(treeY - currentY, treeX - currentX);
        const newX = currentX + Math.cos(angle) * 2;
        const newY = currentY + Math.sin(angle) * 2;

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        const distanceToTree = Math.sqrt((newX - treeX) ** 2 + (newY - treeY) ** 2);
        if (distanceToTree < 10) {
            clearInterval(interval);
            bird.state = 'roosting';
            bird.style.left = `${treeX}px`;
            bird.style.top = `${treeY - 30}px`;
            birdRoosting(bird);
        }
    }, 50);
}

function birdRoosting(bird) {
    const interval = setInterval(() => {
        bird.hunger -= 1;
        if (bird.hunger <= 60 || Math.random() < 0.2) {
            clearInterval(interval);
            bird.state = 'flying';
            flyToGround(bird);
        }
    }, 1000);
}

function flyToGround(bird) {
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);
        const angle = Math.random() * 2 * Math.PI;
        const newX = currentX + Math.cos(angle) * 2;
        const newY = currentY + Math.sin(angle) * 2;

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        if (Math.random() < 0.1) {
            clearInterval(interval);
            bird.state = 'hunting';
            bird.style.top = `${currentY + 10}px`;  // Simulate landing
            birdHunting(bird);
        }
    }, 50);
}

function birdHunting(bird) {
    const steps = Math.floor(Math.random() * 3) + 2;
    let stepCount = 0;

    const interval = setInterval(() => {
        if (stepCount >= steps) {
            clearInterval(interval);
            if (bird.hunger > 60) {
                bird.state = 'flying';
                flyToTree(bird, parseFloat(bird.style.left), parseFloat(bird.style.top));
            } else {
                bird.state = 'flying';
                flyToGround(bird);
            }
        } else {
            const currentX = parseFloat(bird.style.left);
            const currentY = parseFloat(bird.style.top);
            const angle = Math.random() * 2 * Math.PI;
            const newX = currentX + Math.cos(angle) * 5;
            const newY = currentY + Math.sin(angle) * 5;

            bird.style.left = `${newX}px`;
            bird.style.top = `${newY}px`;

            const worms = document.querySelectorAll('.worm');
            worms.forEach(worm => {
                const wormX = parseFloat(worm.style.left);
                const wormY = parseFloat(worm.style.top);
                const distanceToWorm = Math.sqrt((newX - wormX) ** 2 + (newY - wormY) ** 2);
                if (distanceToWorm < 10) {
                    worm.remove();
                    bird.hunger = 100;
                    stepCount = steps;  // End hunting
                }
            });

            stepCount++;
        }
    }, 500);
}

function getRandomEdgePosition(axis) {
    const playArea = document.getElementById('play-area');
    if (axis === 'x') {
        return Math.random() > 0.5 ? 0 : playArea.clientWidth - 20;  // Adjust 20 for margin
    } else {
        return Math.random() > 0.5 ? 0 : playArea.clientHeight - 20;
    }
}
