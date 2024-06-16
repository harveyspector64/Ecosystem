function addBird(x, y) {
    const playArea = document.getElementById('play-area');
    setTimeout(() => {
        const birdElement = document.createElement('div');
        birdElement.textContent = EMOJIS.BIRD;
        birdElement.classList.add('emoji', 'bird');
        birdElement.style.position = 'absolute';
        birdElement.style.left = getRandomEdgePosition('x') + 'px';
        birdElement.style.top = getRandomEdgePosition('y') + 'px';
        playArea.appendChild(birdElement);

        birdElement.hunger = 100; // Initialize hunger meter
        birdElement.landingSpotX = x;
        birdElement.landingSpotY = y;
        moveBird(birdElement, x, y);
    }, getRandomTime(5, 15) * 1000);
}

function moveBird(bird, targetX, targetY) {
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);

        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * 50 + 50; // Random distance

        const newX = currentX + distance * Math.cos(angle);
        const newY = currentY + distance * Math.sin(angle);

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        bird.hunger -= 1; // Decrease hunger over time

        if (bird.hunger <= 60) {
            clearInterval(interval);
            huntMode(bird);
        } else {
            const distanceToTarget = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);
            if (distanceToTarget < 20) {
                clearInterval(interval);
                bird.style.left = `${targetX}px`;
                bird.style.top = `${targetY - 60}px`; // Land on the top part of the tree
                bird.hunger = 100; // Reset hunger
            }
        }
    }, 500);
}

function huntMode(bird) {
    const interval = setInterval(() => {
        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);

        if (bird.hunger <= 0) {
            clearInterval(interval);
            moveBird(bird, bird.landingSpotX, bird.landingSpotY); // Return to tree
        } else {
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = Math.random() * 20 + 30; // Shorter distance for hunting

            const newX = currentX + distance * Math.cos(angle);
            const newY = currentY + distance * Math.sin(angle);

            bird.style.left = `${newX}px`;
            bird.style.top = `${newY}px`;

            bird.hunger -= 1; // Continue decreasing hunger

            // Simulate landing and walking
            if (Math.random() < 0.1) { // 10% chance to land and walk
                clearInterval(interval);
                birdWalk(bird);
            }
        }
    }, 500);
}

function birdWalk(bird) {
    const interval = setInterval(() => {
        if (bird.hunger <= 0) {
            clearInterval(interval);
            moveBird(bird, bird.landingSpotX, bird.landingSpotY); // Return to tree
        } else {
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = Math.random() * 5 + 10; // Shorter steps for walking

            const newX = parseFloat(bird.style.left) + distance * Math.cos(angle);
            const newY = parseFloat(bird.style.top) + distance * Math.sin(angle);

            bird.style.left = `${newX}px`;
            bird.style.top = `${newY}px`;

            bird.hunger -= 1; // Continue decreasing hunger
        }
    }, 1000); // Slower interval for walking
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
