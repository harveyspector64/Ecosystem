function addWorms(x, y) {
    const playArea = document.getElementById('play-area');
    const wormElement = document.createElement('div');
    wormElement.textContent = EMOJIS.WORM;
    wormElement.classList.add('emoji', 'worm');
    wormElement.style.position = 'absolute';
    wormElement.style.left = `${getRandomOffset()}px`;
    wormElement.style.top = `${getRandomOffset()}px`;
    playArea.appendChild(wormElement);

    console.log(`Worm placed at: (${getRandomOffset()}, ${getRandomOffset()})`);
}

function getRandomOffset() {
    const playArea = document.getElementById('play-area');
    return Math.floor(Math.random() * playArea.clientWidth);
}
