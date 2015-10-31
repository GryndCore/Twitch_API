$(document).ready(function(){
	var streamers = ["freecodecamp","medrybw", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];
	var input=streamers;
	var streamURL = "https://api.twitch.tv/kraken/streams/";
	var userURL = "https://api.twitch.tv/kraken/users/";
	getStreamer(input);

	//---Looping through Streamers---//
	function getStreamer(input){
		for(var i in input){
			getData(input[i]);
		}
		input=[];
	}
	//^^---Looping through Streamers---^^//
	//---------------------------------//
	//---Fetching All Streamers---//
	function getData(streamer){
		getOnline(streamer);
		getOffline(streamer);
	}
	//^^---Fetching All Streamers---^^//
	//-------------------------------------//
	//---Fetching Online Streamers---//
	function getOnline(streamer){
		$.getJSON(streamURL+streamer, function(newStmr){
			if(newStmr.stream != null){
				if(newStmr.stream.channel.logo != null) {
					$(".listBox").append("<a href='http://www.twitch.tv/"+streamer+"' target='_blank' class='streamer'><img style='margin-right:10%' src="+newStmr.stream.channel.logo+">"+newStmr.stream.channel.display_name+" --- "+newStmr.stream.channel.status.slice(0,20)+"...<i class='fa fa-user fa-lg online'></i></a><br>");		
					$(".streamer").show("fast");
				}else{
					$(".listBox").append("<a href='http://www.twitch.tv/"+streamer+"' target='_blank' class='streamer'><img src ='http://img.444.hu/Silhouette-question-mark.jpeg'>"+newStmr.stream.channel.display_name+" --- "+newStmr.stream.channel.status.slice(0,20)+"...<i class='fa fa-user fa-lg online'></i></a><br>");
					$(".streamer").show("fast");
				}
			}
		});
	}
	//^^---Fetching Online Streamers---^^//
	//--------------------------------//
	//---Fethcing Offline Streamers---//
	function getOffline(streamer){
		$.getJSON(streamURL+streamer, function(newStmr){
			if(newStmr.stream == null){
				$.getJSON(userURL+streamer, function(stmr){
					if(stmr.logo != null) {
						$(".listBox").append("<a href='http://www.twitch.tv/"+streamer+"' target='_blank' class='streamer'><img src="+stmr.logo+">"+stmr.display_name+"<i class='fa fa-user fa-lg offline'></i></a><br>");		
						$(".streamer").show("fast");
					}else{
						$(".listBox").append("<a href='http://www.twitch.tv/"+streamer+"' target='_blank' class='streamer'><img src ='http://img.444.hu/Silhouette-question-mark.jpeg'>"+stmr.display_name+"<i class='fa fa-user fa-lg offline'></i></a><br>");
						$(".streamer").show("fast");
					}
				});
			}
		}).fail(function(jqxhr) {
    		$(".listBox").append("<div style='background-color:red;color:white;text-align:center;'class='streamer'><p>"+jqxhr.responseJSON.message+"</p></div>");
    	});
	}
	//^^---Fethcing Offline Streamers---^^//
	//--------------------------------//
	//---Searching for streamers---//
	$("#search").bind("keyup",function(){
		input=[];
		$(".listBox").empty();
		$("li").removeAttr("id","active");
		$("li:nth-child(1)").attr("id","active");
		if($("#search").val().match(/(^\s+)/g)){
			$("#search").val("");
			getStreamer(streamers);
			return;
		}
		var regexp = new RegExp($("#search").val(),'g');
		for(var i in streamers){
			if(streamers[i].match(regexp) != null){
				input.push(streamers[i]);	
			}
		}
		getStreamer(input);
	});
	//^^---Searching for streamers---^^//
	//--------------------------------//
	//---Button Actions---//
	$("li:nth-child(1)").click(function(){
		$(".listBox").html("");
		getStreamer(streamers);
	});

	$("li:nth-child(2)").click(function(){
		$(".listBox").html("");
		for(var i in streamers){
			getOnline(streamers[i]);
		}	
	});

	$("li:nth-child(3)").click(function(){
		$(".listBox").html("");
		for(var i in streamers){
			getOffline(streamers[i]);
		}	
	});

	$("li").click(function(){
		$("li").removeAttr("id","active");
		$(this).attr("id","active");
	});
	//^^---Button Actions---^^//

});