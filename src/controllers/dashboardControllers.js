import DashboardServices from "../services/dashboardServices.js";

export const getLicensesByType = async (req, res) => {
  try {
    const result = await DashboardServices.getLicensesByType();
    res.json(result.rows[0].get_licenses_by_type);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getTotalClients = async (req, res) => {
  try {
    const result = await DashboardServices.getTotalClients();
    res.json(result.rows[0].get_total_clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getTotalDrivers = async (req, res) => {
  try {
    const result = await DashboardServices.getTotalDrivers();
    res.json(result.rows[0].get_total_drivers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getTotalLicenses = async (req, res) => {
  try {
    const result = await DashboardServices.getTotalLicenses();
    res.json(result.rows[0].get_total_licenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getTotalExams = async (req, res) => {
  try {
    const result = await DashboardServices.getTotalExams();
    res.json(result.rows[0].get_total_exams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getPassedPracticalExams = async (req, res) => {
  try {
    const result = await DashboardServices.getPassedPracticalExams();
    res.json(result.rows[0].get_passed_practical);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getLicensesAboutToExpire = async (req, res) => {
  try {
    const result = await DashboardServices.getLicensesAboutToExpire();
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getDriversWithoutMedExams = async (req, res) => {
  try {
    const result = await DashboardServices.getDriversWithoutMedExams();
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export const getNoPaidInfractions = async (req, res) => {
  try {
    const result = await DashboardServices.getNoPaidInfractions();
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
