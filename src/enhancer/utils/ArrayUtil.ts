export default class ArrayUtil {
  public static difference<T>(a: T[], b: T[]): T[] {
    return a.concat(b).filter((v: T) => !a.includes(v) || !b.includes(v));
  }

  public static take<T>(array: T[], n: number): T[] {
    return array.slice(0, n);
  }
}
