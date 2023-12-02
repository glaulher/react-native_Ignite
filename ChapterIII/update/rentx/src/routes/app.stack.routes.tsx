import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createNativeStackNavigator();


export function AppStackRoutes(){
    return(
        <Navigator screenOptions={{ headerShown:false }} initialRouteName='home'>
            <Screen 
                name="home"
                component={Home}
            />           
            <Screen 
                name="carDetails"
                component={CarDetails}
            />
            <Screen 
                name="scheduling"
                component={Scheduling}
            />
            <Screen 
                name="confirmation"
                component={Confirmation}
            />
            <Screen 
                name="schedulingDetails"
                component={SchedulingDetails}
            />
            <Screen 
                name="myCars"
                component={MyCars}
            />
        </Navigator>
    )
}