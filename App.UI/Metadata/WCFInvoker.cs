using System;
using System.ServiceModel.Configuration;
using System.ServiceModel;
using System.Configuration;

namespace AppTest.Metadata
{
    public class WCFInvoker<T> where T : class
    {
        private static readonly ClientSection ClientSection = ConfigurationManager.GetSection("system.serviceModel/client") as ClientSection;

        public TResult Call<TResult>(Func<T, TResult> invokeHandler)
        {
            TResult result = default(TResult);
            using (ChannelFactory<T> myChannelFactory = new ChannelFactory<T>(GetEndpointNameAddressPair(typeof(T))))
            {
                try
                {
                    T instance = myChannelFactory.CreateChannel();
                    result = invokeHandler(instance);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
            return result;
        }

        public void Call(Action<T> invokeHandler)
        {

            using (ChannelFactory<T> myChannelFactory = new ChannelFactory<T>(GetEndpointNameAddressPair(typeof(T))))
            {
                try
                {
                    T instance = myChannelFactory.CreateChannel();
                    invokeHandler(instance);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        private string GetEndpointNameAddressPair(Type serviceContractType)
        {
            var configException = new ConfigurationErrorsException(string.Format("No client endpoint found for type {0}. Please add the section <client><endpoint name=\"myservice\" address=\"http://address/\" binding=\"basicHttpBinding\" contract=\"{0}\"/></client> in the config file.", serviceContractType));
            if (((ClientSection == null) || (ClientSection.Endpoints == null)) || (ClientSection.Endpoints.Count < 1))
            {
                throw configException;
            }
            foreach (ChannelEndpointElement element in ClientSection.Endpoints)
            {
                if (element.Contract == serviceContractType.ToString())
                {
                    return element.Name;
                }
            }
            throw configException;
        }
    }
}