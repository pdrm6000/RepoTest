<%@ Page Title="About" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Artists.aspx.cs" Inherits="App.WebForms.Artists" %>

<asp:Content runat="server" ID="BodyContent" ContentPlaceHolderID="MainContent">
    <div class="ArtistTitle span12">
        <h1>Artist directory</h1>
        <a id="removeAlbumButton" data-bind="click: addArtist" class="btn btn-mini pull-right" href="#"><i class="icon-minus"></i></a>
        <a id="addAlbumButton" data-bind="click: addArtist" class="btn btn-mini pull-right" href="#"><i class="icon-plus"></i></a>
    </div>
    <br />
    <br />
    <%#: Model.PageTitle %>
    <asp:Button ID="ButtonArtists" Text="GetArtists" runat="server" OnClick="GetArtists"/>
    <div id="artistDir">
        <div class="span9">
            <asp:ListView ID="categoryList"
                ItemType="App.Domain.ValueObjects.DTO.ArtistDTO"
                runat="server"
                DataSource="<%# Model.ArtistCollection %>">
                <ItemTemplate>
                    <div class="span3">
                        <a href=".">
                            <img style="z-index: 10;" src="<%#: Item.ImageUrl %>"
                                width="200" height="200"
                                class="img-polaroid"
                                onmouseout="$(this).stop().animate({boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'})"
                                onmouseover="$(this).stop().animate({boxShadow: '0 1px 20px rgba(0, 0, 0, 0.7)'})" />
                            <div class="AlbumsDirArtist"><%#: Item.Name %></div>
                        </a>
                    </div>
                </ItemTemplate>
                <ItemSeparatorTemplate>- </ItemSeparatorTemplate>
            </asp:ListView>
        </div>
    </div>
    <div class="span2 well visible-desktop">
        Select one artist to edit<br />
        <br />
        Click add button to create new artist<br />
        <br />
        Click delete button to remove artist selected
    </div>
</asp:Content>
