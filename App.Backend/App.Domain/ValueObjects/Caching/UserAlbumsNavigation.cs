using System;
using System.Collections.Generic;
using System.Linq;
using App.Domain.ValueObjects.DTO;

namespace App.Domain.ValueObjects.Caching
{
    public class UserAlbumsNavigation
    {
        public int _index { get; set; }
        public IEnumerable<AlbumDTO> _albums { get; set; }

        public UserAlbumsNavigation()
        {
            _index = 0;
            _albums = new List<AlbumDTO>();
        }

        public bool IsAtTop()
        {
            return _index == _albums.Count() - 1;
        }

        public AlbumDTO GetNext()
        {
            if (IsAtTop())
                return null;
            _index++;
            return _albums.ElementAt(_index);
        }

        public AlbumDTO GetPrevious()
        {
            if (_index <= 0)
                return null;
            _index--;
            return _albums.ElementAt(_index);
        }

        public void Add(AlbumDTO album)
        {
            var albumDtos = _albums as List<AlbumDTO>;
            if (albumDtos == null) return;
            albumDtos.Add(album);
            _index = _albums.Count() - 1;
        }
    }
}
