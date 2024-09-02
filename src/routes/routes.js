import {Router} from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("hola");
});

// router.get("/entities", async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM show_entidad()");
//     const data = result.rows.map((obj) => obj.show_entidad);
//     res.send(result);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error al llamar a la función");
//   }
// });

// router.get("/entities/add", async (req, res) => {
//   try {
//     const params = [
//       "asd",
//       "AUTOESCUELA",
//       "sadasd",
//       "asdasd",
//       "asdasd",
//       "zxccxz",
//     ];
//     const result = await pool.query(
//       "SELECT insert_entidad($1,$2,$3,$4,$5,$6)",
//       params
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error al llamar a la función");
//   }
// });

export default router;
