var chartBox = document.getElementById('chartBox');
var boxWidth = $('#chartBox').width();
var goal = localStorage.getItem('currentGoal') || [3500];
var max = goal[0] * 1.25;
var formatPercent = d3.format(".4r");
var current = 2200;
var currentPercent = Math.ceil((current/goal)*100);

var xScale = d3.scaleLinear()
    .domain([0, max])
    .range([0, boxWidth]);

var main = d3.select(chartBox).append('svg')
    .attr('width', boxWidth)
    .attr('height', 65)
var bar = main.append('g')
    .attr('class', 'main');

bar.append('rect')
    .attr('stroke', '#d1d1d1')
    .attr('y', 25)
    .attr('stroke-width', 1)
    .attr('height', 40)
    .attr('width', boxWidth)
    .attr('fill', '#777')
    .style('z-index', 0);

var innerBar = main.append('g');

innerBar.selectAll('rect')
    .data(goal)
    .enter()
    .append('rect')
    .attr('width', 0)
    .attr('height', 40)
    .attr('fill', '#1a78d8')
    .attr('x', 0)
    .attr('y', 25)
    .attr('stroke', '#d1d1d1')
    .attr('stroke-width', 1)
    .style('z-index',10)
    .transition()
    .attr('width', d => {
        console.log(d);
        return xScale(d);
    })
    .duration(1500);


innerBar.selectAll('text')
    .data([current])
    .enter()
    .append('text')
    .text(0)
    .attr('fill', '#fff')
    .attr('x', 10)
    .attr('y', 50)
    .style('font-size', '14px')
    .transition()
    .tween('text', function(d) {
        var self = this;
        var i = d3.interpolate(0, d);
        return function(t) {
            d3.select(self).text('$' + formatPercent(i(t)));
        };
    })
    .duration(1500);

main.append('text')
	.text('$0')
	.attr('fill', '#000')
	.attr('color', '#000')
	.attr('x', 0)
	.attr('y', 15)
	.style('font-size', '14px');

main.append('text')
	.text('$'+goal[0])
	.attr('fill', '#000')
	.attr('color', '#000')
	.attr('y', 15)
	.attr('x', '88%')
	.style('font-size', '14px');

setTimeout(function(){
	$('#currentPercent').text(currentPercent+'%');
	$('#percentMessage').fadeIn();
}, 1500);


//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////

