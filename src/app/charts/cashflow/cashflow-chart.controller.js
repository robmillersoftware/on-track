import TimelineChart from './timeline.chart';
// TODO: remove
import { generateData } from './util';
import { numWeeks } from './constants';

export default class CashflowChartController {
  constructor() {
    // TODO: get data from binding
    const data = generateData(numWeeks);
    this.chart = new TimelineChart(data);
  }

  $onInit() {
    this.chart.init();
  }

  $postLink() {
    this.chart.append();
    // this.resize();
  }

  resize({ width }) {
    const weeksToShow = width > 960 ? 6 : Math.floor(width / 180);
    this.chart.resize(width, weeksToShow);
  }
}
