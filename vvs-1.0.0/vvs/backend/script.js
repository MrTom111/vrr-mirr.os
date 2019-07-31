$( function() {
var cache = {};
$( "#vvs_start" ).autocomplete({
  minLength: 2,
  source: function( request, response ) {
  var term = request.term;
  if ( term in cache ) {
    response( cache[ term ] );
    return;
  }

  $.getJSON( "http://app.vrr.de/companion-vrr/XSLT_DM_REQUEST?outputFormat=JSON&coordOutputFormat=WGS84&type_dm=stop&name_dm=20018251&itdDate=20190310&itdTime=220000&useRealtime=1&mode=direct&limit=10", request, function( data, status, xhr ) {
    var list = {};
    for (var i = 0; i < data.points.length; i++) {
      var object = data.points[i];
      if($.isNumeric( object.stateless ) === true)
      {
        var newObject = new Object();
        newObject.id = object.stateless;
        newObject.label = object.name;
        newObject.value = object.name;
        list[i] = newObject;
      }
    }
    cache[ term ] = list;
    response( list );
  });
  }
  } );
} );

$('#vvs__edit').click(function() {
  var vvs_start = $("#vvs_start").val();
  var vvs_bus = $("#vvs_bus").is(':checked');
  var vvs_ubahn = $("#vvs_ubahn").is(':checked');
  var vvs_sbahn = $("#vvs_sbahn").is(':checked');
  var vvs_zuege = $("#vvs_zuege").is(':checked');

  $.ajax({
  url: "https://efa.vrr.de/standard/XML_STOPFINDER_REQUEST?outputFormat=JSON&locationServerActive=1&stateless=1&coordOutputFormat=WSG84&language=de&type_sf=stop&name_sf="+vvs_start,
  dataType: 'json',
  async: true,
  success: function(data) {
      var found = false;
      for (var i = 0; i < data.length; i++) {
        var object = data.points[i];
        if($.isNumeric( object.stateless ) === true && object.name === vvs_start)
        {
          $.post('setConfigValueAjax.php', {'key': 'vvs_startId', 'value': object.stateless});
          $.post('setConfigValueAjax.php', {'key': 'vvs_startName', 'value': object.name});
          $.post('setConfigValueAjax.php', {'key': 'vvs_bus', 'value': vvs_bus });
          $.post('setConfigValueAjax.php', {'key': 'vvs_ubahn', 'value': vvs_ubahn});
          $.post('setConfigValueAjax.php', {'key': 'vvs_sbahn', 'value': vvs_sbahn});
            $.post('setConfigValueAjax.php', {'key': 'vvs_zuege', 'value': vvs_zuege});


          $("#vvs_ok").text("Daten erfolgreich gespeichert");
          $("#vvs_error").text("");

          $('#ok').show(30, function() {
            $(this).hide('slow');
          });
          found = true;
        }
      }

      if(found === false) {
        $("#vvs_ok").text("");
        $("#vvs_error").text("Fehler, Haltestelle nicht gefunden");
        $('#error').show(30, function() {
          $(this).hide('slow');
        });
      }
    }
  });
});
