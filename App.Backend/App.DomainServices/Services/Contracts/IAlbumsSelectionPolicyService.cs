using System.Linq;
using App.Domain.Model;

namespace App.DomainServices.Services.Contracts
{
	public interface IAlbumsSelectionPolicyService
	{
		IQueryable<Album> GetAlbumsForReview(int albumsCount);
	}
}