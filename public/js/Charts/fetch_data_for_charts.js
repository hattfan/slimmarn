var statistics, users, games;
//Borde ta ut /api/statistics/***SPELVAL*** för att inte hämta all data

Promise.all([
  fetch("/stats/matches"),
  fetch("/stats/users"),
  fetch("/stats/games")
]).then(([statisticsFromDb, usersFromDb, gamesFromDb]) => {
    statisticsFromDb.json().then(data => {
        statistics = data;
    });
    usersFromDb.json().then(data => {
        users = data;
    });
    gamesFromDb.json().then(data => {
        games = data;
    });
}).catch((err) => {
    console.log(err);
});
