let settings = {
    colsAmount: 3,
    rowsAmount: 3,
    playersAmount: 2,
    winCellsAmount: 3,
    
    updateFieldSize: function () {
        let getFieldSize = +document.getElementById('inputFieldSize').value;
        if (this.validateFieldSize(getFieldSize)) {
            this.colsAmount = getFieldSize;
            this.rowsAmount = this.colsAmount;
        }
    },

    updatePlayersAmount: function () {
        let getPlayersAmount = +document.getElementById('inputPlayersAmount').value;
        if (this.validatePlayersAmount(getPlayersAmount)) {
            this.playersAmount = getPlayersAmount;
            deletePlayers();
        }
    },

    updateWinCellsAmount: function () {
        let getWinCellsAmount = +document.getElementById('inputWinCellsAmount').value;
        if (this.validateWinCellsAmount(getWinCellsAmount)) {
            this.winCellsAmount = getWinCellsAmount;
        }
    },

    validateFieldSize: function (FieldSize) {
        if (FieldSize < 3 || isNaN(FieldSize)) {
        alert('Введен неверный размер поля! Размер должен быть не меньше 3-х!');
        renderer.render();
        } else {
            return true;
        }
    },

    validatePlayersAmount: function (PlayersAmount) {
        if (PlayersAmount < 1 || isNaN(PlayersAmount)) {
        alert('Введено неверное количество игроков! Игроков должно быть не меньше одного!');
        renderer.render();
        } else {
            return true;
        }
    },

    validateWinCellsAmount: function (winCellsAmount) {
        if (winCellsAmount < 3 || isNaN(winCellsAmount)) {
            alert('Введено неверное количество клеток для победы! Клеток должно быть не меньше 3-х!');
            renderer.render();
        } else {
            return true;
        }
    },
};

