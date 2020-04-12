function drawBarChart(gameId, idOfPlayers, gameChoice, labelsForChart) {
    var names = convertIdsIntoNames(idOfPlayers);
    var wins = calculateHowManyWinsTotal(gameChoice);
    var barChartDataSet = [createdatasetsForBarChart(wins, names)];
    drawActualBarChart(names,barChartDataSet, gameId);
}

function convertIdsIntoNames(idOfPlayers) {
    var names = [];
    idOfPlayers.forEach(name => {
        var namn = users.filter(user => user._id === name);

        if(namn.length >0 )
            names.push(namn[0].username);
    })
    return names;
}

function createdatasetsForBarChart(wins, names) {

    var datasetsForBarChart = {
        "label": "Vinster"
    };
    var backgroundColors = [], data = [];
    for (var i = 0; i < names.length; i++) {
        backgroundColors[i] = colors[i];
        data[i] = calculatePlayerWins(names[i], wins);
    };

    datasetsForBarChart['backgroundColor'] = backgroundColors;
    datasetsForBarChart['data'] = data;

    return datasetsForBarChart;
}

function calculatePlayerWins(name, playerWinResults) {
    var count = 0;
    var countedResults = playerWinResults.filter(winName => winName === name);
    count = countedResults.length;

    return count;
}

function calculateHowManyWinsTotal(gameChoice) {
    var playerWinResults = [];
    gameChoice.forEach(game => {
        var highestResultTemp = 0, compareResultTemp = 0, highestResultPlayer = "";
        for (var i = 0; i < playerResults.length; i++) {
            compareResultTemp = game[playerResults[i]];
            if (compareResultTemp > highestResultTemp) {
                highestResultPlayer = users.filter(user => user._id === game[players[i]])[0].username
                highestResultTemp = compareResultTemp;
            }
        }
        playerWinResults.push(highestResultPlayer);
    });
    return playerWinResults;
}

function drawActualBarChart(names, barChartDataSet, gameId) {
    var ctx = document.getElementById("bar-chart");
    ctx.height = document.getElementById("line-chart").offsetHeight / 2

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: barChartDataSet
        },
        options: {
            maintainAspectRatio: false,
            legend: { display: false },
            title: {
                display: true,
                text: "Vinster i: " + games.filter(game => gameId === game._id)[0].name
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }

                        },
                    }
                }]
            }
        }
    });

}