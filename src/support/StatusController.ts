var StatusController = {

    update: function () {
        var status = "";
        var ci = TimeController.getCurrentMonthCompletion();

        if (!ci)
            return;

        if (ci.completedRatio >= 1) {
            var cr = ci.completedRatio;
            if (ci < 1.05)
                status =
                "You've worked enough this month. Go and get some rest. You don't have to work anymore."
            if (ci < 1.10)
                status = "You've worked too much. Don't you think that's enough?"
            else
                status =
                "You've worked WAY TOOO much!!! Go and spend some time with your family!!!"
        } else {
            var totalDaysInMonth = TimeController.getNumDaysInCurrentMonth();
            var currentDay = new Date().getDate();
            var numWeekendDays = 0;
            for (var i = currentDay; i <= totalDaysInMonth; i++) {
                var d = new Date();
                d.setDate(i);
                if (d.getDay() == 0 || d.getDay() == 6)
                    numWeekendDays++;
            }
            var daysLeft = totalDaysInMonth - currentDay + 1 - numWeekendDays;
            var timeLeft = ci.timeNeeded - ci.total;
            var hs = TimeConverter.totalToParts(timeLeft).h;
            status = "You've got " + daysLeft + " days and " + hs +
                " hours to work, which makes it " + (hs / daysLeft).toFixed(2) +
                " hours a day.";

            // check if you are behind the schedule (include today)
            var numWorkingDaysPassed = 0;
            for (var i = 1; i <= currentDay; i++) {
                d = new Date();
                d.setDate(i);
                if (d.getDay() != 0 && d.getDay() != 6)
                    numWorkingDaysPassed++;
            }

            var behindSchedule = numWorkingDaysPassed * 8 * 3600000 - ci.total;
            if (behindSchedule > 0)
                status += "<br/>You are behind the schedule by " + (behindSchedule /
                    3600000).toFixed(2) + " hours";
        }

        //statusLabel.innerHTML = status;
    }
};
