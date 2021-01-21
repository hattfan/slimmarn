var data = fetchStringifyedData();
var workoutsPerUser = JSON.parse(data.usersWithWorkouts);
const deviceWidth = window.screen.width;

var chartData = {
    'labels': [],
    'data': []
};

workoutsPerUser.forEach(workoutPerUser => {
    
    var nameLabel = "";
    if (deviceWidth < 1000) {
        workoutPerUser.name.split(" ").forEach(part => {
            nameLabel = nameLabel + part.substring(0, 1);
        });
    } else {
        nameLabel = workoutPerUser.name;
    }  
    chartData.labels.push(nameLabel);
    chartData.data.push(workoutPerUser.timeTrained);
})

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    legend: {
        display: true,
        text: 'Minuter tränade'
    },
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
            display: true,
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


