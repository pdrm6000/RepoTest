using System;
using App.Domain.Model;
using System.Collections.Generic;
namespace App.Domain.RepositoryContracts
{
    public interface IAlbumsRepository : IBaseRepository<Album>
    {
        IEnumerable<int> GetAlbumsIds();
    }
}
