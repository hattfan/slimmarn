function drawComboChart(gameId, idOfPlayers, gameChoice, labelsForChart, result) {
    var datasetForComboChart = createdatasetsForComboChart(idOfPlayers, gameChoice, result);
    drawActualComboChart(names, datasetForComboChart, gameId);
}

function createdatasetsForComboChart(idOfPlayers, gameChoice, result) {

    var result, datasetForComboChart = {}, playerAverage = [], playerStandardDev = [];

    for (var i = 0; i < idOfPlayers.length; i++) {
        result = calculateGames(gameChoice, idOfPlayers[i]);
        playerAverage[i] = Math.round(calculateAverage(result) * 10) / 10;
        playerStandardDev[i] = Math.round(standardDeviation(result) * 10) / 10;
    }
    datasetForComboChart["bar"] = playerAverage;
    datasetForComboChart["line"] = playerStandardDev;

    return datasetForComboChart;
}

function drawActualComboChart(names, datasetForComboChart, gameId) {
    var ctx = document.getElementById("grouped-bar-chart");
    ctx.height = document.getElementById("line-chart").offsetHeight / 2

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: "StdDev",
                type: "line",
                borderColor: "rgba(0,0,0,0.3)",
                data: datasetForComboChart.line,
                fill: false
            }, {
                label: "Medelvärde",
                type: "bar",
                backgroundColor: "rgba(100, 100, 200, 0.3)",
                data: datasetForComboChart.bar,
            }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'StdDev & Medelvärde'
            },
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}