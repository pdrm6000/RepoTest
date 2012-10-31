using System.ServiceModel;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;

namespace App.DistributedServices.Services
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de interfaz "IAlbumsWCF" en el código y en el archivo de configuración a la vez.
    [ServiceContract]
    public interface IAlbumsWCF
    {
        [OperationContract]
        Album GetAlbumById(int id);

        [OperationContract]
        int AddAlbum(Album album);

        [OperationContract]
        AlbumDTO GetAlbumRamdon();
    }
}
