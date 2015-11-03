<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/css/sweetalert.css" rel="stylesheet" />
    <script src="/js/jquery-1.11.3.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script src="/js/sweetalert.min.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script src="js/Netmap.js"></script>
    <style>
        .modal-open .modal {
            padding-left: 0px !important;
            padding-right: 0px !important;
            overflow-y: scroll;
        }

        html, body {
            height: 100%;
        }

        #main, #main > .row {
            height: 100%;
        }

            #main > .row {
                overflow-y: scroll;
            }

        #mapjs {
            height: 100%;
        }



        #map {
            width: 66.6667%;
            height: 100%;
            position: absolute;
            right: 0;
            top: 52px;
            bottom: 0;
            overflow: hidden;
        }
    </style>
</head>
<body>

    <div id="navbar">
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
                    <li><a href="/Default.aspx">Anasayfa</a></li>
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
    </div>
    <div id="map"></div>
    <div class="container-fluid" id="main">
        <div class="row">
            <div class="col-md-4 col-xs-4" style="overflow-x: scroll; margin-top: 2%">
                <div class="list-group" id="mapjs">
                    <span class="list-group-item text-center">
                        <span>AccPo API Key Giriniz.</span>
                        <input class="form-control" id="accpo" onchange="accpochange()" />
                        <span>Verileriniz İçin Hazırlanan XML Linkini Giriniz.</span>
                        <input type="text" class="form-control" name="name" id="xmllink" onchange="xmlchange()" />
                        <a onclick="AddMarker()" class="form-control btn btn-warning" style="margin-top:2%">Kaydet</a>
                    </span>
                </div>
            </div>
            <div class="col-md-8 col-xs-8"></div>
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
