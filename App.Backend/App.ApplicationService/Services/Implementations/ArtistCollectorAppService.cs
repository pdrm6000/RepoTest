using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.BaseServices;
using App.ApplicationService.Services.AppServiceContracts;
using App.DomainServices.Services.Contracts;

namespace App.ApplicationService.Services.Implementations
{
	public class ArtistCollectorAppService : BreezeAppService<ArtistDTO>, IArtistCollectorAppService
	{
		private readonly IArtistsDomainService _artistsDomainService;

		public ArtistCollectorAppService(IArtistsDomainService artistsDomainService)
		{
			_artistsDomainService = artistsDomainService;
		}

		public override IQueryable<ArtistDTO> Entities
		{
			get
			{
				return _artistsDomainService
					.GetAll()
					.ToList()
					.Select(x => x.ToArtistDTO())
					.AsQueryable();
			}
		}

		protected override ArtistDTO OnAdd(ArtistDTO value)
		{
			var entity = value.ToArtist();
			_artistsDomainService.Add(entity);
			return entity.ToArtistDTO();
		}

		protected override int OnDelete(ArtistDTO entity)
		{
			throw new System.NotImplementedException();
		}

		protected override int OnUpdate(ArtistDTO entity)
		{
			return _artistsDomainService.Modify(entity.ToArtist());
		}
	}
}