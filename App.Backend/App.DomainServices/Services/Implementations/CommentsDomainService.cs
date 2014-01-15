using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using System.Linq;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
    public sealed class CommentsDomainService : BaseDomainService<Comment>, ICommentsDomainService
    {
        public CommentsDomainService(IBaseRepository<Comment> commentRepository)
        {
            Repository = commentRepository;
        }

        public Dictionary<int, IEnumerable<Comment>> GetCommentsByAlbums(int[] albumIds)
        {
            return Repository
                    .GetByCondition(c => albumIds.Contains(c.AlbumId))
                    .GroupBy(c => c.AlbumId)
                    .ToDictionary(
                        a => a.Key,
                        b => b.AsEnumerable());
        }
    }
}