import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Screen name="Splash" component={Splash} />

      <Screen
        name="SignIn"
        component={SignIn}
        options={{
          gestureEnabled: false, // desabilita retornar para a tela anterior
        }}
      />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />

      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false, // desabilita retornar para a tela anterior
        }}
      />

      <Screen name="CarDetails" component={CarDetails} />

      <Screen name="Scheduling" component={Scheduling} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />

      <Screen name="SchedulingComplete" component={SchedulingComplete} />

      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
