export class User {
  constructor(
    public displayName: string,
    public email: string,
    public phoneNumber: string,
    public photoUrl: string,
    public providerId: string,
    private uid: string
  ) {}

  get uniqueId() {
    return this.uid;
  }
}
