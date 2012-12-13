using System;
using App.Domain.Model;

namespace App.CrossCutting.Caching
{
    public class CacheService : ICacheService
    {
        public void Store(Album album)
        {
            //TODO
        }

        public Album Get()
        {
            throw new NotImplementedException();
        }
    }
}