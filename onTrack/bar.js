
$(document).ready(function(){
	updateTransactions();
	localStorage.removeItem('cfiGoalMultiplier');
});
setInterval(function() {
	//http://on-track.azurewebsites.net:9001
	updateTransactions();
}, 15000);
function updateTransactions() {
	$.get('http://localhost:9001/connect', function(string){
		var html = "";
		var data = JSON.parse(string);
		
		$.each(data.transactionList,function(i,d) {
			html += "<div class='transaction row'>";
			html += "<div class='col-6' style='text-align:left;'><p><strong>";
			html += '<p>Sept 29</p>';
			html += "</strong></p></div><div class='col-6' style='text-align:right;'><p><strong>"
			html += "$"+d.amount;
			html += "</strong></p></div></div>"
		});
		if(data.transactionList.length > 0) {
			html += "<br/><br/><p><small>End of Transactions</small></p>"; 
		} else {
			html += "<br/><br/><p><small>No transactions yet today.</small></p>";	
		}
		var cfiDailyGoal = Math.round(parseInt(data.dailyGoal));
		localStorage.setItem('cfiDailyGoal',data.dailyGoal);
		var dailyGoalMultiplier = parseInt(localStorage.getItem('cfiGoalMultiplier')) || 1.1;
		var dailyGoalFormatted = (Math.round(cfiDailyGoal * dailyGoalMultiplier)).toFixed(2);
		var currentRevenue = Math.round(parseInt(data.currentRevenue)); 
		console.log(currentRevenue/dailyGoalFormatted);	
		if(currentRevenue/dailyGoalFormatted >= .5) {
			$.post('http://localhost:9001/sms50', function() {
				//
			});
		} else if (currentRevenue/dailyGoalFormatted >= 1) {
			$.post('http://localhost:9001/sms100', function() {
				//
			});
		}
		$('#todays-transactions').html(html); 
		$('.total-revenue-today').text('$'+parseInt(data.currentRevenue).toFixed()); 
		$('#total-customers-today').text(data.transactionCount);
		$('#average-charge-customer').text('$'+data.transactionAvg); 
		$('.dailyGoal').text('$'+dailyGoalFormatted);
		$('#currentProfit').text('$'+(dailyGoalFormatted-710));
		buildBar(); 
	});
}
$(document).ready(function(){
	buildBar();
});

function buildBar() {
	$.get('http://localhost:9001/connect', function(string){
		var html = "";
		var data = JSON.parse(string); 
		$.each(data.transactionList,function(i,d) {
			html += "<div class='transaction row'>";
			html += "<div class='col-6' style='text-align:left;'><p><strong>";
			html += '<p>Sept 29</p>'
			html += "</strong></p></div><div class='col-6' style='text-align:right;'><p><strong>"
			html += "$"+d.amount;
			html += "</strong></p></div></div>"
		});
		if(data.transactionList.length > 0) {
			html += "<br/><br/><p><small>End of Transactions</small></p>"; 
		} else {
			html += "<br/><br/><p><small>No transactions yet today.</small></p>";	
		}
		
		$('#chartBox').html(''); 
		var chartBox = document.getElementById('chartBox');
		var boxWidth = $('#chartBox').width();
		var dailyGoal = localStorage.getItem('cfiDailyGoal') || data.dailyGoal;
		var cfiGoalMultiplier = localStorage.getItem('cfiGoalMultiplier') || 1.1;
		goalFormatted = Math.round(parseInt(dailyGoal * cfiGoalMultiplier));
		goal = [goalFormatted];
		var max = goal[0];
		var formatPercent = d3.format(".4r");
		var current = Math.round(parseInt(data.currentRevenue));
		var currentPercent = (goal != 0) ? Math.round((current/goalFormatted)*100) : 0;
		var introMessage = ""
		var currentProfit = goalFormatted - 710; 
		$('#currentProfit').text('$'+Math.round(parseInt(currentProfit)));
		if(currentPercent > 100) {
			introMessage = "<br/><strong>Congratulations!</strong><br/>you have reached your daily goal."
		} else if(currentPercent >= 60) {
			introMessage = "You're getting close to your goal! Check our suggestions for how to get that final boost!"
		} else {
			introMessage = "Make $" + (goalFormatted-current) + " more today to extend your streak to 4 days."  
		}

		$('#intro-message').html(introMessage); 
		$('#todays-transactions').html(html); 
		$('.total-revenue-today').text('$'+current); 
		$('#total-customers-today').text(data.transactionCount);
		$('#average-charge-customer').text('$'+data.transactionAvg); 
		$('.dailyGoal').text('$'+goalFormatted); 

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
		    .attr('fill', '#d2e5f4')
		    .style('z-index', 0);

		var innerBar = main.append('g');

		innerBar.selectAll('rect')
		    .data(goal)
		    .enter()
		    .append('rect')
		    .attr('width', 0)
		    .attr('height', 40)
		    .attr('fill', function(d, i) {
		    	if((goal[0]/current) >= 1) {
		    		return '#1a78d8';
		    	} else {
		    		return '#5fb35f';
		    	}
		    })
		    .attr('x', 0)
		    .attr('y', 25)
		    .attr('stroke', '#d1d1d1')
		    .attr('stroke-width', 1)
		    .style('z-index',10)
		    .transition()
		    .attr('width', d => {
		        return xScale(current);
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
		            d3.select(self).text('$' + Math.round(formatPercent(i(t))));
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

	});
}


//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////

