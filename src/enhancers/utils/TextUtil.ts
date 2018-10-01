export default class TextUtil {
  public static toTitleCase(str: string): string {
    const array = str.toLowerCase().split(' ');
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1);
    }
    return array.join(' ');
  }
}
