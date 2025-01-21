const pool = require("./pool");

module.exports.addUser = async (
  firstname,
  lastname,
  email,
  password,
  is_member,
  is_admin
) => {
  await pool.query(
    "INSERT INTO members (firstname, lastname, email, password, is_member, is_admin) VALUES ($1, $2, $3, $4, $5, $6)",
    [firstname, lastname, email, password, is_member, is_admin]
  );
};

module.exports.updateMembership = async (id) => {
  await pool.query("UPDATE members SET is_member = true WHERE id = $1", [id]);
};

module.exports.getMessages = async () => {
  const { rows } = await pool.query(
    "SELECT message_id, timestamp, text, firstname, lastname FROM messages INNER JOIN members ON messages.member_id = members.id"
  );
  return rows;
};

module.exports.addMessage = async (date, message, id) => {
  await pool.query(
    "INSERT INTO messages (timestamp, text, member_id) VALUES ($1, $2, $3)",
    [date, message, id]
  );
};

module.exports.deleteMessage = async (id) => {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [id]);
};
