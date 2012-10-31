using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using App.Domain.ValueObjects;
using App.Domain.ValueObjects.EntityContract;

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
    }
}
