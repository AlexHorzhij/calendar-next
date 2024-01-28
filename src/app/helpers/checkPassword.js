import bcrypt from 'bcrypt';

export async function checkPassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}
