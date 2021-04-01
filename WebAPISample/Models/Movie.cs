using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPISample.Models
{
    public class Movie
    {
        // We dont specify [Key] here becuase by using conventions it knows MovieId is the PK based off of its name.
        public int MovieId { get; set; }
        public string Title { get; set; }
        public string Genre { get; set; }
        public string Director { get; set; }
    }
}
