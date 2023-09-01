class ParseApi {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  parseOneObjectResponse(obj: any) {
    return [obj];
  }

  parseObjectResponse(obj: any) {}
}
