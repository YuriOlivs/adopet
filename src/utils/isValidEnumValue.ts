export default function isValidEnumValue<T extends object>(enumObj: T, value: unknown): boolean {
  return Object.values(enumObj).includes(value as T[keyof T]);
}