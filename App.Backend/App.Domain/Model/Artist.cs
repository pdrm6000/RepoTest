using System.Collections.Generic;
using System.Runtime.Serialization;
using App.Domain.EntityContract;

namespace App.Domain.Model
{
    [DataContract]
    public class Artist : IEntity
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string ImageUrl { get; set; }

        public List<Album> Albums { get; set; } 
    }
}
