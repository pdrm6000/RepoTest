using App.Domain.Model;
using App.DistributedServices.Services;
using App.Domain.ValueObjects.DTO;

namespace AppTest.Metadata
{
    public class DataCollector : IDataCollector
    {
        public Album GetAlbumById(int id)
        {
            var caller = new WCFInvoker<IAlbumsWCF>();
            return caller.Call<Album>(proxy => proxy.GetAlbumById(id));
        }

        public int AddAlbum(Album album)
        {
            var caller = new WCFInvoker<IAlbumsWCF>();
            return caller.Call<int>(proxy => proxy.AddAlbum(album));
        }

        public AlbumDTO GetAlbumRamdon()
        {
            var caller = new WCFInvoker<IAlbumsWCF>();
            return caller.Call<AlbumDTO>(proxy => proxy.GetAlbumRamdon());
        }
    }
}