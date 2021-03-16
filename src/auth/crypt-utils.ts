import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hash(value: string) {
  return bcrypt.hash(value, saltRounds);
}

export async function compare(a: string, b: string) {
  return bcrypt.compare(a, b);
}
