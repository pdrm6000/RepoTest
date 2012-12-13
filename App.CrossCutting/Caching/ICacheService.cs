using System.Collections.Generic;
using System.Linq;
using System.Text;
using App.Domain.Model;

namespace App.CrossCutting.Caching
{
    public interface ICacheService
    {
        void Store(Album album);
        Album Get();
    }
}
