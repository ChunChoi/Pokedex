$(document).ready(function(){
    var counter = 0;
    $('#button,#button1').click(function() {
        $('#Type').empty();
        $('#Abilities').empty();
        var number = $('#no').val();
        var name = $('#no1').val();
        $('#no,#no1').val("");
        $('#res').show();
        $('#res1').show();
        var url = "http://pokeapi.co/api/v2/pokemon/";
        basic(number,name);
        function basic(num,nam) {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": url+num+""+nam+"",
                "method": "GET",
                "contentType":"application/json",
                "headers": {}
            }
            $.ajax(settings).done(function (response) {
                var data = JSON.stringify(response);
                var output = JSON.parse(data);
                var imgsrc = output.sprites.front_default;
                var height = output.height+"cm";
                var weight = output.weight+"Kg";
                var types = output.types;
                var abilities = output.abilities;
                if(counter==0)
                {
                $('#resname,#resname1').html($('<div>', {
                    text: output.name
                }));
                $("#my-image,#my-image1").attr("src",imgsrc);
                $("#height").html(height);
                $("#weight").html(weight);
                for(var i in types){
                    $('#Type').append(types[i].type.name+"<br>");
                    $('#Abilities').append(abilities[i].ability.name+"<br>");
                counter++;}}
                    else{

                    $("#evolimg").attr("src",imgsrc);
                    counter = 0;

                }
            });
            // blah
        };



        var evolution = {
            "async": true,
            "crossDomain": true,
            "url": "http://pokeapi.co/api/v1/pokemon/"+number+""+name+"",
            "method": "GET",
            "contentType":"application/json",
            "headers": {}
        }
        $.ajax(evolution).done(function (evolvesto) {
            var ev = JSON.stringify(evolvesto);
            var evout = JSON.parse(ev);
            console.log(evout.evolutions[0].to);
            var evid = evout.evolutions[0].resource_uri;
            var id = evid.replace("/api/v1/pokemon/","");
            var final = id.slice(0,-1);
            if (typeof (evout.evolutions[0].to) == 'undefined'){
                $("#evolutionid").empty();
            }
            else{
                $("#evolutionid").html(evout.evolutions[0].to);
            }
            basic(final,name);


        });
    });
});
