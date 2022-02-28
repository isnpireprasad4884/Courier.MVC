using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourierApp.Models
{
    public class Courier
    {
        public int ID { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public int DistanceKM { get; set; }
        public int Weight { get; set; }
        public int Cost { get; set; }
        public int SourceID { get; set; }
        public int DestinationID { get; set; }
        public int SDID { get; set; }
    }
}