//using Dapper;
using CourierApp.Models;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Data;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CourierApp.Repository
{
    public class CourierDAL
    {

        public void Insert(Courier courier)

        {
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CourierDataBase"].ToString()))

            {
                //var para = new DynamicParameters();
                //// para.Add("@ID", courier.ID);
                ////para.Add("@SDID", courier.SDID);
                //para.Add("@SDID", 101);
                ////para.Add("@Source", courier.Source);
                ////para.Add("@Destination", courier.Destination);
                //// para.Add("@DistanceKM", courier.DistanceKM);
                //para.Add("@Weight", courier.Weight);
                //para.Add("@Cost", 50);
                //con.Execute("InsertCourierDetails", para, null, 0, CommandType.StoredProcedure);

                SqlCommand cmd = new SqlCommand("InsertCourierDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@SDID", courier.SDID));
                cmd.Parameters.Add(new SqlParameter("@Weight", courier.Weight));
                cmd.Parameters.Add(new SqlParameter("@Cost", courier.Cost));
                con.Open();
                cmd.ExecuteNonQuery();

            }
        }


        public List<Courier> GetSourceDestination()
        {
            List<Courier> lst = new List<Courier>();
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CourierDataBase"].ToString()))
            {
                    SqlCommand cmd = new SqlCommand("GetSourceDestination", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lst.Add(new Courier
                            {
                                Source = Convert.ToString(reader["Source"]),
                                Destination = Convert.ToString(reader["Destination"]),
                                DistanceKM = Convert.ToInt32(reader["DistanceKM"]),
                                SourceID = Convert.ToInt32(reader["SourceID"]),
                                DestinationID=Convert.ToInt32(reader["DestinationId"]),
                                SDID = Convert.ToInt32(reader["SDID"])


                            });
                        }
                    }
                    con.Close();
                return lst;
            }
        }


        private SqlConnection _sqlConnection;
        private SqlCommand _sqlCommand;
        private SqlDataReader _sqlDataReader;
        private string _strsqlcommand;
        private void get()
        {

            try
            {
                _sqlConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["CourierDataBase"].ConnectionString);
                if (_sqlConnection.State != ConnectionState.Open)
                    _sqlConnection.Open();
                _strsqlcommand = "Select * From SourceDestination";
                _sqlCommand = new SqlCommand(_strsqlcommand, _sqlConnection);
                _sqlDataReader = _sqlCommand.ExecuteReader();
                var employeemodellist = new List<Courier>();

                while (_sqlDataReader.Read())
                {
                    var employeeModel = new Courier
                    {
                        SDID = _sqlDataReader.GetInt32(_sqlDataReader.GetOrdinal("Empno")),
                        Source = _sqlDataReader.GetString(_sqlDataReader.GetOrdinal("Ename")),
                        //Job = _sqlDataReader.GetString(_sqlDataReader.GetOrdinal("Job")),
                        //Salary = _sqlDataReader.GetDecimal(_sqlDataReader.GetOrdinal("Sal"))
                    };
                    employeemodellist.Add(employeeModel);
                }

                //EmployeeList = employeemodellist;
                _sqlConnection.Close();
            }
            catch (Exception exception)
            {
               // MessageBox.Show("DataLoading Failed beacause of following  Reason \n" + exception.Message, "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }




        }
    }
    
}