using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Other
{
    static class RefOutThisKeyward
    {
        //Overload is allowed to use ref and without ref keyword.
        public static void Addition(int num)
        {
            Console.WriteLine("\nAddition(int num)");
            num = num + 10;
        }
        public static void Addition(int? num)
        {
            Console.WriteLine("\nAddition(int? num)");
            num = num + 10;
        }
        public static void Addition(ref int num)
        {
            Console.WriteLine("\nAddition(ref int num)");
            num = num + 10;
        }
        public static void Substraction(out int num)
        {
            Console.WriteLine("\nSubstraction(out int num)");
            num = 50;
            num = num - 5;
        }
        public static void Substraction(ref int num1, out int num2)
        {
            Console.WriteLine("\nSubstraction(ref int num1, out int num2)");
            num2 = num1 - 5;
        }

        //For the extenstion class to be have static
        public static int Multiplication(this int num)
        {
            Console.WriteLine("\nMultiplication(this int num)");
            return num * num;
        }
    }
}
