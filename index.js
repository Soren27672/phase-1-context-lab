/* Your Code Here */

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeInLegend: {},
        timeOutEvents: [],
        timeOutLegend: {}
    }
}

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(stamp) {
    this.timeInLegend[stamp.slice(0,10)] = this.timeInEvents.length;
    this.timeInEvents.push({
        type: "TimeIn",
        date: stamp.slice(0,10),
        hour: parseInt(stamp.slice(-4)),
    })
    return this;
}

function createTimeOutEvent(stamp) {
    this.timeOutLegend[stamp.slice(0,10)] = this.timeOutEvents.length;
    this.timeOutEvents.push({
        type: "TimeOut",
        date: stamp.slice(0,10),
        hour: parseInt(stamp.slice(-4)),
    })
    return this;
}

function hoursWorkedOnDate(date) {
    console.log(this.timeOutLegend[date]);
    return this.timeOutEvents[this.timeOutLegend[date]].hour - this.timeInEvents[this.timeInLegend[date]].hour;
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this,date);
}

function calculatePayroll(arr) {
    arr.reduce((ac,cv) => ac += allWagesFor.call(cv),0);
}

function findEmployeeByFirstName(arr,name) {
    return arr.find(cv => cv.firstName === name);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const john = createEmployeeRecord(['john','joyce','man',5]);
createTimeInEvent.call(john,'2020-05-05 1200');
createTimeOutEvent.call(john,'2020-05-05 2300');