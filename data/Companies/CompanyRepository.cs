using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using MongoDB.Driver;
using MongoDB.Bson;
using log4net;

namespace data.Companies
{
    public interface ICompanyRepository
    {
        Task<IEnumerable<Company>> Find(CompanyFilter filter);
        
        Task<Company> Get(string id);
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
            var companies = GetCollection().Find(x => true);
            var list = await companies.ToListAsync();
            
            _logger.DebugFormat("List count: {0}", list.Count);
            
            return list;
        }
        
        public async Task<Company> Get(string id)
        {
            var filter = Builders<Company>.Filter.Eq("_id", ObjectId.Parse(id));
            return await GetCollection().Find(filter).SingleAsync();
        }
        
        private IMongoCollection<Company> GetCollection()
        {
            var db = _mongoClient.GetDatabase("test");
            return db.GetCollection<Company>("companies");
        }
    }
}
