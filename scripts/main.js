field.generateField();
renderer.render();


function startTheGame() {
    renderer.disableStartButton();
    createPlayers();
    getPlayerToStart();
}


