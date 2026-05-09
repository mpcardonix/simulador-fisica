//https://www.youtube.com/watch?v=sE08f4iuOhA

//labels -> quantidade de calor
//

const myChart = document.getElementById("myChart").getContext('2d')
const data = {
    labels: [0, 10, 20, 30, 40, 50, 60],
    datasets: [{
        label: 'Água',
        data: [0, 20, 20, 40, 40, 40, 60],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
}

let user_min = 0;
let user_max = 0;
let min = -20 + user_min;
let max = 100 + user_max;
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
addMaterial.addEventListener("click", function(){
    const row = document.createElement("tr")

    row.innerHTML = `
        <td><input type="text" class="form-control text-center" value="Água"></td>
        <td><input type="text" class="form-control text-center" value="-20"></td>
        <td><input type="text" class="form-control text-center" value="0"></td>
        <td><input type="text" class="form-control text-center" value="100"></td>
        <td><input type="text" class="form-control text-center" value="120"></td>
        <td><button class="btn btn-danger">Excluir</button></td>
    `

    tableBody.insertBefore(row, lastRow)
})