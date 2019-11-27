using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Polymorphism
{
    public class Rectangle : SpaceArea
    {
        public override void FindArea()
        {
            double areaAns = Height * Width;
            Console.WriteLine("Area of Rectangle {1}x{2} is : {0}", areaAns, Height, Width);
        }
    }
}
