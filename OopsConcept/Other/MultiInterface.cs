using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Other
{
    /// <summary>
    /// You can implement multiple interface into single class.
    /// </summary>
    public class MultiInterface : IInterfaceAbc, IInterfaceXyz
    {
        public string One()
        {
            return "One";
        }

        public string Three()
        {
            return "Three";
        }

        public string Two()
        {
            return "Two";
        }
    }
    public interface IInterfaceAbc
    {
        string One();
        string Two();
    }
    public interface IInterfaceXyz
    {
        string One();
        string Three();
    }
    public sealed class ExampleCls
    {
        public int num { get; set; }
        public string data { get; set; }
    }
}
