import {useContext, createContext, useState, useEffect} from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('New York');
    const [thisLocation, setLocation] = useState('');

    const findMyState = () =>{
        const success = (position) =>{
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

            fetch(geoApiUrl)
                .then(res=>res.json())
                .then(data=>{
                    setPlace(data.city);
                })

        }

        const error = () =>{
            console.log('Unable to retrieve your location');
        }
        navigator.geolocation.getCurrentPosition(success,error);
    }

    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
            params: {
                aggregateHours: '24',
                location: place,
                contentType: 'json',
                unitGroup: 'metric',
                shortColumnNames: 0,
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
            }

        }


            const response = await axios.request(options);
            console.log(response.data)
            const thisData  = Object.values(response.data.locations)[0]
            setLocation(thisData.address);
            setValues(thisData.values);
            setWeather(thisData.values[0])


    }



    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
    }, [values])

    return (
        <StateContext.Provider value={{
            weather, setPlace, values, thisLocation, place , findMyState
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

