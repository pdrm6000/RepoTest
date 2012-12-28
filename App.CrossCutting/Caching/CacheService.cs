using System.Collections.Generic;
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

            //Define Array for 1 Cache Host
            var servers = new List<DataCacheServerEndpoint>(1) { new DataCacheServerEndpoint("localhost", 22233) };

            //Create cache configuration
            var configuration = new DataCacheFactoryConfiguration
                                    {
                                        Servers = servers, 
                                        LocalCacheProperties = new DataCacheLocalCacheProperties()
                                    };
            //Disable tracing to avoid informational/verbose messages on the web page
            DataCacheClientLogManager.ChangeLogLevel(System.Diagnostics.TraceLevel.Off);

            //Pass configuration settings to cacheFactory constructor
            _factory = new DataCacheFactory(configuration);

            //Get reference to named cache called "default"
            _cache = _factory.GetCache("default");

            return _cache;
        }
    }
}