class MaterialGraph{
    static count = 0;

    constructor(n = `Novo material (${MaterialGraph.count})`, ti = 0, tfu = 0, te = 0, m = 0, ce = 0, cl = 0, c = this.getRandomColor()){
        MaterialGraph.count++;

        this.name = n
        //this.tInicial = ti //celsius
        this.tFusao = tfu //celsius
        this.tEbulicao = te //celsius
        //this.tFinal = tfi //celsius

        this.mass = m //em gramas
        this.calor_especifico = ce //1 cal
        this.calor_latente = cl //

        this.color = c
        this.id = MaterialGraph.count;

        this.getDataset()
    }

    getDataset(t_min = -50, t_max = 120, q_min = 0, q_max = 200 * 1000){
        this.name = String(this.name)
        //this.tInicial = Number(this.tInicial)
        this.tFusao = Number(this.tFusao)
        this.tEbulicao = Number(this.tEbulicao)
        this.mass = Number(this.mass)
        this.calor_especifico = Number(this.calor_especifico)
        this.calor_latente = Number(this.calor_latente)
        this.color = String(this.color)

        // Q = m*c*Δt
        // Q = m*l
        // Q é a abcissa (X)
        // ΔT é a ordenada (Y)

        //let temp_var = tEbulicao - 1000
        //let tFinal = 



        /*let dataset = {
            label: this.name,
            data: [this.tInicial, this.tFusao, this.tFusao, this.tEbulicao, this.tEbulicao, this.tFinal],
            fill: false,
            borderColor: this.color,
            tension: 0.1
        }*/

        let coords_array = [];
        //let q = this.mass*this.calor_especifico*-1*(this.tFusao - t_min);

        let q = 0
        //console.log(this.tFusao - t_min)

        //Qualquer coisa é só colocar q/1000 no X
        //let q_start = this.mass*this.calor_especifico*(this.tFusao - t_min)
        coords_array.push({x : q/1000, y : t_min})

        q+= this.mass*this.calor_especifico*(this.tFusao - t_min)
        coords_array.push({x : q/1000, y : this.tFusao})

        q+= this.mass*this.calor_latente
        coords_array.push({x : q/1000, y : this.tFusao})

        q+= this.mass*this.calor_especifico*(this.tEbulicao - this.tFusao)
        coords_array.push({x : q/1000, y : this.tEbulicao})

        q+= this.mass*this.calor_latente
        coords_array.push({x : q/1000, y : this.tEbulicao})

        q+= this.mass*this.calor_especifico*(t_max - this.tEbulicao)
        coords_array.push({x : q/1000, y : t_max})

        //delta T = (m*c)/q

        let dataset = {
            label: this.name,
            data: coords_array,
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
    t_min = -50
    t_max = 120
    q_min = 0
    q_max = 200

    getCompleteDataset(){
        let dataset_array = []
        //console.log(this.material_list)

        this.material_list.forEach(material => {
            dataset_array.push(material.getDataset(this.t_min, this.t_max, this.q_min * 1000, this.q_max  * 1000))
        });

        //console.log(dataset_array)
        return dataset_array
    }
}