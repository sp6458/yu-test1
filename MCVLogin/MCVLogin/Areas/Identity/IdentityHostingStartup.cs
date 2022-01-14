using System;
using MCVLogin.Areas.Identity.Data;
using MCVLogin.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: HostingStartup(typeof(MCVLogin.Areas.Identity.IdentityHostingStartup))]
namespace MCVLogin.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
                services.AddDbContext<MCVLoginContext>(options =>
                    options.UseSqlServer(
                        context.Configuration.GetConnectionString("MCVLoginContextConnection")));

                services.AddDefaultIdentity<ApplicationUser>(options => {
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.SignIn.RequireConfirmedAccount = false;
                })
                .AddEntityFrameworkStores<MCVLoginContext>();
            });
        }
    }
}