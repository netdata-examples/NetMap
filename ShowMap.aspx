<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ShowMap.aspx.cs" Inherits="ShowMap" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Expo - Netdata</title>
    <link rel="shortcut icon" href="/../img/favicon32.ico" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/sweetalert.css" rel="stylesheet" />
    <script src="js/jquery-1.11.3.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script src="js/sweetalert.min.js"></script>
    <script src="js/ShowMap.js"></script>
    <script src="js/Sharer.js"></script>
    <style>
        .modal-open .modal {
            padding-left: 0px !important;
            padding-right: 0px !important;
            overflow-y: scroll;
        }

        #mapjs {
            height: calc(100vh - 163px);
            position: relative;
            right: 10px;
            top: 32px;
            margin-bottom: 0px;
            overflow: auto;
        }

        #map {
            position: relative;
            height: calc(100vh - 105px);
            right: 10px;
            top: 12px;
            bottom: 0;
            overflow: hidden;
        }


        .navbar-inverse .navbar-nav > li > a {
            color: #fff;
        }

            .navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
                background-color: #3A75D7;
            }

        .navbar-inverse .navbar-nav > .open > a, .navbar-inverse .navbar-nav > .open > a:focus, .navbar-inverse .navbar-nav > .open > a:hover {
            background-color: #3A75D7;
        }

        .navbar {
            border-radius: 0px;
        }

        .btn-link {
            padding: 16px;
        }

        .li > a {
            cursor: pointer;
        }
    </style>
</head>
<body style="background-image: url('image/green.jpg');">

    <%--<div id="navbar">
        <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0; border-radius: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="Default.aspx">Anasayfa</a></li>
                </ul>
                <div class="col-lg-3 pull-right" style="margin-top: 5px; margin-left: 10px">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Yerleşke Ara" name="name" id="aranankelime" />
                        <span class="input-group-btn">
                            <a id="arama" class="btn btn-warning" style="background-color: #2980B9; border-color: #2980B9;" onclick="Ara()">Ara</a>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    </div>--%>

    <nav style="background: #4285F4; border-color: #1995dc;" class="navbar  navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a style="padding-top: 10px;" class="navbar-brand" href="http://www.netdata.com/">
                    <img src="image/logofornetsite2.png" alt="Netdata" />
                </a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li><a href="Default.aspx">Anasayfa</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li style="height: 32px;">
                        <div style="margin-top: 8px;" class="netdata-social-share text-center"></div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid" id="main">
        <div class="row">
            <div class="col-md-4 col-xs-4">

                <div class="" style="position: relative; right: 10px; top: 12px;">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Yerleşke Ara" name="name" id="aranankelime" />
                        <span class="input-group-btn">
                            <a id="arama" class="btn btn-warning" style="background-color: #FF5722; border-color: #FF5722; background-image: none" onclick="Ara()">Ara</a>
                        </span>
                    </div>
                </div>

                <div class="list-group" id="mapjs">
                </div>
            </div>
            <div class="col-md-8 col-xs-8">
                <div id="map"></div>
            </div>
        </div>
    </div>

    <div class="modal modal-vcenter fade" id="yeniwizard" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Kapat</span></button>
                    <h4 class="modal-title" id="myModalLabel">Yeni Veri Ekle</h4>
                </div>
                <div class="modal-body">

                    <div class="input-group" style="width: 100%">
                        <input type="text" class="form-control" placeholder="Alana bir isim veriniz" value="" id="txtareaname" />
                    </div>
                    <div class="input-group" style="width: 100%; margin-top: 2%">
                        <input type="text" class="form-control" readonly="readonly" id="lat" />
                    </div>
                    <div class="input-group" style="width: 100%; margin-top: 2%">
                        <input type="text" class="form-control" readonly="readonly" id="lng" />
                    </div>

                </div>
                <div class="modal-footer">
                    <a onclick="Save()" id="btnmodal" class="btn btn-info pull-right">Kaydet</a>
                    <span id="dataid" class="hidden"></span>
                    <!-- güncelleme -->
                    <a onclick="EditData()" id="btnedit" class="btn btn-info pull-right">Kaydet</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

