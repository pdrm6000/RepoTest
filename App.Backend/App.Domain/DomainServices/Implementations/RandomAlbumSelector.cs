using System;
using System.Linq;
using App.Domain.DomainServices.Contracts;
using App.Domain.RepositoryContracts;

namespace App.Domain.DomainServices.Implementations
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