const workoutsForUser = JSON.parse(data.workoutsForUser);
const userWeeklyGoal = JSON.parse(data.userGoal);
const userMonthlyGoal = ((moment().daysInMonth()-1) / 7) * userWeeklyGoal;

//! Detta ska flyttas till egen .js
//Filtrera ut veckans träningspass
// const weeklyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).add(-1, 'days').isoWeek() === moment().add(-1, 'days').isoWeek());
const weeklyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).isoWeek() === moment().isoWeek());
const weeklyProgress = Math.round(sumObject(weeklyWorkouts) / userWeeklyGoal * 100);

const monthlyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).format('MM') === moment().format('MM'));
const monthlyProgress = Math.round(sumObject(monthlyWorkouts) / (moment().daysInMonth() * (1/7) * userWeeklyGoal)*100);

const yearlyWorkouts = workoutsForUser.filter(workout => moment(workout.createdat).format('YYYY') === moment().format('YYYY'));

//Sätt text på weekly-goal text och bar
setGoalBars(userWeeklyGoal, weeklyProgress, weeklyWorkouts, monthlyWorkouts, yearlyWorkouts);
//draw init graph week
drawLineGraph(null,'week');

function setGoalBars(userWeeklyGoal, weeklyWorkouts, weeklyWorkouts, monthlyWorkouts, yearlyWorkouts) {
    //Weekly
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
    const monthlyGoalBar = document.querySelector('#monthlyGoalBar');
    document.querySelector('#monthlyGoalText').textContent = monthlyProgress;
    monthlyGoalBar.setAttribute("aria-valuenow", monthlyProgress);
    monthlyGoalBar.style.width = `${monthlyProgress}%`;
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
    if ((moment().dayOfYear() / 365 * 100) >= yearlyProgress) {
        yearlyGoalBar.classList.add('bg-danger');
        yearlyGoalBar.classList.remove('bg-success');
    } else {
        yearlyGoalBar.classList.add('bg-success');
        yearlyGoalBar.classList.remove('bg-danger');
    }
}

var borderColor;

function drawLineGraph(target, choice) {
    if(target != null) {markActive(target);}
    switch (choice) {
        case 'week':
            var data = weeklyData(weeklyWorkouts);
            borderColor = (moment().day() / 7 * 100) >= weeklyProgress ? 'red' : 'green'; //week
            break;
        case 'month':
            var data = monthlyData(monthlyWorkouts);
            borderColor = userMonthlyGoal >= monthlyProgress ? 'red' : 'green'; //week
            break;
        case 'year':
            // break;
        default:
            break;
    }
    
    new Chart(document.getElementById("goal-chart"), {
        type: 'line',
    
        data: {
            labels: data.labels,
            datasets: [{
                data: data.goalData,
                label: "Mål",
                borderColor: "gray",
                borderWidth: 1,
                pointRadius: 0,
                borderDash: [10,5],
                fill: false
            }, {
                data: data.actuals,
                label: "Utfall",
                borderColor: borderColor,
                fill: false,
                
            }
            ]
        },
        options: {
            legend: {
                display: true,
            },
            title: {
                display: false,
                text: 'Måluppfyllnad'
            }
        }
    });
}

function weeklyData(weeklyWorkouts) {
    var weekStart = moment().startOf('week').add(1, 'days');
    var goalData = [];
    var actuals = [];
    var labels = [];

    var sum = 0;
    var isFinished = false;
    for (i = 0; i <= 6; i++) {
        labels.push(moment(weekStart).add(i, 'days').format("DD") + "/" + moment(weekStart).add(i, 'days').format("MM"));
        goalData[i] = userWeeklyGoal * (i / 6);
        weeklyWorkouts.forEach(workout => {
            if (moment(workout.createdat).startOf('day').isSame(moment(weekStart).add(i, 'days').startOf('day'))) {
                sum += workout.workoutTime;
            };
        })
        if (moment(weekStart).add(i, 'days').isSame(moment().startOf('day'))) { isFinished = true };
        if (!isFinished) {
            actuals[i] = sum;
        }
    };
    return { actuals: actuals, goalData: goalData, labels: labels }
}

function monthlyData(monthlyWorkouts) {

    var currentDate = moment();
    var goalData = [];
    var actuals = [];
    var labels = [];

    var sum = 0;
    var isFinished = false;
    for (i = 0; i <= currentDate.daysInMonth()-1; i++) {
        labels.push(moment().startOf('month').add(i, 'days').format("DD"));
        goalData[i] =  userMonthlyGoal * (i / currentDate.daysInMonth());
        monthlyWorkouts.forEach(workout => {
            if (moment(workout.createdat).startOf('day').isSame(moment(moment().startOf('month')).add(i, 'days').startOf('day'))) {
                sum += workout.workoutTime;
            };
        })
        if (moment().startOf('month').add(i, 'days').isSame(moment().startOf('day'))) { isFinished = true };
        if (!isFinished) {
            actuals[i] = sum;
        }
    };
    return { actuals: actuals, goalData: goalData, labels: labels }
}

function sumObject(objectToSum) {
    var sum = 0;
    objectToSum.forEach(arr => {
        sum += arr.workoutTime;
    })
    return sum;
}
function markActive(target){
    document.querySelectorAll('.graph-btn').forEach(graphBtn => {
        graphBtn.classList.remove('active');
    });
    document.querySelector("#periodText").textContent = target.textContent;
    target.classList.toggle('active');
}