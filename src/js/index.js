//https://www.youtube.com/watch?v=sE08f4iuOhA

//labels -> quantidade de calor
//

const myChart = document.getElementById("myChart").getContext('2d')
let dataset = new DatasetHandler()

const data = {
    labels: [0, 10, 20, 30, 40, 50],
    datasets: dataset.getCompleteDataset()
}

let t_min = -20;
let t_max = 120;
let q_min = 0;
let q_max = 50;

const tMin = document.getElementById("tMin")
const tMax = document.getElementById("tMax")
const tUnit = document.getElementById("tUnit")
const qMin = document.getElementById("qMin")
const qMax = document.getElementById("qMax")
const qUnit = document.getElementById("qUnit")

tMin.addEventListener("change", (event) => {
    lineChart.options.scales.y.min = Number(tMin.value);
    lineChart.update()
})
tMax.addEventListener("change", (event) => {
    lineChart.options.scales.y.max = Number(tMax.value);
    lineChart.update()
})
tUnit.addEventListener("change", (event) => {
    lineChart.options.scales.y.title.text = "Temperatura (" + String(tUnit.value) + ")";
    lineChart.update()
})
qMin.addEventListener("change", (event) => {
    lineChart.options.scales.x.min = Number(qMin.value);
    lineChart.update()
})
qMax.addEventListener("change", (event) => {
    lineChart.options.scales.x.max = Number(qMax.value);
    lineChart.update()
})
qUnit.addEventListener("change", (event) => {
    lineChart.options.scales.x.title.text = "Quantidade de calor (" + String(qUnit.value) + ")";
    lineChart.update()
})

const options = {
    responsive: true,

    scales: {
        x: {
            min: q_min,
            max: q_max,

            ticks: {
                stepSize: 10
            },


            title: {
                display: true,
                text: 'Quantidade de calor (Cal)'
            }
        },
        
        y: {
            min: t_min,
            max: t_max,

            ticks: {
                stepSize: 10
            },

            title: {
                display: true,
                text: 'Temperatura (C)'
            }
        }
    }
}

const lineChart = new Chart(myChart, {
    type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: data,
    options: options
})

const tableBody = document.getElementById("tableBody")
const lastRow = document.getElementById("lastRow")
const addMaterial = document.getElementById("addMaterial")



function addRow(newMaterial = new MaterialGraph()){ //Retorna novo material
    dataset.material_list.push(newMaterial)
    lineChart.data.datasets = dataset.getCompleteDataset()
    lineChart.update()



    const row = document.createElement("tr")
    const rowId = "m" + newMaterial.id
    row.id=rowId;

    console.log(rowId)
    row.innerHTML = `
        <td><input type="text" name="name" class="form-control text-center" value="`+ newMaterial.name +`"></td>
        <td><input type="text" name="tInicial" class="form-control text-center" value="`+newMaterial.tInicial+`"></td>
        <td><input type="text" name="tFusao" class="form-control text-center" value="`+newMaterial.tFusao+`"></td>
        <td><input type="text" name="tEbulicao" class="form-control text-center" value="`+newMaterial.tEbulicao+`"></td>
        <td><input type="text" name="tFinal" class="form-control text-center" value="`+newMaterial.tFinal+`"></td>
        <td><input type="color" name="color" class="form-control text-center" value="`+ newMaterial.color +`"></td>
        <td><button class="btn btn-danger">Excluir</button></td>`
    tableBody.insertBefore(row, lastRow)

    const inputRow = document.getElementById(rowId).querySelectorAll('input');
    inputRow.forEach(input => {
        input.addEventListener("change", (event) =>{
            //console.log(event)
            const variable = input.getAttribute("name")
            newMaterial[variable] = input.value

            lineChart.data.datasets = dataset.getCompleteDataset()
            lineChart.update()
        })
    })

    const deleteButton = document.getElementById(rowId).querySelectorAll('button')
    deleteButton.forEach(button => {
        button.addEventListener("click", () =>{
            //rowId.slice(1)
            del_index = dataset.material_list.findIndex(m => m.id == Number(rowId.slice(1)))
            dataset.material_list.splice(del_index, 1)

            const deletedRow = document.getElementById(rowId)
            tableBody.removeChild(deletedRow)

            lineChart.data.datasets = dataset.getCompleteDataset()
            lineChart.update()
            //console.log(dataset.getCompleteDataset())
        })
    })

    //console.log(dataset.getCompleteDataset())
    return newMaterial
}

addMaterial.addEventListener("click", () => addRow())

function init(){
    agua = new MaterialGraph("Água", -20, 0, 100, 120, 'rgb(71, 149, 221)')
    addRow(agua)

    tMin.value = t_min;
    tMax.value = t_max;

    qMin.value = q_min;
    qMin.value = q_max; 
}

init()