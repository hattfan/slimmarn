const data = fetchStringifyedData();
const workoutsPerUser = JSON.parse(data.usersWithWorkouts);
const workoutsPerUserCurrentMonth = JSON.parse(data.usersWithWorkoutsCurrentMonth);
const workoutsForUser = JSON.parse(data.workoutsForUser);
const deviceWidth = window.screen.width;
const monthlyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).format('YYYY') === moment().format('YYYY') && moment(workout.createdat).format('MM') === moment().format('MM'));

drawBarGraph(null,'month');

function drawBarGraph(target, choice) {
    document.querySelector("#bar-chart-container").innerHTML = "";
    document.querySelector("#bar-chart-container").innerHTML = "<canvas id='myChart'></canvas>";

    if(target != null) {markBarActive(target);}

    var chartData = {
        'labels': [],
        'data': []
    };

    switch (choice) {
        case 'month':
            graphData = workoutsPerUserCurrentMonth;
            break;
        case 'total':
            graphData = workoutsPerUser;
            break;
        default:
            break;
    }
    graphData.forEach(workoutUser => {
        var nameLabel = "";
        workoutUser.name.split(" ").forEach(part => {
            nameLabel = nameLabel + part.substring(0, 1);
        });

        chartData.labels.push(nameLabel);
        chartData.data.push(workoutUser.timeTrained);
    })

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    data: chartData.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                display: false,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            },
            title: {
                display: false,
                text: 'Minuter tränade'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });
}

function markBarActive(target){
    document.querySelectorAll('.bar-graph-btn').forEach(graphBtn => {
        graphBtn.classList.remove('active');
    });
    document.querySelector("#bar-chart-text").textContent = target.textContent;
    target.classList.toggle('active');
}