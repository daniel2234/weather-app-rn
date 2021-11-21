import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
          Platform, 
          StyleSheet, 
          KeyboardAvoidingView, 
          Text, 
          View,
          ActivityIndicator, 
} from 'react-native';

import SearchInput from './components/SearchInput';
import { fetchLocationId, getWeather } from './utils/api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      error: false,
      location: '',
      temperature: 0,
      weather: '',
    }
  }

  componentDidMount() {
    console.log('Component has mounted.');
    this.handleUpdateLocation('San Francisco')
    console.log(this);
  }

  handleUpdateLocation = async city => {
    if (!city) return;
    
    this.setState({loading: true}, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await getWeather(locationId)

        this.setState({
          loading:false,
          error:false,
          location,
          weather,
          temperature,
        })
      } catch (e) {
        this.setState({
          loading: false,
          error:true
        })
      }
    })


    this.setState({
      location: city,
    })
  }
  render() {
    const {loading, error, location, weather, temperature} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content"/>

        <View style={styles.detailsContainer}>

          <ActivityIndicator animating={loading} color="white" size="large"/>

          {!loading &&  (
            <View>
              {
                error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                      Could not load weather, please try a different city
                  </Text>
                )
              }
            </View>)}

            {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`} 
                    </Text>
                  </View> )}

          <SearchInput 
            placeholder="Search any city"
            onSubmit={this.handleUpdateLocation}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
      },
      android: {
        fontFamily: 'Roboto'
      }
    })
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18
  },
})
