using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Abstraction
{
    //public class DeveloperEmployees
    //{
    //    public int Id { get; set; }
    //    public string FirstName { get; set; }
    //    public string MiddleName { get; set; }
    //    public string LastName { get; set; }
    //    public int MonthlySalary { get; set; }

    //    public string GetName()
    //    {
    //        return this.FirstName + " " + this.LastName;
    //    }
    //    public string GetFullName()
    //    {
    //        return this.FirstName + " " + this.MiddleName + " " + this.LastName;
    //    }
    //    public float GetSalary()
    //    {
    //        return this.MonthlySalary * 12;
    //    }
    //}
    /// <summary>
    /// Here we have class for the Developer Employees
    /// Salary will be calculate based on time
    /// </summary>
    public class DeveloperEmployees : BaseEmployee
    {
        public int MonthlySalary { get; set; }

        public override float GetSalary()
        {
            return this.MonthlySalary * 12;
        }
    }
}
