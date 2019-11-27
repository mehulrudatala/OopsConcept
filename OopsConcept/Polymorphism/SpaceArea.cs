using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Polymorphism
{
    public class SpaceArea
    {
        public SpaceArea()
        {
            Console.WriteLine("SpaceArea() constructor");
        }

        public double Length { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Radius { get; set; }

        public virtual void FindArea(int num)
        {
            Console.WriteLine(new string('*', num));
        }
        public virtual void FindArea(ref int num)
        {
            Console.WriteLine(new string('-', num));
        }
        public virtual void FindArea()
        {
            Console.WriteLine("Area of {0}x{1} is :", Length, Width);
        }
    }
}
