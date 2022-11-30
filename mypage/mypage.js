function modify_window() {
    window.open(
        "mod.html",
        "CHECK",
        "width=400, height=300, top=50, left=50"

    );

}

const chart1 = document.querySelector('.doughnut1');
const chart2 = document.querySelector('.doughnut2');
const chart3 = document.querySelector('.doughnut3');
const chart4 = document.querySelector('.doughnut4');

const makeChart = (percent, classname, color) => {
  let i = 1;
  let chartFn = setInterval(function() {
    if (i < percent) {
      colorFn(i, classname, color);
      i++;
    } else {
      clearInterval(chartFn);
    }
  }, 10);
}

const colorFn = (i, classname, color) => {
  classname.style.background = "conic-gradient(" + color + " 0% " + i + "%, #dedede " + i + "% 100%)";
}

const replay = () => {
  makeChart(80, chart1, '#2E8B57');
  makeChart(40, chart2, '#2E8B57');
  makeChart(60, chart3, '#2E8B57');
  makeChart(60, chart4, '#2E8B57');

}

makeChart(80, chart1, '#2E8B57');
makeChart(40, chart2, '#2E8B57');
makeChart(60, chart3, '#2E8B57');
makeChart(60, chart4, '#2E8B57');