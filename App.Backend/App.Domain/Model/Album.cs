using App.Domain.EntityContract;

namespace App.Domain.Model
{
	public class Album : IEntity
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string CoverUrl { get; set; }
		public int ArtistId { get; set; }
		public int Year { get; set; }
		public Artist Artist { get; set; }
	}
}
