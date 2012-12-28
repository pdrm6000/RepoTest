using Microsoft.ApplicationServer.Caching;

namespace App.CrossCutting.Caching
{
    public interface ICacheService
    {
        DataCache GetCache();
    }
}
