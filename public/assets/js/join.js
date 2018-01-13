$("#joinBtn").on("click", function(){
    $.ajax({
        url: "/getRaceList/"+$("#currRaceID").attr("value"),
        method:"GET"
    }).done(function(data){
        $("#raceList").empty();
        for(i in data){
            $("#raceList").append('<div class="form-group"><label><a href="/join/'+$("#currUserID").attr("value")+'/'+data[i].ID+'">'+data[i].raceName+
            '</a></label><label>'+data[i].startDate+'</label><label>'+data[i].endDate+'</label><label>'+data[i].distance+' miles</label></div>');
        }
    });
});
