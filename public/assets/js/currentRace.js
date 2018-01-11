//this is the JS file to pull the user's current race from the DB and display the line chart for it

var currentRace = function() {

    var userid = $("#currUserID").attr("value");
    var raceid = $("#currRaceID").attr("value");
    console.log("http://localhost:3000/"+userid+"/"+raceid);

    $.ajax({
        url: "http://localhost:3000/"+userid+"/"+raceid,
        method: "GET" 
    }).done(function(response) {
    
        //console.log(response);
        
        var ctx = document.getElementById("myChart");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels : response.x,
                    datasets : [
                        {
                            fillColor : "#ff7700",
                            strokeColor : "#ACC26D",
                            pointColor : "#fff",
                            pointStrokeColor : "#ff7700",
                            data : response.y
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

    });
};

$("document").ready(function(){
    currentRace();
})