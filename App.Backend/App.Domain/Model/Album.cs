using System.Runtime.Serialization;
using App.Domain.EntityContract;

namespace App.Domain.Model
{
    [DataContract]
    public class Album : IEntity
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string CoverUrl { get; set; }
        [DataMember]
        public int ArtistId { get; set; }
        [DataMember]
        public int Year { get; set; }

    }
}
