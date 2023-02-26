class World {
    constructor() {
        this.matriz_terrenos = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        let cores = ['#bbf0e7', '#95e8da', '#0d917b', '#01382f'];
        let T = 4;
        //para cada um dos quadrados
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                //random entre os 4
                T = floor(Math.random() * 4);
                this.matriz_terrenos[i][j] = T;
                stroke(0);
                fill(cores[T]);
                rect(j * 50, i * 50, 50, 50);
            }
        }

        let x = floor(Math.random() * 8);
        let y = floor(Math.random() * 8);
        while (this.matriz_terrenos[y][x] == 3) {
            x = floor(Math.random() * 8);
            y = floor(Math.random() * 8);
        }
        this.food = createVector(25 + x * 50, 25 + y * 50);

        // Gerar as posições das regiões (obstáculo, fácil, médio, difícil)
        let x1 = floor(Math.random() * 400);
        let y1 = floor(Math.random() * 400);
        let x2 = floor(Math.random() * 400);
        let y2 = floor(Math.random() * 400);
        this.obstacle = [x1, y1, x1, y2, x2, y2, x2, y1]; // Posição central do obstáculo (mudar isso depois)

        x1 = floor(Math.random() * 400);
        y1 = floor(Math.random() * 400);
        x2 = floor(Math.random() * 400);
        y2 = floor(Math.random() * 400);
        this.easy = [x1, y1, x1, y2, x2, y2, x2, y1]; // Posição central do obstáculo (mudar isso depois)
    }

    getFood() {
        return this.food;
    }

    update() {
        stroke(0);
        fill(255);
        circle(this.food.x, this.food.y, 8);
        stroke(0);
        fill(168);
    }

    generateWorld() {

        //Configurar retângulo na tela para representar o obstáculo

        x = floor(Math.random() * 400);
        y = floor(Math.random() * 400);
        this.obstacle = createVector(x, y); // Posição central do obstáculo?
        // Gerar a matriz de vértices com os devidos pesos
        // 
    }
}