using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Routing;
using Microsoft.Framework.DependencyInjection;

using MongoDB.Driver;
using log4net.Config;

using data.Companies;
using Data.Projects;

namespace server
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
        }

        // This method gets called by a runtime.
        // Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            
            services.AddTransient<ICompanyRepository, CompanyRepository>();
            services.AddTransient<IProjectRepository, ProjectRepository>();
            services.AddSingleton(typeof(IMongoClient), typeof(MongoClient));
            
            BasicConfigurator.Configure();
        }

        // Configure is called after ConfigureServices is called.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            
            app.UseStaticFiles();
            
            app.UseMvc();
       }
    }
}
