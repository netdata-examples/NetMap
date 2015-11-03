using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.Net;
using System.Xml;
using System.IO;
using System.Data;

public partial class _Default : System.Web.UI.Page
{
    public static string AccPo;
    public static string Xml;
    public static DataSet ds;
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static void SaveProject(string accpo, string xml)
    {
        AccPo = accpo;
        Xml = xml;
    }
    [WebMethod]
    public static string GetData()
    {
        ds = new DataSet();
        ds.ReadXml(Xml);
        char[] labels = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z' };
        StringBuilder sb = new StringBuilder();
        int i = 0;
        foreach (DataRow row in ds.Tables[0].Rows)
        {
            sb.Append("<a onclick=\"ShowPoint('" + i + "')\" class='list-group-item' style='cursor:pointer;'>");
            sb.Append("<span class='badge'>" + labels[i % labels.Length] + "</span>");
            sb.Append("<h4 class='list-group-item-heading'>" + row["dc_Name"] + "</h4>");
            sb.Append("<p class='list-group-item-text'>Latitude:" + row["dc_Latitude"] + "<br/>Longitude:" + row["dc_Longitude"] + "</p>");
            sb.Append("</a>");
            i++;
        }
        return sb.ToString();
    }
    [WebMethod]
    public static string[] GetMarker()
    {
        ds = new DataSet();
        ds.ReadXml(Xml);
        string[] data = new string[ds.Tables[0].Rows.Count];
        int i = 0;
        foreach (DataRow row in ds.Tables[0].Rows)
        {
            data[i] = row["dc_Latitude"].ToString() + "," + row["dc_Longitude"].ToString() + "," + row["dc_Name"] + "," + row["ID"];
            i++;
        }
        return data;
    }
    [WebMethod]
    public static string EditData(string dataid, string name)
    {
        try
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("http://www.netdata.com/AccPo.asmx");
            webRequest.Headers.Add(@"SOAP:Action:http://tempuri.org/UpdateRecord");
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = "POST";
            XmlDocument soapEnvelopeXml = new XmlDocument();
            string envelope = "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><UpdateRecord xmlns='http://tempuri.org/'><APIKey>" + AccPo + "</APIKey><IDNumber>" + Convert.ToInt32(dataid) + "</IDNumber><UpdateFieldName>dc_Name</UpdateFieldName><UpdateFieldNewValue>" + name + "</UpdateFieldNewValue></UpdateRecord></soap:Body></soap:Envelope>";
            soapEnvelopeXml.LoadXml(envelope);

            using (Stream stream = webRequest.GetRequestStream())
            {
                soapEnvelopeXml.Save(stream);
            }
            WebResponse response = webRequest.GetResponse();
            return "success";
        }
        catch (Exception)
        {
            return "exception";
        }
    }
    [WebMethod]
    public static string DeleteData(string id)
    {
        try
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("http://www.netdata.com/AccPo.asmx");
            webRequest.Headers.Add(@"SOAP:Action:http://tempuri.org/DeleteRecord");
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = "POST";
            XmlDocument soapEnvelopeXml = new XmlDocument();
            string envelope = "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><DeleteRecord xmlns='http://tempuri.org/'><APIKey>" + AccPo + "</APIKey><IDNumber>" + id + "</IDNumber></DeleteRecord></soap:Body></soap:Envelope>";
            soapEnvelopeXml.LoadXml(envelope);

            using (Stream stream = webRequest.GetRequestStream())
            {
                soapEnvelopeXml.Save(stream);
            }
            WebResponse response = webRequest.GetResponse();
            return "success";
        }
        catch (Exception)
        {
            return "exception";
        }
    }
    [WebMethod]
    public static string SaveData(string name, string lat, string lng)
    {
        try
        {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create("http://www.netdata.com/AccPo.asmx");
            webRequest.Headers.Add(@"SOAP:Action:http://tempuri.org/InsertRecord");
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = "POST";
            XmlDocument soapEnvelopeXml = new XmlDocument();
            string envelope = "<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><InsertRecord xmlns='http://tempuri.org/'><APIKey>" + AccPo + "</APIKey><InsertList><AccPoKeyValuePair><Key>dc_Latitude</Key><Value>" + lat + "</Value></AccPoKeyValuePair><AccPoKeyValuePair><Key>dc_Longitude</Key><Value>" + lng + "</Value></AccPoKeyValuePair><AccPoKeyValuePair><Key>dc_Name</Key><Value>" + name + "</Value></AccPoKeyValuePair></InsertList></InsertRecord></soap:Body></soap:Envelope>";
            soapEnvelopeXml.LoadXml(envelope);

            using (Stream stream = webRequest.GetRequestStream())
            {
                soapEnvelopeXml.Save(stream);
            }
            WebResponse response = webRequest.GetResponse();
            return "true";
        }
        catch (Exception)
        {
            return "false";
        }
    }
}