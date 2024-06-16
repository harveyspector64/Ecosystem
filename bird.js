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
        birdElement.isRoosting = false;
        birdElement.isHunting = false;
        birdElement.isFlying = true;
        
        moveBird(birdElement, x, y);
    }, getRandomTime(5, 15) * 1000);
}

function moveBird(bird, targetX, targetY) {
    const playArea = document.getElementById('play-area');
    const interval = setInterval(() => {
        if (bird.hunger <= 0) {
            clearInterval(interval);
            moveBird(bird, bird.landingSpotX, bird.landingSpotY); // Return to tree
            return;
        }

        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);

        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * 50 + 50; // Random distance

        let newX = currentX + distance * Math.cos(angle);
        let newY = currentY + distance * Math.sin(angle);

        // Ensure the bird stays within the play area
        newX = Math.min(Math.max(newX, 0), playArea.clientWidth - 20);
        newY = Math.min(Math.max(newY, 0), playArea.clientHeight - 20);

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        bird.hunger -= 0.5; // Decrease hunger over time

        const distanceToTarget = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);
        if (distanceToTarget < 20) {
            clearInterval(interval);
            if (bird.hunger > 60) {
                landInTree(bird, targetX, targetY);
            } else {
                landOnGround(bird);
            }
        }
    }, 500);
}

function landInTree(bird, targetX, targetY) {
    bird.style.left = `${targetX}px`;
    bird.style.top = `${targetY - 60}px`; // Land on the top part of the tree
    bird.isRoosting = true;
    bird.isFlying = false;
    bird.isHunting = false;

    // Trigger worm appearance
    if (!bird.hasLanded) {
        bird.hasLanded = true;
        for (let i = 0; i < 5; i++) { // Add initial worms
            addWorms(targetX, targetY);
        }
    }

    // Chance to fly again even when above 60 hunger
    setTimeout(() => {
        if (bird.isRoosting && bird.hunger > 60 && Math.random() < 0.2) { // 20% chance to fly
            bird.isRoosting = false;
            bird.isFlying = true;
            moveBird(bird, targetX, targetY);
        }
    }, getRandomTime(10, 30) * 1000); // Random flight duration
}

function landOnGround(bird) {
    bird.isHunting = true;
    bird.isFlying = false;
    bird.isRoosting = false;
    birdWalk(bird);
}

function birdWalk(bird) {
    let steps = Math.floor(Math.random() * 3) + 2; // 2-4 steps

    const interval = setInterval(() => {
        if (bird.hunger <= 0) {
            clearInterval(interval);
            moveBird(bird, bird.landingSpotX, bird.landingSpotY); // Return to tree
            return;
        }

        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);

        const angle = Math.random() * Math.PI * 2; // Random angle
        const distance = Math.random() * 5 + 10; // Shorter steps for walking

        let newX = currentX + distance * Math.cos(angle);
        let newY = currentY + distance * Math.sin(angle);

        // Ensure the bird stays within the play area
        newX = Math.min(Math.max(newX, 0), playArea.clientWidth - 20);
        newY = Math.min(Math.max(newY, 0), playArea.clientHeight - 20);

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        bird.hunger -= 1; // Continue decreasing hunger

        // Check for worms
        const worms = document.querySelectorAll('.worm');
        worms.forEach(worm => {
            const wormX = parseFloat(worm.style.left);
            const wormY = parseFloat(worm.style.top);
            const distanceToWorm = Math.sqrt((wormX - newX) ** 2 + (wormY - newY) ** 2);
            if (distanceToWorm < 20) {
                bird.hunger += 20; // Eating a worm increases hunger by 20
                worm.remove(); // Remove the worm from the map
                if (bird.hunger > 100) bird.hunger = 100; // Cap hunger at 100
            }
        });

        steps -= 1;
        if (steps <= 0) {
            clearInterval(interval);
            moveBird(bird, bird.landingSpotX, bird.landingSpotY); // Take off and fly again
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
