using System.Collections.Generic;
using App.Domain.Model;

namespace App.DomainServices.Services.Contracts
{
    public interface IRateCalculator
    {
        double Calculate(IEnumerable<Rate> rates);
    }
}
