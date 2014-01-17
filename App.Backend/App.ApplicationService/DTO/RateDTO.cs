using System;

namespace App.ApplicationService.DTO
{
    public class RateDTO : IDataTransferObject
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public int AlbumId { get; set; }
        public string UserId { get; set; }
    }
}