using OopsConcept.Abstraction;
using OopsConcept.Encapsulation;
using OopsConcept.Inheritance;
using OopsConcept.Other;
using OopsConcept.Polymorphism;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace OopsConcept
{
    class Program
    {
        static void Main(string[] args)
        {
            // Abstraction();
            // Encapsulation();
            // Inheritance();
            // Polymorphism();
            // MultipleInterface();
            // RefOutThis();
        }
        private static void Abstraction()
        {
            //You can create instance of abstract class.like below
            //BaseEmployee be = new BaseEmployee()

            //But, Yes you can create instance of child class like below
            //BaseEmployee dbe = new DeveloperEmployees();
            //BaseEmployee hbe = new HrEmployees();

            DeveloperEmployees de = new DeveloperEmployees()
            {
                Id = 10001,
                FirstName = "Mehul",
                MiddleName = "R",
                LastName = "Rudatala",
                MonthlySalary = 15000
            };

            Console.WriteLine("------------ Developer Employee ------------");
            Console.WriteLine(de.GetName());
            Console.WriteLine(de.GetFullName());
            Console.WriteLine(de.GetSalary());
            Console.WriteLine("------------ Developer Employee ------------");
            Console.WriteLine("\n\n");

            HrEmployees hr = new HrEmployees()
            {
                Id = 10001,
                FirstName = "Mehul",
                MiddleName = "R",
                LastName = "Rudatala",
                Commision = 5000,
                TotalHired = 4
            };

            Console.WriteLine("------------ HR Employee ------------");
            Console.WriteLine(hr.GetName());
            Console.WriteLine(hr.GetFullName());
            Console.WriteLine(hr.GetSalary());
            Console.WriteLine("------------ HR Employee ------------");
            Console.ReadLine();
        }
        private static void Encapsulation()
        {
            Accounts accounts = new Accounts();
            Console.WriteLine(accounts.CheckBalance());
            accounts.months = 10;
            Console.WriteLine(accounts.CheckBalance());
            Console.ReadLine();
        }
        private static void Inheritance()
        {
            InheritBase inheritBase = new InheritBase();
            inheritBase.BaseFunInt();
            inheritBase.BaseFunPub();
            Console.WriteLine(inheritBase.BaseVirtual("InheritBase"));
            Console.WriteLine("\n");

            InheritExampleAbc exampleAbc = new InheritExampleAbc();
            Console.WriteLine(exampleAbc.BaseVirtual("InheritExampleAbc"));
            Console.WriteLine("\n");

            InheritExampleXyz exampleXyz = new InheritExampleXyz();
            Console.WriteLine(exampleXyz.BaseVirtual("InheritExampleXyz"));
            Console.WriteLine("\n");

            Console.ReadLine();
        }
        private static void Polymorphism()
        {
            Rectangle rectangle = new Rectangle()
            {
                Height = 3,
                Width = 2
            };
            rectangle.FindArea();
            rectangle.FindArea(30);

            Triangle triangle = new Triangle()
            {
                Height = 3,
                Width = 4,
                Length = 2
            };
            triangle.FindArea();
            triangle.FindArea(50);

            Circle circle = new Circle()
            {
                Radius = 3
            };
            circle.FindArea();
            circle.FindArea(30);

            Console.ReadLine();
        }
        private static void MultipleInterface()
        {
            IInterfaceAbc abc = new MultiInterface();
            Console.WriteLine(abc.One());

            IInterfaceXyz xyz = new MultiInterface();
            Console.WriteLine(xyz.Three());
            Console.ReadLine();
        }
        private static void RefOutThis()
        {
            //It is necessary the parameters should initialize before it pass to ref.
            //It is not necessary to initialize parameters before it pass to out.
            int number = 10;
            int? number2 = null;
            
            RefOutThisKeyward.Addition(number);
            Console.WriteLine(number);

            RefOutThisKeyward.Addition(number2);
            Console.WriteLine(number);

            RefOutThisKeyward.Addition(ref number);
            Console.WriteLine(number);

            RefOutThisKeyward.Substraction(out number);
            Console.WriteLine(number);

            RefOutThisKeyward.Substraction(ref number, out number);
            Console.WriteLine(number);

            number = number.Multiplication();
            Console.WriteLine(number);

            Console.ReadLine();
        }
    }
}
