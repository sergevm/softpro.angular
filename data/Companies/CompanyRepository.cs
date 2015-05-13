using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using MongoDB.Driver;
using log4net;

namespace data.Companies
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> Find(CompanyFilter filter);
    }
    
    public class CompanyRepository : ICompanyRepository
    {
        private ILog _logger = LogManager.GetLogger("CompanyRepository");
        
        private IMongoClient _mongoClient;
        
        public CompanyRepository(IMongoClient mongoClient)
        {
            _mongoClient = mongoClient;
        }
        
        public async Task<IEnumerable<Company>> Find(CompanyFilter filter)
        {
            var db = _mongoClient.GetDatabase("test");
            var companyCollection = db.GetCollection<Company>("companies");
                       
            var companies = companyCollection.Find(x => true);
            var list = await companies.ToListAsync();
            
            _logger.DebugFormat("List count: {0}", list.Count);
            
            return list;
        }
    }
}
