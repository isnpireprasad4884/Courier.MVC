using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CourierApp.Startup))]
namespace CourierApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
