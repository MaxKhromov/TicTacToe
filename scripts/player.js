let players = [];

function createPlayers() {
    
    for (let i = 1; i < settings.playersAmount + 1; i++) {
        let playerData = prompt('Введите имя и символ игрока ' + i + '. \n\nНапример: Макс X');
        playerData = playerData.split(' ', 2);
        if (validateSymbol(playerData)) {
        let player = {
            name: playerData[0],
            symbol: playerData[1],
            isNextStep: false,
            cells: [],
            }
            players.push(player);
        }     
    }
}

function validateSymbol(playerData) {
    if (isEmptyOrSpaces(playerData[1])) {
        alert('Символ обязателен к заполнению! Создайте игроков еще раз!');
        deletePlayers();
        createPlayers();
    } else {
        for (let i = 0; i < players.length; i++) {
            if (playerData[1] == players[i].symbol) {
                alert('Данный символ уже используется другим игроком! Создайте игроков еще раз!');
                deletePlayers();
                createPlayers();
            } 
        }
        return true;
    }
} 

function isEmptyOrSpaces(str) {
    if (str == null || str.match(/^ *$/) !== null || str == undefined) {
        return true;
    } else {
        return false;
    }
}



function deletePlayers() {
    players = [];
}

function getPlayerToStart() {
    let random = randomInteger(1, settings.playersAmount);
    players[random - 1].isNextStep = true;

    document.getElementById('statusBar').innerHTML = 'Ходит игрок ' + players[random - 1].name;
}

function randomInteger(min, max) {
    let random = min - 0.5 + Math.random() * (max - min + 1);
    random = Math.round(random);
    return random;
}

function getNextPlayerToStep() {
    let currentPlayerIndex = findCurrentPlayerIndex();
    players[currentPlayerIndex].isNextStep = false;
    if (currentPlayerIndex !== players.length - 1) {
        players[currentPlayerIndex + 1].isNextStep = true;
        document.getElementById('statusBar').innerHTML = 'Ходит игрок ' + players[currentPlayerIndex + 1].name;
    } else {
        players[0].isNextStep = true;
        document.getElementById('statusBar').innerHTML = 'Ходит игрок ' + players[0].name;
    }
}

function findCurrentPlayerIndex() {
    let currentPlayerIndex = players.findIndex(function findCurrentPlayer(player) {
        return player.isNextStep == true;
    });
    return currentPlayerIndex;
}

function placeSymbol(cellToPlace) {
    let currentPlayerIndex = findCurrentPlayerIndex();
    cellToPlace.innerHTML = players[currentPlayerIndex].symbol;
}

function addCellToPlayer(cellToAdd) {
    let currentPlayerIndex = findCurrentPlayerIndex();
    players[currentPlayerIndex].cells.push(+cellToAdd.id);
}

function checkPlayerForWin(cellToPlace) {
    checkWinNorthSouth(cellToPlace);
    checkWinWestEast(cellToPlace);
    checkWinDiagonalNorthEast(cellToPlace);
    checkWinDiagonalNorthWest(cellToPlace);
}

function checkWinNorthSouth(cellToPlace) {

    let startCell = cellToPlace.id;
    let currentPlayerIndex = findCurrentPlayerIndex();

    let arrNorthSouth = [];

    let northCell = +startCell - settings.colsAmount;
    let northCellContent = document.getElementById(northCell);

    let southCell = +startCell + settings.colsAmount;
    let southCellContent = document.getElementById(southCell);

    while (northCell >= 0 && northCellContent.innerHTML == players[currentPlayerIndex].symbol) {
        arrNorthSouth.push(northCell);
        //console.log('North PUSH ' + northCell);
        northCell = +northCell - settings.colsAmount;
        northCellContent = document.getElementById(northCell);
    }
    while (southCell < settings.colsAmount * settings.rowsAmount && southCellContent.innerHTML == players[currentPlayerIndex].symbol) {
        arrNorthSouth.push(southCell);
        //console.log('South PUSH ' + southCell);
        southCell = +southCell + settings.colsAmount;
        southCellContent = document.getElementById(southCell);
    }
    sendWinMessage(arrNorthSouth);


    arrNorthSouth = [];
}

function checkWinWestEast(cellToPlace) {

    let startCell = cellToPlace.id;
    let currentPlayerIndex = findCurrentPlayerIndex();

    let arrWestEast = [];

    let westCell = +startCell - 1;
    let westCellContent = document.getElementById(westCell);

    let eastCell = +startCell + 1;
    let eastCellContent = document.getElementById(eastCell);

    while (westCell >= startCell - startCell % settings.colsAmount && westCellContent.innerHTML == players[currentPlayerIndex].symbol) {
        arrWestEast.push(westCell);
        //console.log('West PUSH ' + westCell);
        westCell = westCell - 1;
        westCellContent = document.getElementById(westCell);
    }
    while (eastCell < settings.colsAmount * settings.rowsAmount && eastCellContent.innerHTML == players[currentPlayerIndex].symbol) {

        arrWestEast.push(eastCell);
        //console.log('East PUSH ' + eastCell);
        eastCell = eastCell + 1;
        eastCellContent = document.getElementById(eastCell);

        if (eastCell % settings.colsAmount == 0) {
            break;
        }

    }
    sendWinMessage(arrWestEast);

    arrWestEast = [];
}

function checkWinDiagonalNorthEast(cellToPlace) {

    let startCell = cellToPlace.id;
    let currentPlayerIndex = findCurrentPlayerIndex();

    let arrDiagonalNorthEast = [];

    let northEastCell = +startCell - settings.colsAmount + 1;
    let northEastCellContent = document.getElementById(northEastCell);

    let southWestCell = +startCell + settings.colsAmount - 1;
    let southWestCellContent = document.getElementById(southWestCell);

    while (northEastCell > 0 && (startCell + 1) % settings.colsAmount != 0 && northEastCellContent.innerHTML == players[currentPlayerIndex].symbol) {

        arrDiagonalNorthEast.push(northEastCell);
        //console.log('NorthEast PUSH ' + northEastCell);
        northEastCell = northEastCell - settings.colsAmount + 1;
        northEastCellContent = document.getElementById(northEastCell);

        if (northEastCell % settings.colsAmount == 0) {
            break;
        }

    }
    while (southWestCell < settings.colsAmount * settings.rowsAmount && startCell % settings.colsAmount != 0 && southWestCellContent.innerHTML == players[currentPlayerIndex].symbol) {
        arrDiagonalNorthEast.push(southWestCell);
        //console.log('SouthWest PUSH ' + southWestCell);

        if (southWestCell % settings.colsAmount == 0) {
            break;
        }

        southWestCell = southWestCell + settings.colsAmount - 1;
        southWestCellContent = document.getElementById(southWestCell);
    }

    sendWinMessage(arrDiagonalNorthEast);
    arrDiagonalNorthEast = [];
}

function checkWinDiagonalNorthWest(cellToPlace) {

    let startCell = cellToPlace.id;
    let currentPlayerIndex = findCurrentPlayerIndex();

    let arrDiagonalNorthWest = [];

    let northWestCell = +startCell - settings.colsAmount - 1;
    let northWestCellContent = document.getElementById(northWestCell);

    let southEastCell = +startCell + settings.colsAmount + 1;
    let southEastCellContent = document.getElementById(southEastCell);

    while (northWestCell >= 0 && startCell % settings.colsAmount != 0 && northWestCellContent.innerHTML == players[currentPlayerIndex].symbol) {
        arrDiagonalNorthWest.push(northWestCell);
        //console.log('NorthWest PUSH ' + northWestCell);

        if (northWestCell % settings.colsAmount == 0) {
            break;
        }

        northWestCell = northWestCell - settings.colsAmount - 1;
        northWestCellContent = document.getElementById(northWestCell);

    }

    while (southEastCell < settings.colsAmount * settings.rowsAmount && (startCell + 1) % settings.colsAmount != 0 && southEastCellContent.innerHTML == players[currentPlayerIndex].symbol) {
        arrDiagonalNorthWest.push(southEastCell);
        //console.log('SouthEast PUSH ' + southEastCell);
        southEastCell = southEastCell + settings.colsAmount + 1;
        southEastCellContent = document.getElementById(southEastCell);

        if (southEastCell % settings.colsAmount == 0) {
            break;
        }

    }
    sendWinMessage(arrDiagonalNorthWest);

    arrDiagonalNorthWest = [];
}

function sendWinMessage(arr) {
    if (arr.length >= settings.winCellsAmount - 1) {
        let currentPlayerIndex = findCurrentPlayerIndex();
        alert('Победа игрока ' + players[currentPlayerIndex].name);
        renderer.settingsUpdate();
    }
    
}
