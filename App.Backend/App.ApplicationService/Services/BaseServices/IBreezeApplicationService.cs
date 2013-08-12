using System.Linq;
using Breeze.WebApi;
using Newtonsoft.Json.Linq;

namespace App.ApplicationService.Services.BaseServices
{
    public interface IBreezeApplicationService<T>
    {
        IQueryable<T> Entities { get; }
        SaveResult SaveChanges(JObject saveBundle);
    }
}