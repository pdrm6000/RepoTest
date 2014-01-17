using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.AppServiceContracts;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.Rest.Controllers
{
    [BreezeController]
    public class CommentsRestController : ApiController
    {
        private readonly ICommentsCollectorAppService _commentsCollectorAppService;

        public CommentsRestController(ICommentsCollectorAppService commentsCollectorAppService)
        {
            _commentsCollectorAppService = commentsCollectorAppService;
        }

        public IQueryable<CommentDTO> Get()
        {
            return _commentsCollectorAppService.Entities;
        }

        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _commentsCollectorAppService.SaveChanges(saveBundle);
        }

        [HttpGet]
        public Dictionary<int, IEnumerable<CommentDTO>> GetCommentsByAlbums([FromUri] int[] albumIds)
        {
            return _commentsCollectorAppService.GetCommentsByAlbums(albumIds);
        }
    }
}