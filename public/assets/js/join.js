$("#joinBtn").on("click", function(){
    $.ajax({
        url: "/getRaceList/"+$("#currUserID").attr("value"),
        method:"GET"
    }).done(function(data){
        $("#raceList").empty();
        for(i in data){
            console.log(data[i].distance)
            $("#raceList").append('<div class="listOfRaces"><label><a href="/join/'+$("#currUserID").attr("value")+'/'+data[i].ID+'">'+data[i].raceName+
            '</a></label><br><label>Start: '+data[i].startDate+'</label><label class="listOfRaceRight">End: '+data[i].endDate+'</label><br><label>'+data[i].distance+' miles</label></div><hr>');
        }
    });
});
