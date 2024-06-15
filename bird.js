// bird.js

export function addBird(x, y) {
    const playArea = document.getElementById('play-area');
    const birdElement = document.createElement('div');
    birdElement.textContent = EMOJIS.BIRD;
    birdElement.classList.add('emoji', 'bird');
    birdElement.style.position = 'absolute';
    birdElement.style.left = getRandomEdgePosition('x') + 'px';
    birdElement.style.top = getRandomEdgePosition('y') + 'px';
    playArea.appendChild(birdElement);

    console.log(`Bird placed at: (${x}, ${y})`);

    birdElement.landingSpotX = x;
    birdElement.landingSpotY = y;
    moveBird(birdElement, x, y);
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

        const distanceToTarget = Math.sqrt((newX - targetX) ** 2 + (newY - targetY) ** 2);
        if (distanceToTarget < 20) {
            clearInterval(interval);
            bird.style.left = `${targetX}px`;
            bird.style.top = `${targetY - 60}px`; // Land on the top part of the tree
            birdCount++;
            if (birdCount === 1) {
                addBirdToPanel();
            }
        }
    }, 500);
}

function addBirdToPanel() {
    const birdElement = document.createElement('div');
    birdElement.id = 'bird';
    birdElement.classList.add('emoji');
    birdElement.textContent = EMOJIS.BIRD;
    birdElement.setAttribute('draggable', 'true');
    birdElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', EMOJIS.BIRD);
    });

    const sidebar = document.getElementById('sidebar');
    sidebar.appendChild(birdElement);
}

function getRandomEdgePosition(axis) {
    const playArea = document.getElementById('play-area');
    if (axis === 'x') {
        return Math.random() > 0.5 ? 0 : playArea.clientWidth - 20; // Adjust 20 for margin
    } else {
        return Math.random() > 0.5 ? 0 : playArea.clientHeight - 20;
    }
}
