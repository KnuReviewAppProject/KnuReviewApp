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
  Tabs: undefined;
  LocationMapTabs: undefined;
  ProfileTabs: undefined;
};