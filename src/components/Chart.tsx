var Chart2 = {
  update: function () {
    domConstruct.empty(chartDiv);

    chartDiv.style.left = "50px";
    chartDiv.style.right = "50px";
    chartDiv.style.height = "100px";
    const width = chartDiv.clientWidth;

    const axisLine = domConstruct.create("div", null, chartDiv);
    axisLine.style.cssText =
      "position:absolute;left:0;right:0;bottom:20px;border-bottom:1px solid white;";

    const ticks = [
      8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    ];
    const tickStep = width / (ticks.length - 1);
    ticks.forEach((hour, index) => {
      const axisLineTick = domConstruct.create("div", null, axisLine);
      axisLineTick.style.cssText = `position:absolute;left:${
        tickStep * index
      }px;top:0;border-left:1px solid white;height:10px;width:0`;

      const axisLineTickLabel = domConstruct.create("div", null, axisLine);
      axisLineTickLabel.innerHTML = `${TimeConverter.format2digit(hour)}:00`;
      axisLineTickLabel.style.cssText = `position:absolute;left:${
        tickStep * index - 50
      }px;top:10px;color:white;width:100px;text-align:center;`;
    });

    const dayInfo = TimeController.getCurrentDayInfo();
    dayInfo.points.forEach((point) => {
      var sd = new Date(point.start);
      var ed = new Date(point.end);

      function _toX(d) {
        return (
          ((d.getHours() + d.getMinutes() / 60 - ticks[0]) /
            (ticks[ticks.length - 1] - ticks[0])) *
          width
        );
      }

      const xFrom = _toX(sd);
      const xTo = _toX(ed);

      const rect = domConstruct.create("div", null, chartDiv);
      rect.style.cssText = `position:absolute;left:${xFrom}px;width:${
        xTo - xFrom
      }px;bottom:22px;height:50px;background-color:#0078D7`;

      /*
            const rectLabel = domConstruct.create("div", null, chartDiv);
            rectLabel.innerHTML = TimeConverter.formatTotal(point.end - point.start,
                "h:m:s");
            rectLabel.style.cssText =
                `position:absolute;left:${xFrom - 50}px;width:100px;bottom:82px;color:white`;
            */
    });

    chartDiv;
  },
};

function Chart() {
  return <div></div>;
}

export default Chart;
