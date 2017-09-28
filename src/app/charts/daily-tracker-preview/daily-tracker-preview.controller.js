import { select } from 'd3-selection';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { width, height, margin } from './constants';

export default class DailyTrackerPreviewController {
  constructor($element) {
    'ngInject';
    this.$element = $element;
    this.states = ['started', 'inProgress', 'completed'];
    this.currentState = 'started';
  }

  $onInit() {
    this.containerElement = this.$element.find('div')[0];
    this.setup();
  }

  $postLink() {
  }

  $onChanges(changes) {
    if (changes.dailyGoal && this.containerElement) {
      return;
    }
  }

  setup() {
    this.colorScale = scaleOrdinal()
      .domain(this.states)
      .range(['yellow', 'orange', 'green']);

    this.xScale = scaleLinear()
      .domain([0, this.dailyGoal])
      .range([0, width - margin.right]);

    this.svg = select('.daily-tracker-preview')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    this.svg.append('rect')
      .attr('class', 'bg-rect')
      .attr('fill', 'gray')
      .attr('height', 23)
      .attr('width', width)
      .attr('x', margin.left);

    /* this.progress = this.svg.append('rect')
      .attr('class', 'progress-rect')
      .attr('fill', () => this.colorScale(this.currentState))
      .attr('height', 15)
      .attr('width', 0)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('x', 0); */
  }
}
