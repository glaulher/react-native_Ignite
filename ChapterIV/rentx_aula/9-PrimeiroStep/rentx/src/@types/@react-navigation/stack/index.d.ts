declare namespace ReactNavigation {
  export interface RootParamList extends RootStackParamList {
    Home: NavigationStackProp<string, CarDTO>;
    CarDetails: NavigationStackProp<string, CarDTO>;
    Scheduling: NavigationStackProp<string, CarDTO>;
    SchedulingDetails: NavigationStackProp<string, CarDTO>;
    SchedulingComplete: NavigationStackProp<string, CarDTO>;
    MyCars: NavigationStackProp<string, CarDTO>;
    SignIn: NavigationStackProp<string, string>;
    SignUpFirstStep: NavigationStackProp<string, string>;
  }
}
