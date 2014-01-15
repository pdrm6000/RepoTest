using System;
using System.Collections.Generic;
using System.Linq;
using App.ApplicationService.DTO;
using App.ApplicationService.Extensions;
using App.ApplicationService.Services.AppServiceContracts;
using App.ApplicationService.Services.BaseServices;
using App.DomainServices.Services.Contracts;

namespace App.ApplicationService.Services.Implementations
{
    public class RatesCollectorAppService : BreezeAppService<RateDTO>, IRatesCollectorAppService
    {
        private readonly IRatesDomainService _ratesDomainService;

        public RatesCollectorAppService(
            IRatesDomainService ratesDomainService)
        {
            _ratesDomainService = ratesDomainService;
        }

        public override IQueryable<RateDTO> Entities
        {
            get
            {
                return _ratesDomainService
                    .GetAll()
                    .ToList()
                    .Select(x => x.ToRateDTO())
                    .AsQueryable();
            }
        }

        public Dictionary<int, double> GetRatesByAlbums(int[] albumIds)
        {
            return _ratesDomainService
                    .GetRatesByAlbums(albumIds);
        }

        protected override RateDTO OnAdd(RateDTO album)
        {
            throw new NotImplementedException();
        }

        protected override int OnDelete(RateDTO entity)
        {
            throw new NotImplementedException();
        }

        protected override int OnUpdate(RateDTO album)
        {
            throw new NotImplementedException();
        }

    }
}