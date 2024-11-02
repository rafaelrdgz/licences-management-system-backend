import pool from "../configs/dbConfig.js";

const getDriverReport = async (driverId) => {
  const result = await pool.query("SELECT * FROM get_conductor_details($1)", [
    driverId,
  ]);
  return result;
};

const getLicensesReport = async (startDate, endDate) => {
  const result = await pool.query(
    "SELECT * FROM get_licenses_by_date_range($1, $2)",
    [startDate, endDate]
  );
  return result;
};

const getExamsReport = async (startDate, endDate) => {
  const result = await pool.query(
    "SELECT * FROM get_exams_by_date_range($1, $2)",
    [startDate, endDate]
  );
  return result;
};

const getInfractionsReport = async (startDate, endDate) => {
  const result = await pool.query(
    "SELECT * FROM get_infractions_by_date_range($1, $2)",
    [startDate, endDate]
  );
  return result;
};

const getExpiredLicensesReport = async (startDate, endDate) => {
  const result = await pool.query(
    "SELECT * FROM get_expired_licenses_by_date_range($1, $2)",
    [startDate, endDate]
  );
  return result;
};

const getInfractionsByType = async (type) => {
  const result = await pool.query("SELECT * FROM get_infractions_by_type($1)", [
    type,
  ]);
  return result;
};

const getInfractionsByYear = async (year) => {
  const result = await pool.query("SELECT * FROM get_infractions_by_year($1)", [
    year,
  ]);
  return result;
};

const ReportsServices = {
  getDriverReport,
  getLicensesReport,
  getExamsReport,
  getInfractionsReport,
  getExpiredLicensesReport,
  getInfractionsByType,
  getInfractionsByYear,
};

export default ReportsServices;
