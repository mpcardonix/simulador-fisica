//https://www.youtube.com/watch?v=sE08f4iuOhA

//labels -> quantidade de calor
//

const myChart = document.getElementById("myChart").getContext('2d')
let dataset = new DatasetHandler()

const data = {
    labels: [0, 10, 20, 30, 40, 50],
    datasets: dataset.getCompleteDataset()
}

let user_min = 0;
let user_max = 0;
let min = -20 + user_min;
let max = 150 + user_max;
const options = {
    responsive: true,

    scales: {
        x: {
            title: {
                display: true,
                text: 'Quantidade de calor'
            }
        },
        
        y: {
            min: min,
            max: max,

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
}

init()