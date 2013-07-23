<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ArtistsGrid.ascx.cs" Inherits="App.WebForms.Controls.Artists.ArtistsGrid" %>

<asp:Button ID="ButtonArtists" Text="GetArtists" runat="server" OnClick="GetArtists" />
<div id="artistDir">
    <div class="span9">
        <a id="removeAlbumButton" data-bind="click: addArtist" class="btn btn-mini pull-right" href="#"><i class="icon-minus"></i></a>
        <a id="addAlbumButton" onclick="addArtist(); return false;" class="btn btn-mini pull-right" href="#"><i class="icon-plus"></i></a>
        <asp:ListView ID="categoryList"
            ItemType="App.Domain.ValueObjects.DTO.ArtistDTO"
            runat="server"
            DataSource="<%# Model.ArtistCollection %>">
            <ItemTemplate>
                <div class="span3">
                    <a href=".">
                        <img style="z-index: 10;" src="Images/Artist/<%#: Item.ImageUrl %>"
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



<div id="addDialog" style="width: 300px" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="Add new artist" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="myModalLabelAdd">Add new artist</h3>
    </div>
    <div class="modal-body">
        <div class="AlbumDirEditRightPanel">
            <p>Artist name</p>
            <asp:TextBox runat="server" id="txtArtistName"></asp:TextBox>
            <p>Image</p>
            <asp:TextBox runat="server" id="txtArtistImg"></asp:TextBox>
        </div>
    </div>
    <div class="modal-footer">
        <asp:Button runat="server" OnClick="AddArtist" Text="Add webforms" class="btn btn-primary"/>
        <button onclick="sendArtist('<%= ResolveUrl("~/Artists.aspx/AddArtist") %>'); return false;" data-dismiss="modal" aria-hidden="true" class="btn btn-primary">Add ajax</button>
        <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>
    </div>
</div>
