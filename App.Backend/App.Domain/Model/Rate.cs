using System;
using App.Domain.EntityContract;

namespace App.Domain.Model
{
    public class Rate : IEntity
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public int AlbumId { get; set; }
        public Album Album { get; set; }
        public string UserId { get; set; }
    }
}
