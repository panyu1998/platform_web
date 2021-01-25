<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MainPage.aspx.cs" Inherits="LHCDC.Platform.Web.MainPage" %>
<%@ Register Assembly="Ext.Net" Namespace="Ext.Net" TagPrefix="ext" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <meta http-equiv="Refresh" content="900000;url=session_keep.aspx"/>   
    <script src="js/ext.net-newWindow.js" type="text/javascript"></script>
    <script type="text/javascript">
        var addTab = function (tpMain, target, title, url, icon) {
            var tab = tpMain.getItem(title);
            if (target != "0") {
                if ("" != url) {
                    window.open(url, title, "", "");
                }
            }
            else {
                if (!tab) {
                    tab = tpMain.add({
                        id: title,
                        title: title,
                        closable: true,
                        iconCls: icon,
                        padding: 6,
                        tabTip: title,
                        autoLoad: {
                            showMask: true,
                            url: url,
                            mode: "iframe",
                            maskMsg: "[" + title + "] 正在装载中..."
                        },
                        listeners: {
                            update: {
                                fn: function (tab, cfg) {
                                    cfg.iframe.setHeight(cfg.iframe.getSize().height);
                                },
                                scope: this,
                                single: true
                            }
                        }
                    });
                }
                tpMain.setActiveTab(tab);
            }
        }

        //最大化窗口
        window.resizeTo(window.screen.width, window.screen.height)
        window.moveTo(0, 0)
        //        window.defaultStatus = "Copyright (c)2003-2011, 深圳市中卫信息技术有限公司 All rights reserved";

        function RefreshTree() {
            RM.RefreshMenu({
                success: function (result) {
                    var nodes = eval(result);
                    treePanel.initChildren(nodes);
                    treePanel.expandAll();
                }
            });
        }
        var ShowHelp = function () {
            var activetaburl = tpMain.activeTab.autoLoad.url;
            RM.ShowHelp(activetaburl);
        }
    </script>
    <style type="text/css">
     #systemMenu .x-btn BUTTON
     {
     	font:16px arial,tahoma,verdana,helvetica;
     }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <ext:Hidden runat="server" ID="hdSystemCode"></ext:Hidden>
    <ext:ResourceManager ID="ResourceManager1" runat="server" DirectMethodNamespace="RM" CleanResourceUrl="false" />
    <ext:Viewport ID="ViewPort1" runat="server" Layout="border">
        <Items>
       <%-- <ext:Panel ID="Panel1" runat="server" Region="North" CollapseMode= "Mini" Collapsed="true"  Split="true"  Height="54" Margins="0 0 4 0">--%>
             <ext:Panel ID="Panel1" runat="server" Region="North" Height="60" Margins="0 0 4 0">
            <Content>  
              <%-- <ext:Toolbar ID="systemMenu" runat="server" Region="North" Height="54">--%>
                    <ext:Toolbar runat="server" Region="North" Height="60" >
                    <Items>
                        <ext:Image runat="server" ImageUrl="static/image/logonew.png" />
                        <%--<ext:Label runat="server" ID="lblPlatformName" />
                        <ext:Label runat="server" ID="lbVersion" />--%>
                        <ext:ToolbarFill />
                    </Items>
                </ext:Toolbar>
            </Content>
        </ext:Panel>
            
            <ext:Panel ID="westPanel" runat="server" Region="West" Layout="Fit" Width="180" Header="true"
                Collapsible="true" Split="true" CollapseMode="Default" Margins="0 4 4 0" Border="false"
                Icon="World" Title="<%$ Lang:QuickNavigation %>">
                <Items>
                    <ext:TreePanel ID="treePanel" runat="server" Header="false" AutoScroll="true" Lines="false"
                        UseArrows="true" ContainerScroll="true" RootVisible="false">
                        <TopBar>
                            <ext:Toolbar ID="Toolbar2" runat="server" >
                                <Items>
                                    <ext:ToolbarSeparator />
                                    <ext:Button ID="btnStyle" runat="server" Text="<%$ Lang:ChangeSkin %>" AutoDataBind="true"
                                        Icon="Cmy">
                                        <Menu >
                                            <ext:Menu ID="Menu1" runat="server">
                                                <Items>
                                                    <ext:CheckMenuItem ID="mnuDefault" runat="server" Text="Default" Group="theme" />
                                                    <ext:CheckMenuItem ID="mnuGray" runat="server" Text="Gray" Group="theme" />
                                                    <ext:CheckMenuItem ID="mnuSlate" runat="server" Text="Slate" Group="theme" />
                                                    <ext:CheckMenuItem ID="mnuAccess" runat="server" Text="Access" Group="theme" />
                                                </Items>
                                                <Listeners>
                                                    <ItemClick Handler="RM.GetThemeUrl(menuItem.text,{
                                                       success : function (result) {
                                                           Ext.net.ResourceMgr.setTheme(result);
                                                           tpMain.items.each(function (el) {
                                                               if (!Ext.isEmpty(el.iframe)) {
                                                                   if (el.getBody().Ext) {
                                                                       el.getBody().Ext.net.ResourceMgr.setTheme(result, menuItem.text.toLowerCase());
                                                                   }
                                                               }
                                                           });
                                                       }
                                                   });" />
                                                </Listeners>
                                            </ext:Menu>
                                        </Menu>
                                    </ext:Button>
                                    <ext:ToolbarSeparator />
                                    <ext:ImageButton ID="btnCollapseAll" runat="server" ImageUrl="static/image/collapse-all.gif"
                                        ToolTip="<%$ Lang:Collapse %>">
                                        <Listeners>
                                            <Click Handler="#{treePanel}.root.collapse(true);" />
                                        </Listeners>
                                    </ext:ImageButton>
                                    <ext:ToolbarSeparator />
                                    <ext:ImageButton ID="btnExpandAll" runat="server" ImageUrl="static/image/expand-all.gif"
                                        ToolTip="<%$ Lang:Expand %>">
                                        <Listeners>
                                            <Click Handler="#{treePanel}.root.expand(true);" />
                                        </Listeners>
                                    </ext:ImageButton>
                                </Items>
                            </ext:Toolbar>
                        </TopBar>
                        <Root>
                        </Root>
                        <Listeners>
                            <Click Handler="if(node.firstChild == null){e.stopEvent();addTab(#{tpMain},node.attributes.hrefTarget,node.text,node.attributes.href,node.iconCls);}" />
                        </Listeners>
                    </ext:TreePanel>
                </Items>
            </ext:Panel>           
      
           <ext:TabPanel ID="tpMain" runat="server" Region="Center"  Margins="0 4 4 0" TabWidth="100" MinTabWidth="100" EnableTabScroll="true" ResizeTabs="true" >
                <Items>
                    <ext:Panel ID="tabHome" runat="server" Title="<%$ Lang:Home%>" Icon="House" Width="200">
                    </ext:Panel>
                </Items>
                <Plugins>
                    <ext:TabCloseMenu runat="server" CloseTabText="<%$ Lang:CloseTabText %>" CloseOtherTabsText="<%$ Lang:CloseOtherTabsText %>" CloseAllTabsText="<%$ Lang:CloseAllTabsText %>"  />
                </Plugins>
                <BottomBar>
                    <ext:Toolbar ID="Toolbar1" runat="server" Region="South" Margins="0 4 4 0" Height="25">
                        <Items>
                            <ext:ToolbarFill runat="server" />
                            <ext:Label ID="lblCurrentTime" runat="server">
                            </ext:Label>
                            <ext:ToolbarSeparator runat="server" />
                            <ext:Label ID="lblCurrentUser" runat="server">
                            </ext:Label>
                            <ext:ToolbarSeparator runat="server" />
                            <ext:Button runat="server" Icon="Help" Text="<%$ Lang:ShowHelp %>">
                                <Listeners>
                                    <Click Fn="ShowHelp" />
                                </Listeners>
                            </ext:Button>
                            <ext:ToolbarSeparator runat="server" />
                            <ext:Button runat="server" Text="<%$ Lang:ChangePassword%>" Icon="UserKey">
                                <Listeners><Click Handler="newWindow('密码修改', 'Platform/UserInfoManager.aspx?', 350, 220, '');" /></Listeners>
                            </ext:Button>
                            <ext:ToolbarSeparator runat="server" />
                            <ext:Button runat="server" Icon="ComputerGo" Text="<%$ Lang:LoginOut %>">
                                <DirectEvents><Click OnEvent="Logout_Click" /></DirectEvents>
                            </ext:Button>
                        </Items>
                    </ext:Toolbar>
                </BottomBar>
            </ext:TabPanel>
        </Items>
    </ext:Viewport>
    <ext:TaskManager ID="TaskManager1" runat="server">
        <Tasks>
            <ext:Task>
                <Listeners>
                    <Update Handler="lblCurrentTime.setText(new Date().dateFormat('Y年m月d日 H:i:s'));" />
                </Listeners>
            </ext:Task>
            <ext:Task Interval="10000">
                    <DirectEvents>
                        <Update OnEvent="Task_Update"></Update>
                    </DirectEvents>
            </ext:Task>
        </Tasks>
    </ext:TaskManager>
    </form>
</body>
</html>