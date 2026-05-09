//https://www.youtube.com/watch?v=sE08f4iuOhA

//labels -> quantidade de calor
//

const myChart = document.getElementById("myChart").getContext('2d')
let datasets = []

const data = {
    labels: [0, 10, 20, 30, 40, 50],
    datasets: datasets
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

function addRow(){
    let newMaterial = new MaterialGraph()
    datasets.push(newMaterial.dataset)
    lineChart.update()



    const row = document.createElement("tr")
    const rowId = "m" + MaterialGraph.count

    row.id=rowId;
    row.innerHTML = `
        <td><input type="text" name="name" class="form-control text-center" value="Novo Material"></td>
        <td><input type="text" name="tInicial" class="form-control text-center" value="0"></td>
        <td><input type="text" name="tFusao" class="form-control text-center" value="0"></td>
        <td><input type="text" name="tEbulicao" class="form-control text-center" value="0"></td>
        <td><input type="text" name="tFinal" class="form-control text-center" value="0"></td>
        <td><input type="color" name="color" class="form-control text-center" value="`+ newMaterial.color +`"></td>
        <td><button class="btn btn-danger">Excluir</button></td>`
    tableBody.insertBefore(row, lastRow)

    const inputRow = document.getElementById(rowId).querySelectorAll('input');
    inputRow.forEach(input => {
        input.addEventListener("change", (event) =>{
            console.log(event)
            const variable = input.getAttribute("name")
            newMaterial[variable] = input.value
            newMaterial.updateDataset()
            datasets[newMaterial.pos] = newMaterial.dataset

            lineChart.update()
        })
    })

    const deleteButton = document.getElementById(rowId).querySelectorAll('button')
    deleteButton.forEach(button => {
        button.addEventListener("click", () =>{
            datasets.pop(rowId.slice(1))

            const deletedRow = document.getElementById(rowId)
            console.log(datasets)
            tableBody.removeChild(deletedRow)
            lineChart.update()
        })
    })

    return newMaterial
}

addMaterial.addEventListener("click", addRow)



function init(){
    newMaterial = addRow()

    const inputs = document.getElementById("m0").querySelectorAll('input')
    const template = ["Água", -20, 0, 100, 120, 'rgb(71, 221, 221)']

    inputs.forEach((input, index) => {
        input.value = template[index]

        const variable = input.getAttribute("name")
        newMaterial[variable] = input.value
        newMaterial.updateDataset()
        datasets[newMaterial.pos] = newMaterial.dataset
        datasets[newMaterial.pos] = newMaterial.dataset

        lineChart.update()
    });


}

init()