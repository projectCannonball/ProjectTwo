//this is the JS file to pull the user's current race from the DB and display the line chart for it

var currentRace = function() {

    var userid = $("#currUserID").attr("value");
    var raceid = $("#currRaceID").attr("value");

    $.ajax({
        url: "/chart/"+userid+"/"+raceid,
        method: "GET" 
    }).done(function(response) {
    
        for (i in response.x) {
            var dt = new Date(response.x[i]);
            response.x[i] = (1+dt.getMonth())+"-"+dt.getDate()+"-"+dt.getFullYear();
        };
        
        var ctx = document.getElementById("myChart");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels : response.x,
                    datasets : [
                        {
                            label: "Miles Per Day",
                            borderColor: "Orange",
                            fillColor : "#ff7700",
                            strokeColor : "#ACC26D",
                            pointColor : "#fff",
                            pointStrokeColor : "#ff7700",
                            data : response.y
                        }
            ]},
            options: {
                responsive: true,
                // hover: {
                //     mode: 'nearest',
                //     intersect: true,
                // },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

    });
};

$("document").ready(function(){
    currentRace();
})