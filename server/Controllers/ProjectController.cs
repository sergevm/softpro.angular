using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using System.Threading.Tasks;
using log4net;

using Data.Projects;

namespace MyNamespace.Controllers
{
    [Route("api/project")]
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;

        private readonly ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.FullName);
 
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> Get()
        {
            return await _projectRepository.Find(new ProjectFilter());
        }

        [HttpGet("{id}")]
        public async Task<Project> Get(string id)
        {
            try
            {
            _logger.DebugFormat("Get({0})", id);
            var project = await _projectRepository.Get(id);

            return project;
            }
            catch(Exception ex)
            {
                _logger.Error("An exception occurred:", ex);
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Project project)
        {
            _logger.DebugFormat("Post Project: {0}", project);
            var result = await _projectRepository.Add(project);
            _logger.DebugFormat("Project created with Id: {0}", project.Id);
            return this.Created(Request.Path.ToString() + "/" + project.Id, project);
        }

        [HttpPut("{id}")]
        public async void Put(string id, [FromBody]Project project)
        {
            _logger.DebugFormat("Put Project: {0}", project);
            await _projectRepository.Update(id, project);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            _logger.DebugFormat("Delete project: {0}", id);
            await _projectRepository.Delete(id);
        }
    }
}
