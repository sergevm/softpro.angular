using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using data.Companies;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace MyNamespace.Controllers
{
    [Route("api/company")]
    public class CompanyController : Controller
    {
        private readonly ICompanyRepository _companyRepository;
        
        public CompanyController(ICompanyRepository companyRepository)
        {
            _companyRepository = companyRepository;    
        }
        // GET: api/company
        [HttpGet]
        public async Task<IEnumerable<Company>> Get()
        {
            return await _companyRepository.Find(new CompanyFilter());
        }

        // GET api/company/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/company
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/company/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/company/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
