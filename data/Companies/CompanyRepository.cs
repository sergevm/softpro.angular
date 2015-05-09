using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace data.Companies
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> Find(CompanyFilter filter);
    }
    
    public class CompanyRepository : ICompanyRepository
    {
        public CompanyRepository()
        {
        }
        
        public async Task<IEnumerable<Company>> Find(CompanyFilter filter)
        {
            return await Task.FromResult(
                new List<Company>{
                    new Company { Name = "Software-Projects", Vat = "123456789" },
                    new Company { Name = "De Voorzorg", Vat = "987654321" }
                }
            );
        }
    }
}
