class World {
    constructor() {

        let T = 4;
        //para cada um dos quadrados
        this.matriz_terrenos = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            this.matriz_terrenos[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                //random entre os 4 tipos de terreno
                T = floor(Math.random() * 4);
                this.matriz_terrenos[i][j] = T;
                console.log(this.matriz_terrenos);
                stroke(0);
                fill(cores[T]);
                rect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        console.log(this.matriz_terrenos);

        let x = floor(Math.random() * BOARD_TILES);
        let y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[y][x] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.food = createVector(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);

        x = floor(Math.random() * BOARD_TILES);
        y = floor(Math.random() * BOARD_TILES);
        while (this.matriz_terrenos[y][x] == 3) {
            x = floor(Math.random() * BOARD_TILES);
            y = floor(Math.random() * BOARD_TILES);
        }
        this.agent = new Vehicle(TILE_SIZE / 2 + x * TILE_SIZE, TILE_SIZE / 2 + y * TILE_SIZE);
    }

    getFood() {
        return this.food;
    }

    update() {

        stroke(0);
        fill(255);
        circle(this.food.x, this.food.y, 16);
        stroke(0);
        fill(168);
        this.agent.show();

        this.djikstraAux();
        this.agent.update();
    }

    delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    minDistance(dist, visited) {
        let min = Number.MAX_VALUE;
        let indexX = -1;
        let indexY = -1;
        console.log(dist);
        console.log("Terrenos: ", this.matriz_terrenos);
        //Testar a menor distância entre os adjacentes
        for (let v = 0; v < BOARD_TILES; v++) {
            for (let u = 0; u < BOARD_TILES; u++) {
                if (visited[v][u] == false && dist[v][u] < min && this.matriz_terrenos[v][u] != 3) {
                    console.log("checando: ", v, u, ": ", this.matriz_terrenos[v][u]);
                    min = dist[v][u];
                    indexX = v;
                    indexY = u;
                }
            }
        }
        console.log(indexX, indexY);
        return [indexX, indexY];
    }

    async djikstraAux() {

        let D = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            D[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                D[i][j] = Number.MAX_VALUE;
            }
        }

        let visited = new Array(BOARD_TILES);
        for (var i = 0; i < BOARD_TILES; i++) {
            visited[i] = new Array(BOARD_TILES).fill(0);
            for (var j = 0; j < BOARD_TILES; j++) {
                visited[i][j] = false;
            }
        }

        let discreteX = (this.agent.pos.x - TILE_SIZE / 2) / TILE_SIZE;
        let discreteY = (this.agent.pos.y - TILE_SIZE / 2) / TILE_SIZE;

        D[discreteX][discreteY] = 0;

        stroke(0);
        strokeWeight(1);
        fill(50);
        rect(discreteX * TILE_SIZE, discreteY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        this.agent.show();
        for (var i = 0; i < BOARD_TILES * BOARD_TILES; i++) {

            await this.delay(1000);
            let index = this.minDistance(D, visited);

            visited[index[0]][index[1]] = true;
            stroke(0);
            strokeWeight(1);
            fill(50);
            rect(index[0] * TILE_SIZE, index[1] * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            this.agent.show();

            if ((this.food.x == TILE_SIZE / 2 + index[0] * TILE_SIZE) && (this.food.y == TILE_SIZE / 2 + index[1] * TILE_SIZE)) {
                console.log("Achei: ", index);
                break;
            }

            let Terreno = this.matriz_terrenos[index[0]][index[1]];
            //atualizar a distância dos vértices adjacentes ( [x+1,y], [x,y+1], [x-1,y], [x,y-1]) com o valor do terreno atual
            if (index[0] < BOARD_TILES - 1) {
                Terreno = this.matriz_terrenos[index[0] + 1][index[1]];
                if (Terreno + D[index[0]][index[1]] < D[index[0] + 1][index[1]])
                    D[index[0] + 1][index[1]] = Terreno + 1 + D[index[0]][index[1]];
            }
            if (index[1] < BOARD_TILES - 1) {
                Terreno = this.matriz_terrenos[index[0]][index[1] + 1];
                if (Terreno + D[index[0]][index[1]] < D[index[0]][index[1] + 1])
                    D[index[0]][index[1] + 1] = Terreno + 1 + D[index[0]][index[1]];
            }
            if (index[0] > 0) {
                Terreno = this.matriz_terrenos[index[0] - 1][index[1]];
                if (Terreno + D[index[0]][index[1]] < D[index[0] - 1][index[1]])
                    D[index[0] - 1][index[1]] = Terreno + 1 + D[index[0]][index[1]];
            }
            if (index[1] > 0) {
                Terreno = this.matriz_terrenos[index[0]][index[1] - 1];
                if (Terreno + D[index[0]][index[1]] < D[index[0]][index[1] - 1])
                    D[index[0]][index[1] - 1] = Terreno + 1 + D[index[0]][index[1]];
            }
            console.log(D);

        }

    }
}