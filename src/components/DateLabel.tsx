var DateLabel = {

    _labelClickHandle: null,

    update: function () {
        var self = this;
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        dateLabel.innerHTML = TimeController.getVisibleYear() + " " + monthNames[
            TimeController.getVisibleMonth() - 1];

        this._labelClickHandle = this._labelClickHandle || on(dateLabel, "click",
            function () {
                var value = prompt("Enter year:month as YYYY:MM");
                var values = value.split(":");
                var year = Number(values[0]) || -1;
                var month = Number(values[1]) || -1;

                DayTimer.stop();
                TimeController.setUserYearMonth(year, month);
                DayTimer.visualizeData();
                DayTimer.visualizeGrid();
                self.update();
            });
    }
};
