document.querySelectorAll(".chart-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        var blueButtons = document.querySelector(".btn-primary");
        if (blueButtons) {
            blueButtons.classList.remove("btn-primary");
            blueButtons.classList.add("btn-success");
        };
        e.target.classList.remove("btn-success");
        e.target.classList.add("btn-primary");
    });
});

function playerButtonColoring() {
    document.querySelectorAll(".player-button").forEach(btn => {
        btn.addEventListener("click", addColoringToPlayerButton(btn));
    });
}

function addColoringToPlayerButton(btn) {
    btn.addEventListener("click", function (e) {
        if(e.target.dataset.key === "active"){
            e.target.dataset.key = "inactive";
            e.target.classList.remove("btn-success");
            e.target.classList.add("btn-primary");
            filterOutPlayer(e.target.dataset.id);
            e.target.innerText = e.target.innerText.replace("🙋‍♂️", "🤦‍♂️");
            resetCharts();
            drawLineChart(gameId, idOfPlayers, gameChoice, result);
            drawBarChart(gameId, idOfPlayers, gameChoice);
            drawComboChart(gameId, idOfPlayers, gameChoice);
        } else if (e.target.dataset.key === "inactive") {
            e.target.dataset.key = "active";
            e.target.classList.remove("btn-primary");
            e.target.classList.add("btn-success");
            addPlayerToFilter(e.target.dataset.id, e.target.dataset.name);
            e.target.innerText = e.target.innerText.replace("🤦‍♂️", "🙋‍♂️");
            resetCharts();
            drawLineChart(gameId, idOfPlayers, gameChoice, result);
            drawBarChart(gameId, idOfPlayers, gameChoice);
            drawComboChart(gameId, idOfPlayers, gameChoice);
        }
    });
}

function filterOutPlayer(idToPop) {
    for (var i = 0; i < playerAttributes.ids.length; i++) {
        if (playerAttributes.ids[i] === idToPop) {
            playerAttributes.ids.splice(i, 1);
            playerAttributes.names.splice(i, 1);
        }
    }
}

function addPlayerToFilter(idToPush, nameToPush) {
    //jämför med orginal-objektet för att placera in spelaren i rätt ställe i objektet
    for (var i = 0; i < originalFilterForSpecificGame.ids.length; i++) {
        if (originalFilterForSpecificGame.ids[i] === idToPush) {
            playerAttributes.ids.splice(i, 0, idToPush);
            playerAttributes.names.splice(i, 0, nameToPush);
        }

    }
    //if (playerAttributes.ids.indexOf(idToPush) == -1) {
    //    playerAttributes.ids.push(idToPush);
    //    playerAttributes.names.push(nameToPush);    
    //}
}