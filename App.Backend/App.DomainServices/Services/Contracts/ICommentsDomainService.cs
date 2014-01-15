using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;

namespace App.DomainServices.Services.Contracts
{
    public interface ICommentsDomainService : IDomainService<Comment>
    {
        Dictionary<int, IEnumerable<Comment>> GetCommentsByAlbums(int[] albumIds);
    }
}