class World {
    constructor() {
        let x = floor(Math.random() * 400);
        let y = floor(Math.random() * 400);
        this.food = createVector(x, y);

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

        console.log(this.obstacle);
    }

    getFood() {
        return this.food;
    }

    update() {
        stroke(0);
        fill(127);
        circle(this.food.x, this.food.y, 5);
        stroke(0);
        fill(168);
        quad(this.obstacle[0], this.obstacle[1], this.obstacle[2], this.obstacle[3], this.obstacle[4], this.obstacle[5], this.obstacle[6], this.obstacle[7]);
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