using System;

namespace App.ApplicationService.DTO
{
    public class CommentDTO : IDataTransferObject
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Body { get; set; }
        public int AlbumId { get; set; }
        public string UserId { get; set; }
    }
}
