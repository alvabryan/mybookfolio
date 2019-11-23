export class User {
  constructor(
    public userType: string,
    public displayName: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public photoUrl: string,
    public providerId: string,
    public battalionCode: string,
    public uid: string
  ) {}
}
