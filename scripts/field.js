let field = {
    settings,
    cells: [],

    generateField: function () {
        for (let c = 0; c < this.settings.colsAmount; c++) {
            for (let r = 0; r < this.settings.rowsAmount; r++) {
                let cell = {
                    type: 'free'
                };
                this.cells.push(cell);
                //console.log('Добавлено в cells' + cell);
            }
        }
    },
};
