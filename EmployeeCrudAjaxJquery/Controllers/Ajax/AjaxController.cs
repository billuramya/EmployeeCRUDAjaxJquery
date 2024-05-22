namespace JqueryImplementation.Controllers.Ajax
{
    using EmployeeCrudAjaxJquery.Controllers.Context;
    using EmployeeCrudAjaxJquery.Controllers.Entity;
    using EmployeeCrudAjaxJquery.Migrations;
    using Microsoft.AspNetCore.Mvc;
    
    public class AjaxController : Controller
    {
        private readonly EmployeeContext _context;

       
        public AjaxController(EmployeeContext employeeContext)
        {
            this._context = employeeContext;
        }

        public IActionResult Index()
        {
            return this.View();
        }

        [HttpGet]
        public JsonResult EmployeeList()
        {
            var data = this._context.EmployeeDemo.ToList();

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult AddEmployee(EmployeeEntity employee)
        {
            EmployeeEntity emp = new EmployeeEntity()
            {
                Name = employee.Name,
                City = employee.City,
                State = employee.State,
                Salary = employee.Salary,
            };
            this._context.EmployeeDemo.Add(emp);
            this._context.SaveChanges();
            return new JsonResult("Data is Saved");

        }

        public JsonResult Delete(int id)
        {
            var data = this._context.EmployeeDemo.Where(e => e.Id == id).SingleOrDefault();
            this._context.EmployeeDemo.Remove(data);
            this._context.SaveChanges();
            return new JsonResult("Data Deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = this._context.EmployeeDemo.Where(e => e.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        public JsonResult Update(EmployeeEntity employee)
        {
            this._context.EmployeeDemo.Update(employee);
            this._context.SaveChanges();
            return new JsonResult("Record Updated");

        }

    }
}