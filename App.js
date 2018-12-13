import React from 'react';
import { StyleSheet,Text,	StatusBar,	ActivityIndicator,KeyboardAvoidingView,	Platform,
			TextInput, 
			ImageBackground,
			View,
			TouchableOpacity
		} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {

constructor(props){
  super(props);

  this.state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: '',
  };
}

componentDidMount(){
 this.handleUpdateLocation('Dubai');
}


handleUpdateLocation = async city => {
  if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId,
          );

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });

      } catch (e) {
        this.setState({
        loading: false,
        error: true,
      });
    }
  });
};

render() {
  const { loading, error, location, weather, temperature } = this.state;

return (
  <KeyboardAvoidingView style={styles.container} behavior="padding">
    <StatusBar barStyle="light-content" />
    <ImageBackground source={getImageForWeather(weather)} style={styles.imageContainer}
    imageStyle={styles.image}
    >
    <View style={styles.detailsContainer}>

      <ActivityIndicator animating={loading} color="white" size="large" />
      
      {!loading && (
        <View>
          {error && (

            <Text style={[styles.fontKecil, styles.GayaFont]}>
             Please Input Keyword or Invalid Keyword(
            </Text>
          )}

          {!error && (
            <View>
              <Text style={[styles.fontBesar, styles.GayaFont]}>
                {location}
              </Text>
              <Text style={[styles.fontKecil, styles.GayaFont]}>
                {weather}
              </Text>
              <Text style={[styles.fontBesar, styles.GayaFont]}>
                {`${Math.round(temperature)}°`}
              </Text>
            </View>
          )}

          <SearchInput
          placeholder="Cari Kota"
          onSubmit={this.handleUpdateLocation}
          />
        </View>
      )}  

            
              <Text style = {[styles.aLittle, styles.fontSuperKecil]}> Disca Ferly </Text>

        </View>
      </ImageBackground>
    </KeyboardAvoidingView> 
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4d142',

  },

  GayaFont: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ?  'AvenirNext-Regular' : 'Roboto',
    color: 'white',

  },
  fontSuperKecil:{
    fontSize: 12,
  },
  fontKecil: {
    fontSize: 18,
  },

  fontBesar: {
    fontSize: 44,
  },

  imageContainer: { 
    flex: 1, 
  }, 


   aLittle:{
      color: '#fff',
      alignSelf: 'center',
      marginTop: 120,
   },

  image: { 
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover', 
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20, 
  },

});