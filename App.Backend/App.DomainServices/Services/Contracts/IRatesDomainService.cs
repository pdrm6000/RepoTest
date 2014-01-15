using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;

namespace App.DomainServices.Services.Contracts
{
    public interface IRatesDomainService : IDomainService<Rate>
    {
        Dictionary<int, double> GetRatesByAlbums(int[] albumIds);
    }
}