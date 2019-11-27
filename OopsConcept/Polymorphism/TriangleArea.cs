using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Polymorphism
{
    public class Triangle : SpaceArea
    {
        public override void FindArea()
        {
            double areaAns = (Height * Width * Length) / 2;
            Console.WriteLine("Area of Triangle {1}x{2}x{3} is : {0}", areaAns, Height, Width, Length);
        }
    }
}
