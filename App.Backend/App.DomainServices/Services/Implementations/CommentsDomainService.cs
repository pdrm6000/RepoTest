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
        private readonly IBaseRepository<Comment> _commentRepository;

        public CommentsDomainService(IBaseRepository<Comment> commentRepository) 
            : base(commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public Dictionary<int, IEnumerable<Comment>> GetCommentsByAlbums(int[] albumIds)
        {
            return _commentRepository
                    .GetByCondition(c => albumIds.Contains(c.AlbumId))
                    .GroupBy(c => c.AlbumId)
                    .ToDictionary(
                        a => a.Key,
                        b => b.AsEnumerable());
        }
    }
}