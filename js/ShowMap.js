var map; var infowindow;
var marker = new google.maps.Marker();
var ltlng = [];
var markers = [];
var array = [];
var xml = "http://www.netdata.com/XML/de9786a3";
$(document).ready(function InitializeMap() {
    var latlng = new google.maps.LatLng(40.756, -73.986);
    var myOptions =
    {

        center: latlng,
        scrollWheel: false,
        zoom: 13

    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    AddMarker();
});
function insertmarker() {
    markers = [];
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    for (var i = 0; i < ltlng.length; i++) {
        marker = new google.maps.Marker({
            map: map,
            position: ltlng[i],
            draggable: false,
            title: array[i].split(',')[2].trim(),
            content: "<div class='text-center'><h4>" + array[i].split(',')[2].trim() + "</h4></div>",
            id: i,
            dataid: array[i].split(',')[3].trim()
        });
        google.maps.event.addListener(marker, 'click', function () {
            // Calling the open method of the infoWindow 
            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
            }
            infowindow.setContent(this.content);
            infowindow.open(map, this);
        });
        markers.push(marker);
    }
}
function AddMarker() {


    $.ajax({
        type: "POST",
        url: "ShowMap.aspx/GetData",
        data:"{xmlUrl:"+JSON.stringify(xml)+"}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (response) {
            $("#mapjs").html(response.d);
        },
        error: function (request, status, error) {

        }
    });


    ltlng = [];
    $.ajax({
        type: "POST",
        url: "ShowMap.aspx/GetMarker",
        data:"{xmlUrl:"+JSON.stringify(xml)+"}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        cache: false,
        success: function (response) {
            array = response.d;
            for (var i = 0; i < array.length; i++) {
                ltlng.push(new google.maps.LatLng(array[i].split(',')[0].trim(), array[i].split(',')[1].trim()));
            }
            insertmarker();
            map.setCenter(ltlng[ltlng.length - 1]);
            map.setZoom(8);
        },
        error: function (request, status, error) {

        }
    });
}
function ShowPoint(index) {
    map.setCenter(markers[index].position);
    if (!infowindow) {
        infowindow = new google.maps.InfoWindow();
    }
    infowindow.setContent(markers[index].content);
    infowindow.open(map, markers[index]);
    markers[index].setAnimation(google.maps.Animation.j);
    map.setZoom(12);
}
function Ara(address) {
    geocoder = new google.maps.Geocoder();
    insertmarker();
    var address = document.getElementById("aranankelime").value;

    geocoder.geocode({ 'address': address }, function (results, status) {
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            if (results[0].formatted_address) {
                region = results[0].formatted_address + '<br />';
            }
            var infowindow = new google.maps.InfoWindow({
                content: '<div style =width:400px; height:400px;>Konum Bilgisi:<br/>Ülke Adı:<br/>' + region + '<br/>Enlem-Boylam Bilgisi:<br/>' + results[0].geometry.location + '</div>'
            });
            google.maps.event.addListener(marker, 'click', function () {
                // Calling the open method of the infoWindow 
                infowindow.open(map, marker);
            });
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}