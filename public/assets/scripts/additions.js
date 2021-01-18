var data = fetchStringifyedData();
var workoutsPerUser = JSON.parse(data.usersWithWorkouts);
console.log(workoutsPerUser);

// var workoutsPerUser = users.map(user => {
//     var workoutsForUser = workouts.filter(workout => workout.userId.str === user._id.str);
//     var timeTrained = 0;
//     workoutsForUser.forEach(workout => {
//         timeTrained = timeTrained + workout.workoutRounds * 5})
//     return {
//         user: user.profile.name,
//         minutesTrained: timeTrained
//     }
// });

var chartData = {
    'labels': [],
    'data': []
};

workoutsPerUser.forEach(workoutPerUser => {
    chartData.labels.push(workoutPerUser.name);
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


// var barChartData = {
//     labels: ['Vecka', 'Månad', 'Kvartal', 'År'],
//     datasets: [{
//         label: 'Mål',
//         backgroundColor: window.chartColors.red,
//         stack: 'Stack 0',
//         data: [
//             100,
//             100,
//             100,
//             100,
//         ]
//     }, {
//         label: 'Dataset 3',
//         backgroundColor: window.chartColors.green,
//         stack: 'Stack 1',
//         data: [
//             25,
//             25,
//             25,
//             25
//         ]
//     }]

// };
// window.onload = function() {
//     var ctx = document.getElementById('myChart').getContext('2d');
//     window.myBar = new Chart(ctx, {
//         type: 'bar',
//         data: barChartData,
//         options: {
//             title: {
//                 display: true,
//                 text: 'Chart.js Bar Chart - Stacked'
//             },
//             tooltips: {
//                 mode: 'index',
//                 intersect: false
//             },
//             responsive: true,
//             scales: {
//                 xAxes: [{
//                     stacked: true,
//                 }],
//                 yAxes: [{
//                     stacked: true
//                 }]
//             }
//         }
//     });
// };

// // document.getElementById('randomizeData').addEventListener('click', function() {
// //     barChartData.datasets.forEach(function(dataset) {
// //         dataset.data = dataset.data.map(function() {
// //             return randomScalingFactor();
// //         });
// //     });
// //     window.myBar.update();
// // });



// window.chartColors = {
// 	red: 'rgb(255, 99, 132)',
// 	orange: 'rgb(255, 159, 64)',
// 	yellow: 'rgb(255, 205, 86)',
// 	green: 'rgb(75, 192, 192)',
// 	blue: 'rgb(54, 162, 235)',
// 	purple: 'rgb(153, 102, 255)',
// 	grey: 'rgb(201, 203, 207)'
// };

// (function(global) {
// 	var MONTHS = [
// 		'January',
// 		'February',
// 		'March',
// 		'April',
// 		'May',
// 		'June',
// 		'July',
// 		'August',
// 		'September',
// 		'October',
// 		'November',
// 		'December'
// 	];

// 	var COLORS = [
// 		'#4dc9f6',
// 		'#f67019',
// 		'#f53794',
// 		'#537bc4',
// 		'#acc236',
// 		'#166a8f',
// 		'#00a950',
// 		'#58595b',
// 		'#8549ba'
// 	];

// 	var Samples = global.Samples || (global.Samples = {});
// 	var Color = global.Color;

// 	Samples.utils = {
// 		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// 		srand: function(seed) {
// 			this._seed = seed;
// 		},

// 		rand: function(min, max) {
// 			var seed = this._seed;
// 			min = min === undefined ? 0 : min;
// 			max = max === undefined ? 1 : max;
// 			this._seed = (seed * 9301 + 49297) % 233280;
// 			return min + (this._seed / 233280) * (max - min);
// 		},

// 		numbers: function(config) {
// 			var cfg = config || {};
// 			var min = cfg.min || 0;
// 			var max = cfg.max || 1;
// 			var from = cfg.from || [];
// 			var count = cfg.count || 8;
// 			var decimals = cfg.decimals || 8;
// 			var continuity = cfg.continuity || 1;
// 			var dfactor = Math.pow(10, decimals) || 0;
// 			var data = [];
// 			var i, value;

// 			for (i = 0; i < count; ++i) {
// 				value = (from[i] || 0) + this.rand(min, max);
// 				if (this.rand() <= continuity) {
// 					data.push(Math.round(dfactor * value) / dfactor);
// 				} else {
// 					data.push(null);
// 				}
// 			}

// 			return data;
// 		},

// 		labels: function(config) {
// 			var cfg = config || {};
// 			var min = cfg.min || 0;
// 			var max = cfg.max || 100;
// 			var count = cfg.count || 8;
// 			var step = (max - min) / count;
// 			var decimals = cfg.decimals || 8;
// 			var dfactor = Math.pow(10, decimals) || 0;
// 			var prefix = cfg.prefix || '';
// 			var values = [];
// 			var i;

// 			for (i = min; i < max; i += step) {
// 				values.push(prefix + Math.round(dfactor * i) / dfactor);
// 			}

// 			return values;
// 		},

// 		months: function(config) {
// 			var cfg = config || {};
// 			var count = cfg.count || 12;
// 			var section = cfg.section;
// 			var values = [];
// 			var i, value;

// 			for (i = 0; i < count; ++i) {
// 				value = MONTHS[Math.ceil(i) % 12];
// 				values.push(value.substring(0, section));
// 			}

// 			return values;
// 		},

// 		color: function(index) {
// 			return COLORS[index % COLORS.length];
// 		},

// 		transparentize: function(color, opacity) {
// 			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
// 			return Color(color).alpha(alpha).rgbString();
// 		}
// 	};

// 	// DEPRECATED
// 	window.randomScalingFactor = function() {
// 		return Math.round(Samples.utils.rand(-100, 100));
// 	};

// 	// INITIALIZATION

// 	Samples.utils.srand(Date.now());

// 	// Google Analytics
// 	/* eslint-disable */
// 	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
// 		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
// 		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
// 		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
// 		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
// 		ga('create', 'UA-28909194-3', 'auto');
// 		ga('send', 'pageview');
// 	}
// 	/* eslint-enable */

// }(this));
