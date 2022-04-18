import firebase from "firebase/app";

// Shared types
export type FirebaseUser = firebase.User;

export interface UserHook {
  user: FirebaseUser;
  setup: Function;
  loginHandler: Function;
  logoutHandler: Function;
}

export interface RankObject {
  rank: number;
  [key: string]: any;
}

export interface ProjectType {
  name: string;
  email: string;
  rank: number;
  order: Array<string>;
}

export interface EndgroupType {
  groupID: number;
}

export interface ParsedEndpointType {
  id: number;
  address: string;
  description: string;
  group: string;
  groupID: string;
  projectID: string;
  rank: number;
  user: string;
  type: string;
  inputs: string;
  outputs: string;
}
