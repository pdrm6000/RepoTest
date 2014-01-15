using System.Collections.Generic;

namespace App.ApplicationService.Services.AppServiceContracts
{
    public interface IRatesCollectorAppService
    {
        Dictionary<int, double> GetRatesByAlbums(int[] albumIds);
    }
}