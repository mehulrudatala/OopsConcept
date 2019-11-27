using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Polymorphism
{
    public class Circle : SpaceArea
    {
        public override void FindArea()
        {
            double areaAns = 3.1417 * (Radius * Radius);
            Console.WriteLine("Area of Circle {1} is : {0}", areaAns, Radius);
        }
    }
}
