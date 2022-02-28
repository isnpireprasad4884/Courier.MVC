using CourierApp.Models;
using CourierApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CourierApp.Controllers
{
    public class CourierController : Controller
    {
        public ActionResult Show()
        {
            CourierDAL corDal = new CourierDAL();
            var source = corDal.GetSourceDestination();
            //var destination = corDal.GetSourceDestination();
            ViewBag.source = source;
            //ViewBag.destination = destination;
            return View();

        }

        public ActionResult GetSouceData()
        {
            CourierDAL corDal = new CourierDAL();
            var source = corDal.GetSourceDestination();

            var data = source.Select(p => new
            {
                Source = p.Source,
                SourceID = p.SourceID
            }).Distinct().ToList();

            return Json(data : new { source = data, sourceDestination = source }, behavior: JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Insert(Courier courier)
        {
            CourierDAL courDal = new CourierDAL();
            courDal.Insert(courier);
            return Json(data: "success" , behavior: JsonRequestBehavior.AllowGet);
        }
    }
}