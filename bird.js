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

        birdElement.hunger = 100; 
        birdElement.isRoosting = false;
        birdElement.isHunting = false;
        birdElement.isFlying = true;

        moveBirdToTree(birdElement, x, y);
    }, getRandomTime(5, 15) * 1000);
}

function moveBirdToTree(bird, treeX, treeY) {
    const playArea = document.getElementById('play-area');
    const centerX = treeX + 32; // Center of the tree sprite
    const centerY = treeY + 32; // Center of the tree sprite
    let angle = 0;

    const interval = setInterval(() => {
        const radius = 60;
        angle += 0.02;

        const newX = centerX + radius * Math.cos(angle);
        const newY = centerY + radius * Math.sin(angle);

        bird.style.left = `${Math.min(Math.max(newX, 0), playArea.clientWidth - 20)}px`;
        bird.style.top = `${Math.min(Math.max(newY, 0), playArea.clientHeight - 20)}px`;

        bird.hunger -= 0.5;

        const distanceToTree = Math.sqrt((newX - treeX) ** 2 + (newY - treeY) ** 2);
        if (distanceToTree < 50 && !bird.isRoosting) {
            clearInterval(interval);
            landInTree(bird, treeX, treeY);
        }
    }, 150);
}

function landInTree(bird, treeX, treeY) {
    const tree = document.querySelector(`.tree[style*='left: ${treeX}px; top: ${treeY}px']`);
    if (!tree) return;

    const treeBounds = tree.getBoundingClientRect();
    const randomX = treeBounds.left + Math.random() * treeBounds.width;
    const randomY = treeBounds.top + Math.random() * treeBounds.height;

    bird.style.left = `${randomX}px`;
    bird.style.top = `${randomY}px`;
    bird.isRoosting = true;
    bird.isFlying = false;
    bird.isHunting = false;

    if (!bird.hasLanded) {
        bird.hasLanded = true;
        addWormsGradually(treeX, treeY);
    }

    setTimeout(() => {
        if (bird.isRoosting && bird.hunger > 60 && Math.random() < 0.2) {
            bird.isRoosting = false;
            bird.isFlying = true;
            moveBirdToTree(bird, treeX, treeY);
        } else if (bird.hunger <= 60) {
            landOnGround(bird);
        }
    }, getRandomTime(10, 30) * 1000);
}

function landOnGround(bird) {
    bird.isHunting = true;
    bird.isFlying = false;
    bird.isRoosting = false;
    birdWalk(bird);
}

function birdWalk(bird) {
    let steps = Math.floor(Math.random() * 3) + 2;

    const interval = setInterval(() => {
        if (bird.hunger <= 0) {
            clearInterval(interval);
            moveBirdToTree(bird, bird.landingSpotX, bird.landingSpotY);
            return;
        }

        const currentX = parseFloat(bird.style.left);
        const currentY = parseFloat(bird.style.top);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 5 + 10;

        let newX = currentX + distance * Math.cos(angle);
        let newY = currentY + distance * Math.sin(angle);

        newX = Math.min(Math.max(newX, 0), playArea.clientWidth - 20);
        newY = Math.min(Math.max(newY, 0), playArea.clientHeight - 20);

        bird.style.left = `${newX}px`;
        bird.style.top = `${newY}px`;

        bird.hunger -= 1;

        const worms = document.querySelectorAll('.worm');
        worms.forEach(worm => {
            const wormX = parseFloat(worm.style.left);
            const wormY = parseFloat(worm.style.top);
            const distanceToWorm = Math.sqrt((wormX - newX) ** 2 + (wormY - newY) ** 2);
            if (distanceToWorm < 20) {
                bird.hunger += 20;
                worm.remove();
                if (bird.hunger > 100) bird.hunger = 100;
            }
        });

        steps -= 1;
        if (steps <= 0) {
            clearInterval(interval);
            bird.isHunting = false;
            bird.isFlying = true;
            moveBirdToTree(bird, bird.landingSpotX, bird.landingSpotY);
        }

    }, 1000);
}

function addWormsGradually(x, y) {
    const interval = setInterval(() => {
        if (document.querySelectorAll('.worm').length < 10) {
            addWorms(x, y);
        } else {
            clearInterval(interval);
        }
    }, getRandomTime(5, 10) * 1000);
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
        return Math.random() > 0.5 ? 0 : playArea.clientWidth - 20;
    } else {
        return Math.random() > 0.5 ? 0 : playArea.clientHeight - 20;
    }
}
