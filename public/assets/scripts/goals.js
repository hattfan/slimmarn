const workoutsForUser = JSON.parse(data.workoutsForUser);
const userWeeklyGoal = JSON.parse(data.userGoal);

//! Detta ska flyttas till egen .js
//Filtrera ut veckans träningspass
// const weeklyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).add(-1, 'days').isoWeek() === moment().add(-1, 'days').isoWeek());
const weeklyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).isoWeek() === moment().isoWeek());
const monthlyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).format('MM') === moment().format('MM'));
const yearlyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).format('YYYY') === moment().format('YYYY'));

//Sätt text på weekly-goal text och bar
setGoalBars(userWeeklyGoal, weeklyWorkouts, monthlyWorkouts, yearlyWorkouts);

function setGoalBars(userWeeklyGoal, weeklyWorkouts, monthlyWorkouts, yearlyWorkouts) {
    //Weekly
    const weeklyProgress = Math.round(sumObject(weeklyWorkouts) / userWeeklyGoal * 100);
    const weeklyGoalBar = document.querySelector('#weeklyGoalBar');
    document.querySelector('#weeklyGoalText').textContent = weeklyProgress;
    weeklyGoalBar.setAttribute("aria-valuenow", weeklyProgress);
    weeklyGoalBar.style.width = `${weeklyProgress}%`;
    if ((moment().day() / 7 * 100) >= weeklyProgress) {
        weeklyGoalBar.classList.add('bg-danger');
        weeklyGoalBar.classList.remove('bg-success');
    } else {
        weeklyGoalBar.classList.add('bg-success');
        weeklyGoalBar.classList.remove('bg-danger');
    }

    //Monthly
    const monthlyProgress = Math.round(sumObject(monthlyWorkouts) / (moment().daysInMonth() * (1/7) * userWeeklyGoal)*100);
    const monthlyGoalBar = document.querySelector('#monthlyGoalBar');
    document.querySelector('#monthlyGoalText').textContent = monthlyProgress;
    monthlyGoalBar.setAttribute("aria-valuenow", monthlyProgress);
    monthlyGoalBar.style.width = `${monthlyProgress}%`;
    debugger;
    if ((parseInt(moment().format('D')) / moment().daysInMonth() * 100) >= monthlyProgress) {
        monthlyGoalBar.classList.add('bg-danger');
        monthlyGoalBar.classList.remove('bg-success');
    } else {
        monthlyGoalBar.classList.add('bg-success');
        monthlyGoalBar.classList.remove('bg-danger');
    }

    //Yearly
    const yearlyProgress = Math.round(sumObject(yearlyWorkouts) / (365 * (1/7) * userWeeklyGoal)*100);
    const yearlyGoalBar = document.querySelector('#yearlyGoalBar');
    document.querySelector('#yearlyGoalText').textContent = yearlyProgress;
    yearlyGoalBar.setAttribute("aria-valuenow", yearlyProgress);
    yearlyGoalBar.style.width = `${yearlyProgress}%`;
    debugger;
    if ((moment().dayOfYear() / 365 * 100) >= yearlyProgress) {
        yearlyGoalBar.classList.add('bg-danger');
        yearlyGoalBar.classList.remove('bg-success');
    } else {
        yearlyGoalBar.classList.add('bg-success');
        yearlyGoalBar.classList.remove('bg-danger');
    }
}


var choice = "";
switch (choice) {
    case 'week':
        break;
    default:
        break;
}
var labels = [];

var data = weeklyData(weeklyWorkouts);

new Chart(document.getElementById("goal-chart"), {
    type: 'line',

    data: {
        labels: labels,
        datasets: [{
            data: data.goalData,
            label: "Mål",
            borderColor: "black",
            fill: false
        }, {
            data: data.actuals,
            label: "Utfall",
            borderColor: "red",
            fill: false
        }
        ]
    },
    options: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Måluppfyllnad'
        }
    }
});

function weeklyData(weeklyWorkouts) {
    var currentDate = moment().add(-1, 'days'); //lägger till en dag för att måndag ska vara första dagen
    var weekStart = currentDate.clone().startOf('week').add(1, 'days');
    var weekEnd = currentDate.clone().endOf('week').add(1, 'days');
    var goalData = [];
    var actuals = [];

    var sum = 0;
    var isFinished = false;
    for (i = 0; i <= 6; i++) {
        labels.push(moment(weekStart).add(i, 'days').format("DD") + "/" + moment(weekStart).add(i, 'days').format("MM"));
        goalData[i] = userWeeklyGoal * (i / 6);
        weeklyWorkouts.forEach(workout => {
            if (moment(workout.createdat).startOf('day').isSame(moment(weekStart).add(i, 'days').startOf('day'))) {
                sum += workout.workoutTime;
                countOccations += 1;
            };
        })
        if (moment(weekStart).add(i, 'days').isSame(moment().startOf('day'))) { isFinished = true };
        if (!isFinished) {
            actuals[i] = sum;
        }
    };
    return { actuals: actuals, goalData: goalData }
}

function sumObject(objectToSum) {
    var sum = 0;
    objectToSum.forEach(arr => {
        sum += arr.workoutTime;
    })
    return sum;
}