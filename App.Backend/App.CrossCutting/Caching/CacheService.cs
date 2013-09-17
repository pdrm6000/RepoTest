using Microsoft.ApplicationServer.Caching;

namespace App.CrossCutting.Caching
{
    public class CacheService : ICacheService
    {
        private static DataCacheFactory _factory;
        private static DataCache _cache;

        public DataCache GetCache()
        {
            if (_cache != null)
                return _cache;

            //Disable tracing to avoid informational/verbose messages on the web page
            DataCacheClientLogManager.ChangeLogLevel(System.Diagnostics.TraceLevel.Off);

            //Pass configuration settings to cacheFactory constructor
            _factory = new DataCacheFactory();

            //Get reference to named cache called "default"
            _cache = _factory.GetCache("default");

            return _cache;
        }
    }
}