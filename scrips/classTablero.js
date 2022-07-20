export class Tablero {
    constructor(obj) {
        this.width = obj.width;
        this.height = obj.height;
        this.rows = 8;
        this.col = 8;
        this.cellWidth = this.width / this.col;
        this.cellHeight = this.height / this.rows
        this.piecesMatrix = [];
        this.theme = {};
        this.context = null;
    }

    renderTablero() {
        for (let x = 0; x < this.col; x++) {
            for (let y = 0; y < this.rows; y++) {

                let rectColor = this.theme.light;

                if ((x + y) % 2) {
                    rectColor = this.theme.dark;
                }

                this.context.fillStyle = rectColor;
                this.context.fillRect(
                    x * this.cellWidth,
                    y * this.cellHeight,
                    this.cellWidth,
                    this.cellHeight
                );

                const pieza = this.piecesMatrix[x][y];
                if (pieza) {
                    this.context.textBaseline = 'middle';
                    this.context.textAlign = 'center';
                    this.context.fillStyle = pieza.color;
                    this.context.font = `${this.cellHeight * 0.75}px Arial`;
                    this.context.fillText(
                        pieza.type,
                        x * this.cellWidth + this.cellWidth / 2,
                        y * this.cellHeight + this.cellHeight / 2
                    );
                }
            }
        }
    }
    reziseTablero(width, height) {
        this.cellWidth = width / this.col;
        this.cellHeight = height / this.rows
    }
}