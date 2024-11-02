import pool from "../configs/dbConfig.js";

const getLicensesByType = async () => {
  const result = await pool.query("SELECT * FROM get_licenses_by_type()");
  return result;
};

const getTotalClients = async () => {
  const result = await pool.query("SELECT * FROM get_total_clients()");
  return result;
};

const getTotalDrivers = async () => {
  const result = await pool.query("SELECT * FROM get_total_drivers()");
  return result;
};

const getTotalLicenses = async () => {
  const result = await pool.query("SELECT * FROM get_total_licenses()");
  return result;
};

const getTotalExams = async () => {
  const result = await pool.query("SELECT * FROM get_total_exams()");
  return result;
};

const getPassedPracticalExams = async () => {
  const result = await pool.query("SELECT * FROM get_passed_practical()");
  return result;
};

const getLicensesAboutToExpire = async () => {
  const result = await pool.query("SELECT * FROM get_licencias_por_vencer()");
  return result;
};

const getDriversWithoutMedExams = async () => {
  const result = await pool.query(
    "SELECT * FROM get_conductores_sin_examenes()"
  );
  return result;
};

const getNoPaidInfractions = async () => {
  const result = await pool.query("SELECT * FROM get_no_paid_infractions()");
  return result;
};

const DashboardServices = {
  getLicensesByType,
  getTotalClients,
  getTotalDrivers,
  getTotalLicenses,
  getTotalExams,
  getPassedPracticalExams,
  getLicensesAboutToExpire,
  getDriversWithoutMedExams,
  getNoPaidInfractions,
};

export default DashboardServices;
