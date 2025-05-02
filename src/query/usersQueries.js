export const getAllUsersQuery = (knex) => knex("users").select("*");

export const getUserByIdQuery = (knex, id) =>
  knex("users").where({ id }).first();

export const createUserQuery = (knex, user) => knex("users").insert(user);

export const updateUserQuery = (knex, id, user) =>
  knex("users").where({ id }).update(user);

export const deleteUserQuery = (knex, id) => knex("users").where({ id }).del();
