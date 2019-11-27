using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Abstraction
{
    //public class HrEmployees
    //{
    //    public int Id { get; set; }
    //    public string FirstName { get; set; }
    //    public string MiddleName { get; set; }
    //    public string LastName { get; set; }
    //    public int Commision { get; set; }
    //    public int TotalHired { get; set; }

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
    //        return this.Commision * this.TotalHired;
    //    }
    //}

    /// <summary>
    /// Here we have class for the HR Employees
    /// Salary will be calculate based on commision
    /// </summary>
    public class HrEmployees : BaseEmployee
    {
        public int Commision { get; set; }
        public int TotalHired { get; set; }

        public override string GetFullName()
        {
            return this.FirstName + " " + this.MiddleName + " " + this.LastName + " Overrided";
        }
        public override float GetSalary()
        {
            return this.Commision * this.TotalHired;
        }
    }
}
