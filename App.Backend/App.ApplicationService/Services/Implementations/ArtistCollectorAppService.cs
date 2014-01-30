using System;
using System.Linq;
using System.Threading;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.BaseServices;
using App.DomainServices.Services.Contracts;

namespace App.ApplicationService.Services.Implementations
{
	public class ArtistCollectorAppService : BreezeAppService<ArtistDTO>, IBreezeApplicationService<ArtistDTO>
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
				Thread.Sleep(4000);
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