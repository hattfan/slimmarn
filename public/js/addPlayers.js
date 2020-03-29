document.querySelector("#addPlayers").addEventListener("click", function(){
    var hiddenPlayers = document.querySelectorAll("div[style*='display:none']");
    if(hiddenPlayers.length > 0) {
        hiddenPlayers[0].style.display = "";
    }
    else {
        document.querySelector("#addPlayers").style.display = "none";
    }
})