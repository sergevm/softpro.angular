using System.Collections.Generic;
using System.Threading.Tasks;

using log4net;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Data.Projects
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> Find(ProjectFilter projectFilter);
    
            Task<Project> Get(string id);
        
            Task<Project> Add(Project project);
            
            Task Update(string id, Project project);
            
            Task Delete(string id);
    }

    public class ProjectRepository : IProjectRepository
    {
        private ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.FullName);
        
        private IMongoClient _mongoClient;
        
        public ProjectRepository(IMongoClient mongoClient)
        {
            _mongoClient = mongoClient;
        }

        public async Task<IEnumerable<Project>> Find(ProjectFilter projectFilter)
        {
            var projects = GetCollection().Find(x => true);
            var list = await projects.ToListAsync();
            
            _logger.DebugFormat("Project count: {0}", list.Count);
            
            return list;
        }

        public async Task<Project> Get(string id)
        {
            var filter = Builders<Project>.Filter.Eq("_id", ObjectId.Parse(id));
            return await GetCollection().Find(filter).SingleAsync();
        }
        
        public async Task<Project> Add(Project project)
        {
            await GetCollection().InsertOneAsync(project);
            return project;
        }
        
        public async Task Update(string id, Project project)
        {
            var filter = Builders<Project>.Filter.Eq("_id", ObjectId.Parse(id));
            await GetCollection().ReplaceOneAsync(filter, project);
        }
        
        public async Task Delete(string id)
        {
            var filter = Builders<Project>.Filter.Eq("_id", ObjectId.Parse(id));
            await GetCollection().DeleteOneAsync(filter);            
        }


        private IMongoCollection<Project> GetCollection()
        {
            var db = _mongoClient.GetDatabase("test");
            return db.GetCollection<Project>("projects");
        }
    }
}