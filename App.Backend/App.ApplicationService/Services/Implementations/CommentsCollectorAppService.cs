using System;
using System.Collections.Generic;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.AppServiceContracts;
using App.ApplicationService.Services.BaseServices;
using App.DomainServices.Services.Contracts;

namespace App.ApplicationService.Services.Implementations
{
    public class CommentsCollectorAppService : BreezeAppService<CommentDTO>, ICommentsCollectorAppService
    {
        private readonly ICommentsDomainService _commentsDomainService;

        public CommentsCollectorAppService(
            ICommentsDomainService commentsDomainService)
        {
            _commentsDomainService = commentsDomainService;
        }

        public override IQueryable<CommentDTO> Entities
        {
            get
            {
                return _commentsDomainService
                    .GetAll()
                    .ToList()
                    .Select(x => x.ToCommentDTO())
                    .AsQueryable();
            }
        }

        public Dictionary<int, IEnumerable<CommentDTO>> GetCommentsByAlbums(int[] albumIds)
        {
            return _commentsDomainService
                    .GetCommentsByAlbums(albumIds)
                    .ToDictionary(
                        a => a.Key,
                        b => b.Value.Select(c => c.ToCommentDTO()));
        }

        protected override CommentDTO OnAdd(CommentDTO entity)
        {
            var comment = entity.ToComment();
            _commentsDomainService.Add(comment);
            return comment.ToCommentDTO();
        }

        protected override int OnDelete(CommentDTO entity)
        {
            throw new NotImplementedException();
        }

        protected override int OnUpdate(CommentDTO entity)
        {
            throw new NotImplementedException();
        }

    }
}