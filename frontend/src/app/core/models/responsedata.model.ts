import { UserDetails } from "./userDetails.model";

export interface Responsedata {
  success: boolean;
  msg?: string;
  token?: string;
  result? : UserDetails
}
