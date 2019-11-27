using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Inheritance
{
    public class InheritExampleAbc : InheritBase
    {
        /// <summary>
        /// InheritBase constructor will execute first when you're intialize or create object of InheritExampleAbc.
        /// </summary>
        public InheritExampleAbc()
        {
            Console.WriteLine("Load InheritExampleAbc()");
            Console.WriteLine("Get/Set Value from {0}", BaseStrPub);
            Console.WriteLine("Get/Set Value from {0}", BaseStrPro);
            Console.WriteLine("Get/Set Value from {0}", BaseStrInt);
        }
        public override string BaseVirtual(string val = "")
        {
            return "Derived-Class => " + val;
        }
    }
}
