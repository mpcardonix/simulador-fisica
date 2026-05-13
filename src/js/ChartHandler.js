class MaterialGraph{
    static count = 0;

    constructor(n = `Novo material (${MaterialGraph.count})`, ti = 0, tfu = 0, te = 0, tfi =0, c = this.getRandomColor()){
        MaterialGraph.count++;

        this.name = n
        this.tInicial = ti
        this.tFusao = tfu
        this.tEbulicao = te
        this.tFinal = tfi
        this.color = c
        this.id = MaterialGraph.count;

        this.getDataset()
    }

    getDataset(){
        this.name = String(this.name)
        this.tInicial = Number(this.tInicial)
        this.tFusao = Number(this.tFusao)
        this.tEbulicao = Number(this.tEbulicao)
        this.tFinal = Number(this.tFinal)
        this.color = String(this.color)

        let dataset = {
            label: this.name,
            data: [this.tInicial, this.tFusao, this.tFusao, this.tEbulicao, this.tEbulicao, this.tFinal],
            fill: false,
            borderColor: this.color,
            tension: 0.1
        }

        return dataset
    }

    getRandomColor(){
        const hue = Math.floor(Math.random() * 360)
        return `hsl(${hue}, 65%, 50%)` // 70% Saturação e 50% luminosidade
    }
}


class DatasetHandler{
    material_list = []

    getCompleteDataset(){
        let dataset_array = []
        //console.log(this.material_list)

        this.material_list.forEach(material => {
            dataset_array.push(material.getDataset())
        });

        return dataset_array
    }
}