export class IoC {
  private static instance: IoC;
  private static dependencies = new Map<string, any>();

  private constructor() {}

  public static getInstance(): IoC {
    if (!IoC.instance) {
      IoC.instance = new IoC();
      return IoC.instance;
    }
    return IoC.instance;
  }

  public register(key: string, value: any): void {
    IoC.dependencies.set(key, value);
  }

  public resolve(key: string): any {
    return IoC.dependencies.get(key);
  }
}
