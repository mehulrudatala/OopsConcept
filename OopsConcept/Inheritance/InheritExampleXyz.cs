using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Inheritance
{
    public class InheritExampleXyz : InheritExampleAbc
    {
        /// <summary>
        /// InheritBase constructor will execute first, then InheritExampleAbc constructor will be execute when you're intialize or create object of InheritExampleXyz.
        /// </summary>
        public InheritExampleXyz()
        {
            Console.WriteLine("Load InheritExampleXyz()");
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
