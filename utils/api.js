
//docs state to get to call APU by city ID to get unambiguous result for the city

export const fetchLocationId = async city => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a70dc592f508761002aa4278deff6b8`)
  const cityDetails = await response.json();
  console.log(cityDetails['id']);
  return cityDetails['id']
}


  export const getWeather = async query => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${query}&appid=5a70dc592f508761002aa4278deff6b8`);
      const { name, main, weather } = await response.json();
      const { temp } = main;
      const { description } = weather[0]

      return {
        location: name,
        weather: capitalize(description),
        temperature: convertKelvinToCelsuis(temp),
      }
    } catch (error) {
      console.log(error)
    }
  }


//  used to capitalize the two words for weather type
  function capitalize(word) {
    let text = word.split(' ')
                   .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                   .join(' ');
    return text
  }

  function convertKelvinToCelsuis(temp) {
    return temp - 273.15
  }