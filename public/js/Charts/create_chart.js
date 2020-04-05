var colors = ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"];
var players = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8'];
var playerResults = ['player1result', 'player2result', 'player3result', 'player4result', 'player5result', 'player6result', 'player7result', 'player8result'];
var names, gameChoice, idOfPlayers, gameId;
var result = []; 
var playerAttributes = {};
var originalFilterForSpecificGame = {};

document.querySelectorAll(".game-selector").forEach(selector =>{
    selector.addEventListener("click", btn => {
        drawChart(btn.target.dataset.id);
    });
});

function drawChart(idOfSelectedGame) {
    resetCharts();
    gameChoice = statistics.filter(row => row.game === idOfSelectedGame);
    idOfPlayers = uniquePlayers(gameChoice); 
    names = convertIdsIntoNames(idOfPlayers);
    playerAttributes['names'] = convertIdsIntoNames(idOfPlayers);
    originalFilterForSpecificGame['names'] = convertIdsIntoNames(idOfPlayers);
    playerAttributes['ids'] = idOfPlayers;
    originalFilterForSpecificGame['ids'] = uniquePlayers(gameChoice);
    for (var i = 0; i < idOfPlayers.length; i++) result[i] = calculateGames(gameChoice, idOfPlayers[i]);
    generatePlayerButtons(playerAttributes);
    drawLineChart(idOfSelectedGame, idOfPlayers, gameChoice, result);
    drawBarChart(idOfSelectedGame, idOfPlayers, gameChoice);
    drawComboChart(idOfSelectedGame, idOfPlayers, gameChoice);
    //drawBarChart(idOfSelectedGame, idOfPlayers, gameChoice, labelsForChart);
}


function generatePlayerButtons(names) {
    document.querySelector(".player-button-container").style.display ==="none"?document.querySelector(".player-button-container").style.display = "":null;
    var playerContainer = document.querySelector(".player-button-container");
    var buttons = "";
    for (var i = 0; i < playerAttributes.names.length; i++) {
        var name = playerAttributes.names[i];
        var id = playerAttributes.ids[i]
        buttons = buttons + `<button data-name="${name}" data-id="${id}" data-key="active" class="active-player player-button btn btn-success">🙋‍♂️ ${name}</button>`
    }
    playerContainer.innerHTML = '<button data-key="show-all" class="player-button btn btn-info">📌 Filtrera</button>' + '<button data-key="show-all" class="player-button btn btn-success">📈 Alla</button>' + buttons;
    playerButtonColoring();
}

function convertIdsIntoNames(idOfPlayers) {
    var names = [];
    idOfPlayers.forEach(name => {
        var namn = users.filter(user => user._id === name);
        names.push(namn[0].username);
    })
    return names;

}


function calculateAverage(result) {
    var sum = 0;
    var filtered = result.filter(el => el != null);
    for (var i = 0; i < filtered.length; i++) {
        sum += parseInt(filtered[i], 10); //don't forget to add the base
    }
    var avg = sum / filtered.length;
    return avg;
}

function standardDeviation(values) {
    var filteredValues = values.filter(el => el != null);
    var avg = calculateAverage(values);

    var squareDiffs = filteredValues.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = calculateAverage(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function calculateGames(gameChoice, nameOfPlayer) {
    var playerResult = [];
    //Nu kollar den varje game
    for (var i = 0; i < gameChoice.length; i++) {
        for (var j = 0; j < players.length; j++) {
            gameChoice[i][players[j]] === nameOfPlayer ? playerResult.push(gameChoice[i][playerResults[j]]) : null;
        }
        if (playerResult[i] === undefined) playerResult[i] = null;
    }
    //TODO! -Det här blir fel, då varje resultat måste komma på rätt x-värde. Tex om någon inte spelat någon match. Fixa senare
    return playerResult;
}

function uniquePlayers(gameChoice) {
    var flags = [], output = [], l = gameChoice.length, i;
    players.forEach(player => {
        for (i = 0; i < l; i++) {
            if (flags[gameChoice[i][player]]) continue;
            flags[gameChoice[i][player]] = true;
            gameChoice[i][player].length > 0 ? output.push(gameChoice[i][player]) : null;
        };
    });
    return output;
}



function resetCharts() {
    $('#line-chart').remove(),$('#main-chart-container').append('<canvas id="line-chart"></canvas>');
    $('#bar-chart').remove(), $('#bar-chart-container').append('<canvas id="bar-chart"></canvas>');
    $('#grouped-bar-chart').remove(), $('#grouped-bar-chart-container').append('<canvas id="grouped-bar-chart"></canvas>');
}
