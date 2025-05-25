export default class CommonUtils {
  public static getCurrentDate(): string {
    const today: Date = new Date();

    const yyyy = today.getFullYear();

    const mm = today.getMonth() + 1;

    const dd = today.getDate();

    const mmInString = mm < 10 ? `0${mm}` : mm.toString();

    return `${yyyy}-${mmInString}-${dd}`;
  }

  public static findObjectValueByKey(key: string, object: any): any {
    const index = Object.keys(object).indexOf(key);
    return Object.values(object)[index];
  }
}
