using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.DomainServices.Contracts
{
    public interface IAlbumDTOGeneratorService
    {
        AlbumDTO GetAlbumDTO(Album album, Artist artist);
    }
}
