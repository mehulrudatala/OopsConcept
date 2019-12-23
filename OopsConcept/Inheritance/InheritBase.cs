using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Inheritance
{
    public class InheritBase
    {
        /// <summary>
        /// Public: You can use it anywhere using this class object.
        /// Private: You can use it only in this base class.
        /// Protected: You can use it in this base class and it's derived/child class.
        /// Internal: You can use it in this project/assembly.
        /// 
        /// Multilevel inheritance supported in C#, only multiple inheritance not supported in C#.
        /// 
        /// </summary>
        public InheritBase()
        {
            Console.WriteLine("Load InheritBase()");
        }

        public string BaseStrPub = "BaseStrPub";
        private string BaseStrPvt = "BaseStrPvt";
        protected string BaseStrPro = "BaseStrPro";
        internal string BaseStrInt = "BaseStrInt";

        public void BaseFunPub()
        {
            Console.WriteLine("BaseFunPub()");
            Console.WriteLine(BaseStrPub);
        }
        private void BaseFunPvt()
        {
            Console.WriteLine("BaseFunPvt()");
            Console.WriteLine(BaseStrPvt);
        }
        protected void BaseFunPro()
        {
            Console.WriteLine("BaseFunPro()");
            Console.WriteLine(BaseStrPro);
        }
        internal void BaseFunInt()
        {
            Console.WriteLine("BaseFunInt()");
            Console.WriteLine(BaseStrInt);
        }
        public virtual string BaseVirtual(string val = "")
        {
            return val;
        }
    }
}
