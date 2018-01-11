//this is the JS file to pull the user's current race from the DB and display the line chart for it

var currentRace = function() {
    var ctx = document.getElementById("myChart");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels : ["thing one","thing two","thing three","thing four","thing five","thing six", "stuff", "stuff", "stuff", "stuff", "stuff", "stuff", "stuff", "stuff", "stuff", "stuff"],
            datasets : [
                {
                    fillColor : "#ff7700",
                    strokeColor : "#ACC26D",
                    pointColor : "#fff",
                    pointStrokeColor : "#ff7700",
                    data : [203,156,99,251,305,247,76,54,167,23,212,43,122,34,54,12]
                }
        ]},
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

};
