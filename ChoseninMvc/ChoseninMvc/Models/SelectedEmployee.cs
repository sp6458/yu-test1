//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ChoseninMvc.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class SelectedEmployee
    {
        public int ID { get; set; }
        public string SelectedEmployeeIDs { get; set; }

        [NotMapped]
        public IEnumerable<Employee> EmployeeCollection { get; set; }

        [NotMapped]
        public string[] SelectedIDArray { get; set; }
    }
}
