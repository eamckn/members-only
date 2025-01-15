const pool = require("./pool");

module.exports.addUser = async (
  firstname,
  lastname,
  email,
  password,
  is_member
) => {
  await pool.query(
    "INSERT INTO members (firstname, lastname, email, password, is_member) VALUES ($1, $2, $3, $4, $5)",
    [firstname, lastname, email, password, is_member]
  );
};

module.exports.updateMembership = async (id) => {
  await pool.query("UPDATE members SET is_member = true WHERE id = $1", [id]);
};
