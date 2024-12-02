/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInterface {
  id: string;
  email: string;
  fullname: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullname: string;
}

export interface APIStatusResponseInterface {
  data: any;
  message: string;
  statusCode: number;
  success?: boolean;
}

// export interface SpaceInterface {
//   id: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: string;

//   name: string;
//   participants: UserInterface[];
// }
