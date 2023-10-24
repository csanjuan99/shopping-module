// Create  IoC container for dependency injection manually

export class Provider {
  private static instance: Provider;
  private static dependencies = new Map<string, any>();

  private constructor() {}

  public static getInstance(): Provider {
    if (!Provider.instance) {
      Provider.instance = new Provider();
      return Provider.instance;
    }
    return Provider.instance;
  }

  public register(key: string, value: any): void {
    Provider.dependencies.set(key, value);
  }

  public resolve(key: string): any {
    return Provider.dependencies.get(key);
  }
}
