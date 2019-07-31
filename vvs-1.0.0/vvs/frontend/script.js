$(document).ready(function () {
	reloadDepartures();
});

function reloadDepartures() {

	var startName = "<?php echo getConfigValue('vvs_startName'); ?>";
	var startId = "<?php echo getConfigValue('vvs_startId'); ?>";
	var url = "http://app.vrr.de/companion-vrr/XSLT_DM_REQUEST?outputFormat=JSON&coordOutputFormat=WGS84&type_dm=stop&name_dm=20018251&itdDate=20190310&itdTime=220000&useRealtime=1&mode=direct&limit=10";

	$("#vvs_table").empty();
	$("#vvs_subtitle").text("<?php echo _('vvs_subtitle'); ?>" + startName);

	$.ajax({
		url: url,
		dataType: "json",
		jsonp: "json",
		success: function (r) {
			vvsCallback(r, startName);
		},
		error: function (e) {
			$("#vvs_error").append("error!");
		}
	});
	// update every 15 min
	window.setTimeout(function() {
			reloadDepartures();
	}, 900000);

}

function vvsCallback(data, startName)
{
	var vvs_bus = "<?php echo getConfigValue('vvs_bus'); ?>";
	var vvs_ubahn = "<?php echo getConfigValue('vvs_ubahn'); ?>";
	var vvs_sbahn = "<?php echo getConfigValue('vvs_sbahn'); ?>";
	var vvs_zuege = "<?php echo getConfigValue('vvs_zuege'); ?>";

	var list = new Array();
	var q = 0;
	//filter list
	for (var i = 0; i < data.length; i++) {
		var object = data[i];

		if(vvs_ubahn == 'true' && (object.number.indexOf('u') >= 0 || object.number.indexOf('U') >= 0 ) )
		{
			list[q] = object;
			q++;
		}
		if(vvs_sbahn == 'true' && (object.number.indexOf('s') >= 0 || object.number.indexOf('S') >= 0) )
		{
			list[q] = object;
			q++;
		}
		else if(vvs_zuege == 'true' && (object.number.indexOf('R') >= 0 || object.number.indexOf('r') >= 0 || object.number.indexOf('IC') >= 0 || object.number.indexOf('ic') >= 0))
		{
			list[q] = object;
			q++;
		}
		else if(vvs_bus == 'true' && !isNaN(object.number))
		{
			list[q] = object;
			q++;
		}
	}



	//show only 8 entries
	var k= 8;
	for (var i = 0; i < list.length && k > 0; i++) {
		var object = list[i];
		var now = new Date();
		now.setMinutes(now.getMinutes() + 3);
		var departure = new Date();
		departure.setHours(object.departureTime.hour);
		departure.setMinutes(object.departureTime.minute);

		if(now < departure) {
			$("#vvs_table").append("<tr></tr>");
			$("#vvs_table tr:last").append("<td>" + object.number + "</td>");
			$("#vvs_table tr:last").append("<td>" + object.direction + "</td>");
			$("#vvs_table tr:last").append("<td>" + ("0" + object.departureTime.hour ).slice(-2) + ":" + ("0" + object.departureTime.minute ).slice(-2)  + "</td>");
			$("#vvs_table tr:last").append("<td>" + " +" + object.delay + "</td>");
			--k;
		}
	}
}
