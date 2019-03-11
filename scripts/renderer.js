let renderer = {
    settings,
    field,

    renderCells: function () {
        document.getElementById('statusBar').innerHTML = 'Начните игру...';
        
        let fieldWrapper = document.getElementById('game');
        fieldWrapper.innerHTML = '';

        for (let i = 0, totalCellsAmount = 0; i < this.settings.colsAmount; i++) {
            let fieldColumn = document.createElement('tr');
            fieldWrapper.appendChild(fieldColumn);

            for (let c = 0; c < this.settings.rowsAmount; c++, totalCellsAmount++) {
                let fieldCell = document.createElement('td');
                fieldCell.setAttribute('id', totalCellsAmount)
                fieldCell.className = 'free';
                this.addPlaceEvent(fieldCell);
                fieldColumn.appendChild(fieldCell);
            }
        }
    },

    addPlaceEvent: function (element) {
        element.addEventListener('click', function (e) {
            let cellToPlace = document.getElementById(e.target.id);

            if (cellToPlace.innerHTML == '') {
                placeSymbol(cellToPlace);
                addCellToPlayer(cellToPlace);
                //checkPlayerIfWin();
                checkPlayerForWin(cellToPlace);
                getNextPlayerToStep();
            }

        });
    },

    render: function () {
        this.renderCells();
        this.renderSettings();
    },

    renderSettings: function () {
        this.renderFieldSize();
        this.renderPlayersAmount();
        this.renderWinCellsAmount();
    },

    renderFieldSize: function () {
        document.getElementById('inputFieldSize').value = this.settings.colsAmount;
    },

    renderPlayersAmount: function () {
        document.getElementById('inputPlayersAmount').value = this.settings.playersAmount;
    },

    renderWinCellsAmount: function () {
        document.getElementById('inputWinCellsAmount').value = this.settings.winCellsAmount;
    },

    settingsUpdate: function () {
        settings.updateFieldSize();
        settings.updatePlayersAmount();
        settings.updateWinCellsAmount();
        field.generateField();
        this.render();
        this.enableStartButton();
    },

    disableStartButton: function () {
        document.getElementById('startButton').disabled = true;
    },

    enableStartButton: function () {
        document.getElementById('startButton').disabled = false;
    }

}
