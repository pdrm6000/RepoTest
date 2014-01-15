using System.Collections.Generic;
using App.ApplicationService.DTO;
using App.ApplicationService.Services.BaseServices;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface ICommentsCollectorAppService : IBreezeApplicationService<CommentDTO>
    {
        Dictionary<int, IEnumerable<CommentDTO>> GetCommentsByAlbums(int[] albumIds);
    }
}