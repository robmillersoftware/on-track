
$(document).ready(function(){
	updateTransactions();
});
setInterval(function() {
	//http://on-track.azurewebsites.net:9001
	updateTransactions();
}, 15000);

function updateTransactions(setItems) {
	$.get('http://localhost:9001/connect', function(string){
		var html = "";
		var data = JSON.parse(string);
		console.log(data);
		$.each(data.transactionList,function(i,d) {
			html += "<div class='transaction row'>";
			html += "<div class='col-6' style='text-align:left;'><p><strong>";
			html += d.date;
			html += "</strong></p></div><div class='col-6' style='text-align:right;'><p><strong>"
			html += "$"+d.amount;
			html += "</strong></p></div></div>"
		});
		if(data.transactionList.length > 0) {
			html += "<br/><br/><p><small>End of Transactions</small></p>"; 
		} else {
			html += "<br/><br/><p><small>No transaction yet today.</small></p>";	
		}
		$('#todays-transactions').html(html); 
		$('.total-revenue-today').text('$'+data.currentRevenue); 
		$('#total-customers-today').text(data.transactionCount);
		$('#average-charge-customer').text('$'+data.transactionAvg); 
	});
}
$(document).ready(function(){
	$.get('http://localhost:9001/connect', function(string){
		var html = "";
		var data = JSON.parse(string); 
		console.log(data);
		$.each(data.transactionList,function(i,d) {
			html += "<div class='transaction row'>";
			html += "<div class='col-6' style='text-align:left;'><p><strong>";
			html += d.date;
			html += "</strong></p></div><div class='col-6' style='text-align:right;'><p><strong>"
			html += "$"+d.amount;
			html += "</strong></p></div></div>"
		});
		if(data.transactionList.length > 0) {
			html += "<br/><br/><p><small>End of Transactions</small></p>"; 
		} else {
			html += "<br/><br/><p><small>No transaction yet today.</small></p>";	
		}
		$('#todays-transactions').html(html); 
		$('.total-revenue-today').text('$'+data.currentRevenue); 
		$('#total-customers-today').text(data.transactionCount);
		$('#average-charge-customer').text('$'+data.transactionAvg); 
		$('.dailyGoal').text('$'+data.dailyGoal); 

		var chartBox = document.getElementById('chartBox');
		var boxWidth = $('#chartBox').width();
		var goal = [data.dailyGoal];
		var max = goal[0];
		var formatPercent = d3.format(".4r");
		var current = data.currentRevenue;
		var currentPercent = Math.ceil((current/goal)*100);
		var introMessage = ""
		if(currentPercent > 100) {
			introMessage = "<br/><strong>Congratulations!</strong><br/>you have reached your daily goal."
		} else if(currentPercent >= 60) {
			introMessage = "You're getting close to your goal! Check our suggestions for how to get that final boost!"
		} else {
			introMessage = "Reach $" + goal + " today to extend your streak to 4 days. That's about 45 more customers&mdash;Good luck!"  
		}

		$('#intro-message').html(introMessage); 

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

	});
});



//////////////////////////////////////////////////////
/////////////////////////////////////////////////////
////////////////////////////////////////////////////

