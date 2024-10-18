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
    category: string;
    address: string;
    location: object;
    imageURL: string;
  };
  MyReview: undefined;
  SearchLocation: undefined;
  Tabs: undefined;
  LocationMapTabs: {
    selectedLocation?: SearchLocation;
  };
  ProfileTabs: undefined;
  BookmarkTabs: undefined;
};