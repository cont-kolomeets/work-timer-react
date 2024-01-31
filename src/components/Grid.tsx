var Grid = {

    gridData: [],

    columns: [{
            label: "Day",
            field: "dayIndex"
        },
        {
            label: "Time",
            field: "dayTime"
        }
    ],

    refresh: function () {
        var self = this;
        domConstruct.empty(gridDiv);

        this.gridData = TimeController.getCurrentMonthTimeList();

        // header
        var headerRow = this._createRow(gridDiv, true);
        var index = 0;
        this.columns.forEach(function (c) {
            self._createCell(c.label, index++, headerRow);
        });

        // rows
        this.gridData.forEach(function (data) {
            var row = self._createRow(gridDiv, false, data.isCurrent);
            domClass.add(row, "clickable");
            on(row, "click", function () {
                var value = prompt(data.isTotal ?
                    "Enter total required time for this month (hh:mm)" :
                    "Enter elapsed time for day " + data.dayIndex +
                    " (hh:mm)");
                data.isTotal ?
                    data.setNewMonthTimeFunc(value) :
                    data.isDept ?
                    data.setYearDeptFunc(value) :
                    data.setNewTimeFunc(value);
            });

            var index = 0;
            self.columns.forEach(function (c) {
                var label;
                var marker;
                if (c.field == "dayTime") {
                    label = TimeConverter.formatTotal(data[c.field],
                        "h:m:s");

                    if (data.isTotal) {
                        var completionObject = TimeController
                            .getCurrentMonthCompletion();
                        if (completionObject)
                            label += " / " + TimeConverter.formatTotal(
                                completionObject.timeNeeded, "h:m:s");
                    } else if (!data.isDept) {
                        var _8h = 8 * 3600000;
                        var _10h = 10 * 3600000;
                        marker = data[c.field] < _8h ? "red" : data[c
                            .field] > _10h ? "yellow" : "#7fff00";
                    }
                } else
                    label = data[c.field];

                self._createCell(label, index++, row, marker);
            });


        });
    },

    _createRow: function (node, isHeader, isCurrentDay) {
        return domConstruct.create("div", {
            "class": "gridRow" + (isHeader ? " gridHeader" : "") + (isCurrentDay ?
                " currentDay" : "")
        }, node);
    },

    _createCell: function (label, index, rowNode, marker) {
        var cellNode = domConstruct.create("div", {
            "class": "gridCell gridColumn" + index,
            innerHTML: label
        }, rowNode);
        if (marker) {
            cellNode.style.position = "relative";
            var markerNode = domConstruct.create("div", {
                "class": "gridCellMarker"
            }, cellNode);
            markerNode.style.backgroundColor = marker;
        }
    }
};
