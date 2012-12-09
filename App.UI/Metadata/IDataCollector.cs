using System;
using App.Domain.Model;
using App.Domain.ValueObjects;
using App.Domain.ValueObjects.DTO;

namespace AppTest.Metadata
{
    public interface IDataCollector
    {
        int AddAlbum(Album album);
        Album GetAlbumById(int id);
        AlbumDTO GetAlbumRamdon();
    }
}
