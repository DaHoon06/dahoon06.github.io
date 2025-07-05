import styles from "./WeatherPanel.module.scss";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi";

const mockWeather = {
    location: "Seoul, South Korea",
    temperature: 27,
    condition: "Cloudy",
    icon: "cloudy", // sunny | cloudy | rain
    date: "2025-07-01",
};

const getWeatherIcon = (icon: string) => {
    switch (icon) {
        case "sunny":
            return <WiDaySunny className={styles.icon} />;
        case "cloudy":
            return <WiCloudy className={styles.icon} />;
        case "rain":
            return <WiRain className={styles.icon} />;
        default:
            return <WiDaySunny className={styles.icon} />;
    }
};

export const WeatherPanel = () => {
    return (
        <article className={styles.weatherPanel}>
            <div className={styles.location}>{mockWeather.location}</div>
            <div className={styles.date}>{mockWeather.date}</div>
            {getWeatherIcon(mockWeather.icon)}
            <div className={styles.temp}>{mockWeather.temperature}°C</div>
            <div className={styles.condition}>{mockWeather.condition}</div>
        </article>
    );
};
