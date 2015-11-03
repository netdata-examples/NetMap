/// <reference path="jquery.cookie.js" />
var map; var infowindow;
var marker = new google.maps.Marker();
var ltlng = [];
var markers = [];
var array = [];
var newmarkers = [];
var accpo; var xml;
$(document).ready(function InitializeMap() {
    var latlng = new google.maps.LatLng(40.756, -73.986);
    var myOptions =
    {

        center: latlng,
        scrollWheel: false,
        zoom: 13

    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    if ($.cookie('xml') != undefined && $.cookie('accpo') != undefined) {
        accpo = $.cookie('accpo');
        xml = $.cookie('xml');
        AddMarker();
    }
});
function accpochange() {
    $.cookie('accpo', $("#accpo").val().trim());
    accpo = $.cookie('accpo');
}
function xmlchange() {
    $.cookie('xml', $("#xmllink").val().trim());
    xml = $.cookie('xml');
}
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
            content: "<div class='text-center'><h4>" + array[i].split(',')[2].trim() + "</h4></div><hr/><div class='btn-group text-center' style='margin:0 auto'><a class='btn btn-warning btn-sm' data-toggle='modal' data-target='#yeniwizard' onclick='EditPoint(\"" + i + "\")'>Düzenle</a><a class='btn btn-danger btn-sm' onclick='DeletePoint(\"" + array[i].split(',')[3].trim() + "\")'>Sil</a></div>",
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
        url: "Default.aspx/SaveProject",
        contentType: "application/json; charset=utf-8",
        data: "{accpo:'" + accpo + "',xml:'" + xml + "'}",
        dataType: "json",
        async: false,
        cache: false,
        success: function (response) {
            DataList();
            setmarker();
        },
        error: function (request, status, error) {

        }
    });
    function DataList() {
        $.ajax({
            type: "POST",
            url: "Default.aspx/GetData",
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
    }
    function setmarker() {
        ltlng = [];
        $.ajax({
            type: "POST",
            url: "Default.aspx/GetMarker",
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
    function deletelastmarkers() {
        for (var i = 0; i < newmarkers.length; i++) {
            newmarkers[i].setMap(null);
        }
    }
    google.maps.event.addListener(map, 'click', function (event) {
        //call function to create marker

        //delete the old marker
        deletelastmarkers();
        if (markers.length == 0) {
            setmarker();
        }
        marker = new google.maps.Marker({ position: event.latLng, map: map });
        map.setCenter(marker.position);
        map.setZoom(12);
        newmarkers.push(marker);
        google.maps.event.addListener(marker, 'click', function () {

            if (!infowindow) {
                infowindow = new google.maps.InfoWindow();
            }
            infowindow.setContent(" <h5>Burayı Kaydetmek Istermisiniz ?</h5><div class='text-center'><a data-toggle='modal' data-target='#yeniwizard' onclick='SaveArea(\"" + event.latLng + "\")' class='btn btn-info btn-sm' style='margin:0 auto'>Kaydet</a></div>");
            infowindow.open(map, marker);

        });
        //creer à la nouvelle emplacement

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
function SaveArea(latlng) {
    var array = latlng.split(',');
    var lat = array[0].replace('(', '');
    var lng = array[1].replace(')', '');
    $("#lat").val(lat);
    $("#lng").val(lng);
    $("#btnedit").hide();
    $("#btnmodal").show();
}
function Save() {
    var name = $("#txtareaname").val();
    var lat = $("#lat").val();
    var lng = $("#lng").val();
    $.ajax({
        type: "POST",
        url: "Default.aspx/SaveData",
        contentType: "application/json; charset=utf-8",
        data: "{name:'" + name + "',lat:'" + lat + "',lng:'" + lng + "'}",
        dataType: "json",
        async: false,
        cache: false,
        success: function (response) {
            $("#yeniwizard").modal('toggle');
            location.reload();
            $("#txtareaname").val("");
        },
        error: function (request, status, error) {

        }
    });
}
function EditPoint(index) {
    $("#txtareaname").val(markers[index].title);
    $("#lat").val(markers[index].position.lat());
    $("#lng").val(markers[index].position.lng());
    $("#dataid").text(markers[index].dataid);
    $("#btnedit").show();
    $("#btnmodal").hide();
}
function EditData() {
    var id = $("#dataid").text();
    var name = $("#txtareaname").val();
    $.ajax({
        type: "POST",
        url: "Default.aspx/EditData",
        contentType: "application/json; charset=utf-8",
        data: "{dataid:'" + id + "',name:'" + name + "'}",
        dataType: "json",
        async: false,
        cache: false,
        success: function (response) {
            location.reload();
        },
        error: function (request, status, error) {
            console.log(error);
        }
    });
}
function DeletePoint(id) {
    swal({
        title: "Nokta silinsin mi?",
        text: name,
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Hayır",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sil",
        closeOnConfirm: true
    },
       function () {
           $.ajax({
               type: "POST",
               url: "Default.aspx/DeleteData",
               contentType: "application/json; charset=utf-8",
               data: "{id:" + JSON.stringify(id) + "}",
               dataType: "json",
               async: false,
               cache: false,
               success: function (response) {
                   if (response.d) {
                       location.reload();
                       swal("Silindi!", "Nokta Başarıyla Silindi.", "success");
                   }
                   else {
                       swal("Hata", "Silme İşlemi Sırasında Bir Hata Meydana Geldi.", "error");
                   }
               },
               error: function (request, status, error) {
                   swal("Hata", "Bir Hatayla Karşılaşıldı", "error");
               }
           })
       });
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
                google.maps.event.addListener(map, 'click', function (event) {
                    //delete the old marker
                    if (marker) {
                        marker.setMap(null);
                        insertmarker();
                    }
                    //creer à la nouvelle emplacement
                    marker = new google.maps.Marker({ position: event.latLng, map: map });
                    google.maps.event.addListener(marker, 'click', function () {

                        if (!infowindow) {
                            infowindow = new google.maps.InfoWindow();
                        }

                        infowindow.setContent("<h5>Burayı Kaydetmek Istermisiniz ?</h5> <hr/><div class='text-center'> <a data-toggle='modal' data-target='#yeniwizard' onclick='SaveArea(\"" + event.latLng + "\")' class='btn btn-info btn-sm' style='margin:0 auto'>Kaydet</a></div>");
                        infowindow.open(map, marker);

                    });
                });
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
}
