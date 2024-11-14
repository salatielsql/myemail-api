import { eq } from "drizzle-orm";
import { Db } from "../../config/db";
import { Secure } from "../../helpers/secure";
import { InsertUser, usersModel } from "./users.model";

export class UsersRepository {
  db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createUser(user: InsertUser) {
    const password = await Secure.hashPassword(user.password);

    return this.db
      .insert(usersModel)
      .values({ ...user, password })
      .returning({
        user_id: usersModel.id,
        name: usersModel.name,
        email: usersModel.email,
      });
  }

  async getUserByEmail(email: string) {
    return this.db
      .select()
      .from(usersModel)
      .limit(1)
      .where(eq(usersModel.email, email));
  }
}
