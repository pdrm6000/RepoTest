using System;
using App.Domain.Model;
using App.Domain.ValueObjects;
using App.Domain.ValueObjects.DTO;

namespace AppTest.Metadata
{
    public interface IDataCollector
    {
        Album GetAlbumById(int id);
        AlbumDTO GetAlbumRamdon();
    }
}
