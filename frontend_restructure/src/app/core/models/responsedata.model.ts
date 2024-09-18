import { UserDetails } from "./userDetails.model";

export interface Responsedata {
  success: boolean;
  msg?: String;
  token?: string;
  result? : UserDetails
}
