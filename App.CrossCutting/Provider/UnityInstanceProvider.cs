using System;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Dispatcher;
using Microsoft.Practices.Unity;


namespace App.CrossCutting.Provider
{
    public class UnityInstanceProvider : IInstanceProvider
    {
        private readonly Type serviceType;
        public static IUnityContainer Container { get; set; }  // TODO:  Configure your Unity container

        public UnityInstanceProvider(Type serviceType)
        {
            this.serviceType = serviceType;
        }

        #region IInstanceProvider Members

        public object GetInstance(InstanceContext instanceContext, Message message)
        {
            return Container.Resolve(serviceType);  // This is it, the one and only call to Unity in the entire solution!
        }

        public object GetInstance(InstanceContext instanceContext)
        {
            return GetInstance(instanceContext, null);
        }

        public void ReleaseInstance(InstanceContext instanceContext, object instance)
        {
            if (instance is IDisposable)
                ((IDisposable)instance).Dispose();
        }

        #endregion
    }
}