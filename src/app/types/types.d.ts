declare interface IEvent {
  start: number;
  duration: number;
  title: string;
  _id?: string;
  user_id: string;
}

declare interface IUser {
  name?: string;
  email: string;
  password: string;
  _id?: string;
}
