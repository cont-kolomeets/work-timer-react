var DayTimer = {

    info: {
        // startTime
        // timeElapsed
    },

    _intervalHandle: null,

    isRunning: false,

    // this can be used to visualize the time before starting the timer
    setElapsedTime: function (timeElapsed) {
        this.stop();
        this.info.timeElapsed = timeElapsed;
        this.visualizeData();
        this.visualizeGrid();
    },

    // specify timeElapsed if you want to start the timer with some time already elapsed
    start: function (timeElapsed) {
        this.stop();

        this.isRunning = true;
        this._updateDocumentHeader();
        this.info.startTime = new Date().getTime();
        if (timeElapsed > 0)
            this.info.startTime -= timeElapsed;

        var self = this;
        var secondPoint = new Date().getTime();

        function _updateTimer() {
            var currentTime = new Date().getTime();
            var delta = currentTime - self.info.startTime;
            self.info.timeElapsed = delta;
            self.visualizeData();
            if (currentTime - secondPoint > 5000) {
                secondPoint = currentTime;
                self.onTickSecond();
                self.visualizeGrid();
            }
        }

        this._intervalHandle = setInterval(_updateTimer, 33);
        _updateTimer();
    },

    stop: function () {
        this._intervalHandle && clearInterval(this._intervalHandle);
        this.isRunning = false;
        this._updateDocumentHeader();
    },

    _updateDocumentHeader: function () {
        if (this.isRunning)
            document.title = "WT " + TimeConverter.formatTotal(this.info.timeElapsed,
                "h:m:s");
        else
            document.title = "Work Timer (STOPPED!)";
    },

    onTickSecond: function () {},

    visualizeData: function () {
        timerDivH.innerHTML = TimeConverter.formatTotal(this.info.timeElapsed, "h") + ":";
        timerDivRest.innerHTML = TimeConverter.formatTotal(this.info.timeElapsed,
            "m:s:ms10");

        // day completion
        dayProgressBarCompleted.style["width"] = Math.min(100, this.info.timeElapsed / (8 *
            3.6E6) * 100) + "%";

        // month completion
        var monthCompletionInfo = TimeController.getCurrentMonthCompletion();
        var percent = monthCompletionInfo ? monthCompletionInfo.completedRatio : 0;
        progressBarCompleted.style["width"] = Math.min(100, percent * 100) + "%";
        progressBarLabel.innerHTML = (percent * 100).toFixed(2) + "%";

        this._calcWhenStarted();
        this._calcWhenToLeave();

        this._updateDocumentHeader();
    },

    _calcWhenStarted: function () {
        const dayInfo = TimeController.getCurrentDayInfo();
        if (!dayInfo.points.length) {
            startedTodayInfo.innerHTML = "Hasn't started yet";
        } else {
            var started = new Date(dayInfo.points[0].start);
            startedTodayInfo.innerHTML =
                `Started today at ${started.getHours()}:${TimeConverter
                .format2digit(started.getMinutes())}`;
        }
    },

    _calcWhenToLeave: function () {
        var date = new Date();
        var elapsedInfo = TimeConverter.totalToParts(this.info.timeElapsed);
        var hLeft = 8 - elapsedInfo.h;
        var mLeft = 0;
        if (elapsedInfo.m) {
            hLeft--;
            mLeft = 60 - elapsedInfo.m;
        }

        // add time for lunch if before 2 PM
        if (date.getHours() < 14)
            mLeft += 40;

        if (mLeft > 60) {
            hLeft++;
            mLeft -= 60;
        }

        if (hLeft < 0) {
            whenLeaveInfo.innerHTML = "You can leave now!"
        } else {
            var hLeave = date.getHours() + hLeft;
            var mLeave = date.getMinutes() + mLeft;
            if (mLeave > 60) {
                hLeave++;
                mLeave -= 60;
            }
            // update when to leave today
            whenLeaveInfo.innerHTML = "You can leave at " + hLeave + ":" + TimeConverter
                .format2digit(mLeave);
        }
    },

    visualizeGrid: function () {
        Grid.refresh();
    }
};
