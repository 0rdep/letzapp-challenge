export class JsonStringTransformer {
  to(data: any): string {
    return JSON.stringify(data);
  }

  from(data: string): any {
    return JSON.parse(data);
  }
}
