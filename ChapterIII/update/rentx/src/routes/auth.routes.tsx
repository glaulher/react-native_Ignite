import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';


const { Navigator, Screen } = createNativeStackNavigator();


export function AuthRoutes(){
    return(
        <Navigator screenOptions={{ headerShown:false }} initialRouteName='splash'>
            <Screen 
                name="splash"
                component={Splash}
            />
            <Screen 
                name="signin"
                component={SignIn}
            />
            <Screen 
                name="signupfirststep"
                component={SignUpFirstStep}
            />
             <Screen 
                name="signupsecondstep"
                component={SignUpSecondStep}
            />
            <Screen 
                name="confirmation"
                component={Confirmation}
            />            
        </Navigator>
    )
}