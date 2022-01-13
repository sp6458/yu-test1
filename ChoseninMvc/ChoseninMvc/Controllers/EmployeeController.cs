using ChoseninMvc.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChoseninMvc.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult AddOrEdit(int id = 0)
        {
            SelectedEmployee emp = new SelectedEmployee();
            using (DBModel db = new DBModel())
            {
                if (id != 0)
                {
                    emp = db.SelectedEmployees.Where(x => x.ID == id).FirstOrDefault();
                    //Multi Select DropDown
                    emp.SelectedIDArray = emp.SelectedEmployeeIDs.Split(',').ToArray();

                }
                emp.EmployeeCollection = db.Employees.ToList();
            }
            return View(emp);
        }

        [HttpPost]
        public ActionResult AddOrEdit(SelectedEmployee emp)
        {
            //multi select dropdown
            emp.SelectedEmployeeIDs = string.Join(",", emp.SelectedIDArray);
            using (DBModel db = new DBModel())
            {
                if (emp.ID == 0)
                {
                    db.SelectedEmployees.Add(emp);

                }
                else
                {
                    db.Entry(emp).State = EntityState.Modified;

                }
                db.SaveChanges();
            }
            return RedirectToAction("AddOrEdit", new { id = 0 });
        }
    }
}