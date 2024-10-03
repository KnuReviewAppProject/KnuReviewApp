import { Restaurant } from "../utils/data/type";

declare type ROOT_NAVIGATION = {
  Login: undefined;
  AuthEmail: undefined;
  AuthCode: undefined;
  Register: undefined;
  SignupFinish: undefined;
  EditProfile: undefined;
  DetailLocation: {
    data: Restaurant;
  };
  ReviewCreate: {
    name: string;
    imageURL: string;
  };
  Tabs: undefined;
  LocationMapTabs: undefined;
  ProfileTabs: undefined;
};