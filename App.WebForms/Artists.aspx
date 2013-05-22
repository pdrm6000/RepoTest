<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Artists.aspx.cs" Inherits="App.WebForms.Artists" %>

<%@ Register Src="~/Controls/Artists/ArtistsGrid.ascx" TagPrefix="uc1" TagName="ArtistsGrid" %>


<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="ArtistTitle span12">
        <h1><%#: Model.PageTitle %></h1>
    </div>
    <br />
    <br />
    <uc1:ArtistsGrid runat="server" id="ArtistsGridDir" />
    <div class="span2 well visible-desktop">
        Select one artist to edit<br />
        <br />
        Click add button to create new artist<br />
        <br />
        Click delete button to remove artist selected
    </div>
</asp:Content>
