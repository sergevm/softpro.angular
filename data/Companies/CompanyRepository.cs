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
        
        Task<Company> Add(Company company);
        
        Task Update(string id, Company company);
        
        Task Delete(string id);
    }
    
    public class CompanyRepository : ICompanyRepository
    {
        private ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.FullName);
        
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
        
        public async Task<Company> Add(Company company)
        {
            await GetCollection().InsertOneAsync(company);
            return company;
        }
        
        public async Task Update(string id, Company company)
        {
            var filter = Builders<Company>.Filter.Eq("_id", ObjectId.Parse(id));
            await GetCollection().ReplaceOneAsync(filter, company);
        }
        
        public async Task Delete(string id)
        {
            var filter = Builders<Company>.Filter.Eq("_id", ObjectId.Parse(id));
            await GetCollection().DeleteOneAsync(filter);            
        }
        
        private IMongoCollection<Company> GetCollection()
        {
            var db = _mongoClient.GetDatabase("test");
            return db.GetCollection<Company>("companies");
        }
    }
}
