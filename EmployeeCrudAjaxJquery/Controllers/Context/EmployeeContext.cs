using EmployeeCrudAjaxJquery.Controllers.Entity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCrudAjaxJquery.Controllers.Context
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options) : base (options)
        {
            
        }
        public DbSet<EmployeeEntity> EmployeeDemo {  get; set; }
    }
}
