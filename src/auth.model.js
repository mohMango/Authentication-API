import { connection } from "./../conneection.js";

export class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
  }

  static async add(newUser) {
    try {
      const sql = await connection();
      await sql.query("INSERT INTO users SET ?;", newUser);
      sql.end();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async addToken(user, token) {
    try {
      const sql = await connection();
      console.log(user);
      await sql.query("INSERT INTO tokens (email, token) VALUES (?,?);", [
        user.email,
        token,
      ]);
      sql.end();
    } catch (error) {
      throw new Error(error);
    }
  }
  static async find(user) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "SELECT * FROM users WHERE email = ?;",
        user.email
      );
      sql.end();
      return { ...row[0] };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(user) {
    try {
      const sql = await connection();
      const [row, schema] = await sql.query(
        "UPDATE users SET password = ? WHERE email = ? ;",
        [user.password, user.email]
      );
      sql.end();
      return { ...row };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async deleteAllSession(user) {
    try {
      const sql = await connection();
      await sql.query("DELETE FROM tokens WHERE email = ?;", user.email);
      sql.end();
    } catch (error) {
      throw new Error(error);
    }
  }

  static async logout(user, token) {
    try {
      const sql = await connection();
      await sql.query("DELETE FROM tokens WHERE email = ? and token = ?;", [
        user.email,
        token,
      ]);
      sql.end();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
