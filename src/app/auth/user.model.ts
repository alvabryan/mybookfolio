export class User {
  constructor(
    public userType: string,
    public displayName: string,
    public email: string,
    public phoneNumber: string,
    public photoUrl: string,
    public providerId: string,
    public battalionCode: string,
    private uid: string
  ) {}

  get uniqueId() {
    return this.uid;
  }
}
