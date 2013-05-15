using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using App.Domain.ValueObjects.DTO;

namespace App.WebForms
{
    public partial class About : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public IEnumerable<ArtistDTO> GetArtists()
        {
            return new List<ArtistDTO>
                       {
                           new ArtistDTO { Id = 1, ImageUrl = "lll", Name = "Artist 1" }, 
                           new ArtistDTO { Id = 2, ImageUrl = "222", Name = "Artist 2" }
                       };
        }
    }
}