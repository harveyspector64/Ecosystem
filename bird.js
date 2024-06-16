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
        birdElement.isRoosting = false;
        birdElement.isHunting = false;
        birdElement.isFlying = true;

        moveBirdToTree(birdElement, x, y);
    }, getRandomTime(5, 15) * 1000);
}

function moveBirdToTree(bird, treeX, treeY) {
    const playArea = document.getElementById('play-area');
    const centerX = treeX + 40; // Centering the target on the tree
    const centerY = treeY - 40; // Centering the target on the tree
    let angle = 0;

    const interval = setInterval(() => {
        const radius = 60; // Radius for the circular path
        angle += 0.05; // Increment angle for smooth circular movement

        const newX = centerX + radius * Math.cos(angle);
        const newY = centerY + radius * Math.sin(angle);

        // Ensure the bird stays within the play area
        bird.style.left = `${Math.min(Math.max(newX, 0), playArea.clientWidth - 20)}px`;
        bird.style.top = `${Math.min(Math.max(newY, 0), playArea.clientHeight - 20)}px`;

        bird.hunger -= 0.5; // Decrease hunger over time

        const distanceToTree = Math.sqrt((newX - treeX) ** 2 + (newY - treeY) ** 2);
        if (distanceToTree < 50 && !bird.isRoosting) {
            clearInterval(interval);
            landInTree(bird, treeX, treeY);
        }
    }, 150); // Slower interval for smoother, less jerky movement
}

function landInTree(bird, treeX, treeY) {
    const tree = document.querySelector(`.emoji.tree[style*='left: ${treeX}px; top: ${treeY}px']`);
    if (!tree) return;

    const treeBounds = tree.getBoundingClientRect();
    const randomX = Math.random() * treeBounds.width + treeBounds.left;
    const randomY = Math.random() * treeBounds.height + treeBounds.top;

    bird.style.left = `${randomX}px`;
    bird.style.top = `${randomY}px`;
    bird.isRoosting = true;
    bird.isFlying = false;
    bird.isHunting = false;

    // Trigger gradual worm appearance
    if (!bird.hasLanded) {
        bird.hasLanded = true;
        addWormsGradually(treeX, treeY);
    }

    // Chance to fly again even when above 60 hunger
    setTimeout(() => {
        if (bird.isRoosting && bird.hunger > 60 && Math.random() < 0.2) { // 20% chance to fly
            bird.isRoosting = false;
            bird.isFlying = true;
            moveBirdToTree(bird, treeX, treeY);
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
            moveBirdToTree(bird, bird.landingSpotX, bird.landingSpotY); // Return to tree
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
            bird.isHunting = false;
            bird.isFlying = true;
            moveBirdToTree(bird, bird.landingSpotX, bird.landingSpotY); // Take off and fly again
        }

    }, 1000); // Slower interval for walking
}

function addWormsGradually(x, y) {
    const interval = setInterval(() => {
        if (document.querySelectorAll('.worm').length < 10) { // Limit number of worms
            addWorms(x, y);
        } else {
            clearInterval(interval);
        }
    }, getRandomTime(5, 10) * 1000); // Add a worm every 5-10 seconds
}

function addWorms(x, y) {
    const playArea = document.getElementById('play-area');
    const wormElement = document.createElement('div');
    wormElement.textContent = EMOJIS.WORM;
    wormElement.classList.add('emoji', 'worm');
    wormElement.style.position = 'absolute';
    wormElement.style.left = `${x + getRandomOffset()}px`;
    wormElement.style.top = `${y + getRandomOffset()}px`;
    playArea.appendChild(wormElement);

    console.log(`Worm placed at: (${x + getRandomOffset()}, ${y + getRandomOffset()})`);
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

function getRandomOffset() {
    const playArea = document.getElementById('play-area');
    return Math.floor(Math.random() * playArea.clientWidth);
}
