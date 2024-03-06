import {useState} from 'react'
import './App.css'
import {useStateContext} from './Context'
import {BackgroundLayout, WeatherCard, ForecastCard} from './Component'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FaLocationDot} from "react-icons/fa6";
import {faBell} from "@fortawesome/free-solid-svg-icons/faBell";
import {faBellSlash} from "@fortawesome/free-solid-svg-icons/faBellSlash";
import {AiFillCheckCircle} from "react-icons/ai";

function App() {

    const [input, setInput] = useState('')
    const {weather, thisLocation, values, setPlace, findMyState} = useStateContext();
    const [permission, setPermission] = useState("Notification" in window ? Notification.permission : "default");

    async function requestPermission() {
        if ("Notification" in window) {
            const permission = await Notification.requestPermission();
            setPermission(permission);
        }
    }

    async function denyPermission() {
        if ("Notification" in window) {
            setPermission("default");
        }
    }


    async function sendNotification() {
        if ("Notification" in window && permission === "granted") {
            const date = new Date();
            const time = date.getHours()

            let greeting = "Good Evening"
            if (time >= 0 && time < 6) {
                greeting = "Good Night"
            }
            if (time >= 6 && time < 12) {
                greeting = "Good Morning"
            }
            if (time >= 12 && time < 17) {
                greeting = "Good Afternoon"
            }

            new Notification(`${greeting},Today ${thisLocation.split(',')[0]} is ${weather.temp} °C. Have a nice day! `);
        }
    }


    const submitCity = () => {
        setPlace(input)
        setInput('')
    }

    return (
        <div className='w-full h-screen text-white px-8'>
            <nav className='w-full p-3 flex flex-wrap justify-around items-center'>
                <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>

                <div className='bg-white w-[35rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
                    <button className='w-[1.5rem] h-[1.5rem]' onClick={findMyState}

                    >
                        <FaLocationDot className='text-red-700'/>

                    </button>
                    <input type="text" placeholder='Search city' onKeyUp={() => {
                        submitCity();
                    }}
                           className='focus:outline-none w-full text-[#212121] text-lg' value={input}
                           onChange={e => setInput(e.target.value)}/>

                    <button className='w-[1.5rem] h-[1.5rem]' onClick={submitCity}

                    >
                        <AiFillCheckCircle className='text-blue-500'/>

                    </button>
                </div>


                <div
                    className='bg-white w-[15rem] mt-6 md:mt-0 overflow-hidden shadow-2xl rounded flex items-right p-2 gap-2'>
                    {
                        permission !== 'granted' ?


                            <button onClick={requestPermission}
                                    className='focus:outline-none w-full text-[#212121] text-lg' value={input}
                            ><FontAwesomeIcon icon={faBell} className='text-black' shake/>
                            </button>

                            :
                            <>
                                <button onClick={denyPermission}
                                        className='focus:outline-none w-full text-[#212121] text-lg' value={input}>
                                    <FontAwesomeIcon icon={faBellSlash} className='text-black'/>
                                </button>
                                <button onClick={sendNotification}
                                        className='focus:outline-none w-full text-[#212121] text-lg' value={input}
                                >Notify Me
                                </button>
                            </>

                    }

                </div>


            </nav>
            <BackgroundLayout></BackgroundLayout>
            <main className='w-full flex flex-wrap gap-4 py-4 px-[10%] items-center justify-center'>
                <WeatherCard
                    place={thisLocation}
                    windspeed={weather.wspd}
                    humidity={weather.humidity}
                    temperature={weather.temp}
                    heatIndex={weather.heatindex}
                    iconString={weather.conditions}
                    conditions={weather.conditions}
                />

                <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                    {
                        values?.slice(1, 7).map(curr => {
                            return (
                                <ForecastCard
                                    key={curr.datetime}
                                    time={curr.datetime}
                                    temp={curr.temp}
                                    iconString={curr.conditions}
                                />
                            )
                        })
                    }
                </div>
            </main>
        </div>
    )
}


export default App