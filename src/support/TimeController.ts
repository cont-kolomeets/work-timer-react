var TimeController = {

    years: {}, // hash

    _currentDay: -1,

    _currentMonth: -1,

    _currentYear: -1,

    _userMonth: -1,

    _userYear: -1,

    toggleTimer: function () {
        if (DayTimer.isRunning) {
            DayTimer.stop();
            this._saveCurrentData();
        } else {
            this._provideCurrentDayPath();
            DayTimer.start(this.getCurrentDayInfo().elapsed);

            var self = this;
            DayTimer.onTickSecond = function () {
                self._saveCurrentData();
                StatusController.update();
                Chart.update();
            }

            DateLabel.update();
        }
    },

    getCurrentDayInfo: function () {
        var year = this.years[this._currentYear];
        var month = year && year.months[this._currentMonth];
        var dayInfo = _toDayInfo(month && month.days[this._currentDay]);
        month && (month.days[this._currentDay] = dayInfo);
        return dayInfo;
    },

    // makes sure the hash structure for the current month/day exists
    _provideCurrentDayPath: function () {
        this._currentDay = this._getMonthDay();
        this._currentMonth = this._getMonth();
        this._currentYear = this._getYear();

        var year = this.years[this._currentYear] = this.years[this._currentYear] ||
        {}; // provide a year
        var months = year.months = year.months || {};

        var month = months[this._currentMonth] = months[this._currentMonth] ||
        {}; // provide a month
        month.days = month.days || {}; // provide days hash
        // TODO: update timeNeeded
        month.timeNeeded = month.timeNeeded || TimeConverter.partsToTotal({
            h: 8 * 20
        });

        var days = months[this._currentMonth].days;
        var dayInfo = days[this._currentDay] = _toDayInfo(days[this._currentDay]);
        if (!dayInfo.points.length) {
            dayInfo.points.push({
                start: new Date().getTime(),
                end: new Date().getTime()
            })
        }
    },

    _saveCurrentData: function () {
        if (this._currentDay === -1)
            return;

        const m = this.years[this._currentYear].months[this._currentMonth]

        var dayInfo = m.days[this._currentDay] = _toDayInfo(m.days[this._currentDay]);
        dayInfo.elapsed = DayTimer.info.timeElapsed || 0;

        const lastPoint = dayInfo.points[dayInfo.points.length - 1];
        if (lastPoint && lastPoint.end) {
            const curTime = new Date().getTime();

            if (curTime - lastPoint.end > 20000 /* 20 seconds */ ) {
                // start a new interval
                dayInfo.points.push({
                    start: curTime,
                    end: curTime
                });
            } else {
                lastPoint.end = curTime;
            }
        }

        localStorage.setItem("workTimer.yearsItem", JSON.stringify({
            years: this.years
        }));
    },

    // return
    // { total: ms, timeNeeded: ms, completedRatio: 0..1 }
    getCurrentMonthCompletion: function () {
        var year = this.years[this.getVisibleYear()];
        if (!year)
            return;

        var month = year.months[this.getVisibleMonth()];
        if (!month)
            return null;

        var totalFromDays = 0;
        for (var id in month.days) {
            var dayInfo = month.days[id] = _toDayInfo(month.days[id]);
            totalFromDays += dayInfo.elapsed > 0 ? dayInfo.elapsed : 0;
        }

        return {
            total: totalFromDays,
            timeNeeded: month.timeNeeded,
            completedRatio: totalFromDays / month.timeNeeded
        };
    },

    getCurrentMonthTimeList: function (daysOnly) {
        var self = this;
        var list = [];

        var isUserMonth = this._userMonth != -1 && this._userMonth != this._currentMonth &&
            this._userYear != -1 && this._userYear != this._currentYear;
        var year = this.years[this.getVisibleYear()];
        if (!year)
            return list;

        var month = year.months[this.getVisibleMonth()];
        if (!month)
            return list;

        for (var id in month.days)
            createDayDataObject(id);

        function createDayDataObject(id) {
            var dayInfo = month.days[id] = _toDayInfo(month.days[id]);
            var dayTime = dayInfo.elapsed;
            if (dayTime > 0)
                list.push({
                    dayIndex: id,
                    isCurrent: !isUserMonth && id == self._currentDay,
                    dayTime: dayTime,
                    // Ability to change the elapased time for a specified day
                    setNewTimeFunc: function (value /*hh:mm*/ ) {
                        if (!value || value.indexOf(":") == -1) {
                            alert("Incorrect entry!");
                            return;
                        }
                        var ps = value.split(":");

                        DayTimer.stop();

                        const dayInfo = month.days[id] = _toDayInfo(month.days[id]);
                        dayInfo.elapsed = TimeConverter.partsToTotal({
                            h: Number(ps[0]),
                            m: Number(ps[1])
                        });
                        if (!isUserMonth && id == self._currentDay)
                            DayTimer.setElapsedTime(month.days[id].elapsed);
                        else
                            DayTimer.visualizeGrid();

                        self._saveCurrentData();
                    }
                });
        }

        var completionInfo = this.getCurrentMonthCompletion();
        if (completionInfo && !daysOnly) {
            list.push({
                dayIndex: "Total",
                dayTime: completionInfo.total,
                isTotal: true,
                // Ability to change the total month time
                setNewMonthTimeFunc: function (value /*hh:mm*/ ) {
                    if (!value || value.indexOf(":") == -1) {
                        alert("Incorrect entry!");
                        return;
                    }
                    var ps = value.split(":");

                    DayTimer.stop();

                    month.timeNeeded = TimeConverter.partsToTotal({
                        h: Number(ps[0]),
                        m: Number(ps[1])
                    });
                    DayTimer.visualizeData();
                    DayTimer.visualizeGrid();

                    self._saveCurrentData();
                }
            });
        }

        if (!daysOnly) {
            list.push({
                dayIndex: "Dept",
                dayTime: year.dept,
                isDept: true,
                // Ability to change the total depth for a year
                setYearDeptFunc: function (value /*hh:mm*/ ) {
                    if (!value || value.indexOf(":") == -1) {
                        alert("Incorrect entry!");
                        return;
                    }
                    var ps = value.split(":");

                    DayTimer.stop();

                    year.dept = TimeConverter.partsToTotal({
                        h: Number(ps[0]),
                        m: Number(ps[1])
                    });
                    DayTimer.visualizeData();
                    DayTimer.visualizeGrid();

                    self._saveCurrentData();
                }
            });
        }

        return list;
    },

    _getMonthDay: function () {
        return new Date().getDate();
    },

    _getMonth: function () {
        return new Date().getMonth() + 1;
    },

    _getYear: function () {
        return new Date().getFullYear();
    },

    // used to visualize data from other years and months
    setUserYearMonth: function (year, month) {
        this._userYear = year;
        this._userMonth = month;
    },

    getVisibleMonth: function () {
        return this._userMonth != -1 ? this._userMonth : this._currentMonth;
    },

    getVisibleYear: function () {
        return this._userYear != -1 ? this._userYear : this._currentYear;
    },

    getNumDaysInCurrentMonth: function (excludeWeekend) {
        var d = new Date();
        var totalDaysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

        if (excludeWeekend) {
            var numWeekendDays = 0;
            for (var i = 1; i <= totalDaysInMonth; i++) {
                var d = new Date();
                d.setDate(i);
                if (d.getDay() == 0 || d.getDay() == 6)
                    numWeekendDays++;
            }
            totalDaysInMonth -= numWeekendDays;
        }

        return totalDaysInMonth;
    },

    fromJson: function (settings) {
        this.years = settings.years || {};
        this._provideCurrentDayPath();
    }
};
