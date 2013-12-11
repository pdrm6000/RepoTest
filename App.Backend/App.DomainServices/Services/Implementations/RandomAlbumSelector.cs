using System;
using System.Linq;
using App.DomainServices.Services.Contracts;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
    public class RandomAlbumSelector : IRandomAlbumSelector
    {
        private readonly IAlbumsRepository _albumsRepository;

        public RandomAlbumSelector(IAlbumsRepository albumsRepository)
        {
            _albumsRepository = albumsRepository;
        }
        public int GetAlbumId()
        {
            var albumIds = _albumsRepository.GetAlbumsIds();
            var random = new Random();
            var albumIdsArray = albumIds as int[] ?? albumIds.ToArray();
            var index = random.Next(0, albumIdsArray.Count());
            return albumIdsArray[index];
        }
    }
}