﻿using System.Collections.Generic;
using App.Domain.Model;
using App.DomainServices.BaseTypes;
using App.DomainServices.Services.Contracts;
using System.Linq;
using App.Repositories.Repositories.Contracts;

namespace App.DomainServices.Services.Implementations
{
    public sealed class RatesDomainService : BaseDomainService<Rate>, IRatesDomainService
    {
        private readonly IRateCalculator _rateCalculator;

        public RatesDomainService(IRateCalculator rateCalculator, IBaseRepository<Rate> rateRepository)
        {
            _rateCalculator = rateCalculator;
            Repository = rateRepository;
        }

        public Dictionary<int, double> GetRatesByAlbums(int[] albumIds)
        {
            return Repository
                    .GetByCondition(r => albumIds.Contains(r.AlbumId))
                    .GroupBy(r => r.AlbumId)
                    .ToDictionary(a => a.Key, b => _rateCalculator.Calculate(b));
        }
    }
}
