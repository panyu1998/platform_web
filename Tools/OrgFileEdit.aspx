<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OrgFileEdit.aspx.cs" Inherits="BACDC_Platform.Tools.OrgFileEdit" %>
<%--<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title></title>
    <script src="../js/jquery-1.3.1.js" type="text/javascript"></script>
    <SCRIPT ID="clientEventHandlersJS" LANGUAGE="javascript"> 
<!--

    function WebOffice1_NotifyCtrlReady() {
        //LoadOriginalFile接口装载文件,
        //如果是编辑已有文件，则文件路径传给LoadOriginalFile的第一个参数
        var strDocType = "";
        //$.ajax({
        //    type: "POST",
        //    contentType: "application/json",
        //    url: "OrgFileEdit.aspx/GetUserDocType",
        //    cache: false,
        //    dataType: 'json',
        //    success: function (result) {
        //        strDocType = result.d;
                //if (strDocType != 'wps') {
                //    strDocType = "doc";
                //}
                document.all.WebOffice1.LoadOriginalFile(location.href.replace("OrgFileEdit.aspx", "GetOrgFile.ashx"), "doc");
                document.all.WebOffice1.SetTrackRevisions(0);
                document.all.WebOffice1.ShowRevisions(0);



                //屏蔽标准工具栏的前几个按钮
                document.all.WebOffice1.SetToolBarButton2("Standard", 1, 0);
                document.all.WebOffice1.SetToolBarButton2("Standard", 2, 1);
                document.all.WebOffice1.SetToolBarButton2("Standard", 3, 1);
                document.all.WebOffice1.SetToolBarButton2("Standard", 6, 1);


                //屏蔽文件菜单项
                document.all.WebOffice1.SetToolBarButton2("Menu Bar", 0, 1);
                //屏蔽 保存快捷键(Ctrl+S) 
                //document.all.WebOffice1.SetKeyCtrl(595,-1,0);
                //屏蔽 打印快捷键(Ctrl+P) 
                //document.all.WebOffice1.SetKeyCtrl(592,-1,0);
                document.all.WebOffice1.SetToolBarButton2("Standard", 1, 3);
                document.all.WebOffice1.SetToolBarButton2("Standard", 2, 3);
                document.all.WebOffice1.SetToolBarButton2("Standard", 3, 3);
                document.all.WebOffice1.SetKeyCtrl(595, 0, 0);
                document.all.WebOffice1.SetKeyCtrl(592, 0, 0);
            //}
        //});

    }

    function SaveDoc() {
        document.all.WebOffice1.HttpInit();
        document.all.WebOffice1.HttpAddPostCurrFile("DocContent", "");
        var returnValue = document.all.WebOffice1.HttpPost(location.href.replace("OrgFileEdit.aspx", "OrgFileUpload.ashx"));
        if ("succeed" == returnValue)
            alert("文件上传成功");
        else
            alert("文件上传失败");

    }
    //-->
    </SCRIPT>

</head>
<body>
<SCRIPT LANGUAGE="javascript" FOR="WebOffice1" EVENT="NotifyCtrlReady"> 
<!--
    WebOffice1_NotifyCtrlReady() // 在装载完Weboffice(执行<object>...</object>)控件后自动执行WebOffice1_NotifyCtrlReady方法
    //-->
</SCRIPT>

    <form id="form1" runat="server">
    <%--<ext:ResourceManager ID="RM" runat="server"/>
    <ext:Button ID="btnSave" runat="server" Text="保存到服务器">
        <Listeners>
            <Click Handler="SaveDoc();" />
        </Listeners>
    </ext:Button>--%>
    <div>
    <object id="WebOffice1" 
        height="100%" 
        width='100%' 
        style='LEFT: 0px; TOP: 0px'  
        classid='clsid:E77E049B-23FC-4DB8-B756-60529A35FAD5' 
        codebase="WebOffice.ocx">
    <param name='_ExtentX' value='6350' />
    <param name='_ExtentY' value='6350' />
    </object>

    </div>
    </form>
</body>
</html>

