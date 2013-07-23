using Breeze.WebApi;
using Newtonsoft.Json;

namespace App.UI.Metadata
{
    public class CustomBreezeConfig : BreezeConfig
    {
        ///<summary> Enable sending of null values to the client. </summary>
        protected override JsonSerializerSettings CreateJsonSerializerSettings()
        {
            var baseSettings = base.CreateJsonSerializerSettings();
            baseSettings.NullValueHandling = NullValueHandling.Include; // SEND NULL VALUES
            return baseSettings;
        }
    }
}