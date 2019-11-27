using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Abstraction
{
    /// <summary>
    /// Q1. Why we have to use an Abstract Class?
    /// If we have a different type of classes which has the same properties or methods and we need to combine all of that.
    /// We can manage code easily if have to add new properties
    /// An abstract class is a special type of class that cannot be instantiated and it is designed to be inherited by subclasses that either implement or override its methods.
    /// NOTES:
    /// You can not use sealed or static for abstract class. because sealed means you can not access this class as a base class and abstract means you used this class as a base class.
    /// Abstract method allows the only declaration in the abstract class. And the abstract also only allowed if the class is abstract. and compulsory you have to override in child/derived class. eg. GetSalary()
    /// </summary>

    public abstract class BaseEmployee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }

        public string GetName()
        {
            return this.FirstName + " " + this.LastName;
        }
        public virtual string GetFullName()
        {
            return this.FirstName + " " + this.MiddleName + " " + this.LastName;
        }
        public abstract float GetSalary();
    }
}
