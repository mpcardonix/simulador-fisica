class MaterialGraph{
    static count = -1;

    constructor(){
        MaterialGraph.count++;

        this.name = `Novo material (${MaterialGraph.count})`;
        this.tInicial = 0;
        this.tFusao = 0;
        this.tEbulicao = 0;
        this.tFinal = 0;
        this.color = this.getRandomColor()
        this.pos = MaterialGraph.count;

        this.updateDataset()
    }

    updateDataset(){
        this.name = String(this.name)
        this.tInicial = Number(this.tInicial)
        this.tFusao = Number(this.tFusao)
        this.tEbulicao = Number(this.tEbulicao)
        this.tFinal = Number(this.tFinal)
        this.color = String(this.color)

        this.dataset = {
            label: this.name,
            data: [this.tInicial, this.tFusao, this.tFusao, this.tEbulicao, this.tEbulicao, this.tFinal],
            fill: false,
            borderColor: this.color,
            tension: 0.1
        }

        //console.log(this.dataset)
    }

    getRandomColor(){
        const hue = Math.floor(Math.random() * 360)
        return `hsl(${hue}, 65%, 50%)` // 70% Saturação e 50% luminosidade
    }
}

//add event listener dentro do próprio add event listener