using System;
using System.Collections.Generic;
using System.Linq;
using App.Domain.Model;
using App.DomainServices.Services.Contracts;

namespace App.DomainServices.Services.Implementations
{
    public class RateAverageCalculator : IRateCalculator
    {
        public double Calculate(IEnumerable<Rate> rates)
        {
            return rates.Average(r => Convert.ToDouble(r.Value));
        }
    }
}