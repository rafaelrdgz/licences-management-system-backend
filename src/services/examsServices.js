import pool from "../configs/dbConfig.js";

const createExam = async (
  id,
  type,
  date,
  result,
  entityCode,
  examinerName,
  personId
) => {
  const r = await pool.query(
    "SELECT * FROM insert_examen($1, $2, $3, $4, $5, $6, $7)",
    [id, type, date, result, entityCode, examinerName, personId]
  );
  return r;
};

const getExams = async () => {
  const result = await pool.query("SELECT * FROM get_examenes()");
  return result;
};

const getExam = async (id) => {
  const result = await pool.query("SELECT * FROM get_examen_by_id($1)", [id]);
  return result;
};

const updateExam = async (
  id,
  type,
  date,
  result,
  entityCode,
  examinerName,
  personId
) => {
  const r = await pool.query(
    "SELECT * FROM update_examen($1, $2, $3, $4, $5, $6, $7)",
    [id, type, date, result, entityCode, examinerName, personId]
  );
  return r;
};

const deleteExam = async (id) => {
  const result = await pool.query("SELECT delete_examen($1)", [id]);
  return result;
};

const checkExams = async (id) => {
  const result = await pool.query("SELECT * FROM examenes_aprobados($1, $2)", [
    id,
    new Date(),
  ]);
  return result;
};

const ExamsServices = {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam,
  checkExams,
};

export default ExamsServices;
