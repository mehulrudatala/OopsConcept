using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OopsConcept.Encapsulation
{
    public class Accounts
    {
        internal int months = 12;
        private decimal accountBalance = 500.00m;
        protected decimal tax = 12m;
        public decimal CheckBalance()
        {
            return (accountBalance * months) - (tax * months);
        }
    }
}
