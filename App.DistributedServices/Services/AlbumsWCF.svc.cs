using System;
using App.Domain.AppServiceContracts;
using App.Domain.Model;
using App.Domain.ValueObjects.DTO;


namespace App.DistributedServices.Services
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "AlbumsWCF" en el código, en svc y en el archivo de configuración a la vez.
    public class AlbumsWCF : IAlbumsWCF
    {
        private readonly IAlbumsCollectorAppService _albumsCollectorAppService;

        public AlbumsWCF(IAlbumsCollectorAppService albumsCollectorAppService)
        {
            _albumsCollectorAppService = albumsCollectorAppService;
        }
        public Album GetAlbumById(int id)
        {
            return _albumsCollectorAppService.GetAlbumById(id);
        }

        public int AddAlbum(Album album)
        {
            return _albumsCollectorAppService.AddAlbum(album);
        }

        public AlbumDTO GetAlbumRamdon()
        {
            return _albumsCollectorAppService.GetNextAlbum(Guid.NewGuid());
        }
    }
}
