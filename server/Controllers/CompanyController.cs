using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using data.Companies;
using System.Threading.Tasks;
using System.Linq;
using MongoDB.Driver;
using log4net;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNamespace.Controllers
{
    [Route("api/company")]
    public class CompanyController : Controller
    {
        private readonly ICompanyRepository _companyRepository;

        private readonly ILog _logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.FullName);

        public CompanyController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;
        }
        // GET: api/company
        [HttpGet]
        public async Task<IEnumerable<Company>> Get()
        {
            _logger.Debug("Get()");

            var companies = await _companyRepository.Find(new CompanyFilter());
            _logger.DebugFormat("Company count: {0}", companies.Count());

            return companies;
        }

        // GET api/company/5
        [HttpGet("{id}")]
        public async Task<Company> Get(string id)
        {
            try
            {
            _logger.DebugFormat("Get({0})", id);
            var company = await _companyRepository.Get(id);

            return company;
            }
            catch(Exception ex)
            {
                _logger.Error("An exception occurred:", ex);
                throw;
            }
        }

        // POST api/company
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Company company)
        {
            _logger.DebugFormat("Post Company: {0}", company);
            var result = await _companyRepository.Add(company);
            _logger.DebugFormat("Company created with Id: {0}", company.Id);
            return this.Created(Request.Path.ToString() + "/" + company.Id, company);
        }

        // PUT api/company/5
        [HttpPut("{id}")]
        public async void Put(string id, [FromBody]Company company)
        {
            _logger.DebugFormat("Put Company: {0}", company);
            await _companyRepository.Update(id, company);
        }

        // DELETE api/company/5
        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            _logger.DebugFormat("Delete company: {0}", id);
            await _companyRepository.Delete(id);
        }
    }
}
