using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.UI.Metadata
{
    public interface IDataCollector
    {
        Album GetAlbumById(int id);
        AlbumDTO GetAlbumRamdon();
    }
}
