using System.Collections.Generic;
using App.Domain.EntityContract;

namespace App.Domain.Model
{
    public class Artist : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public List<Album> Albums { get; set; } 
    }
}
