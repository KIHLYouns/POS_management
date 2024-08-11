// React_Frontend/src/components/DarkModeToggle.jsx
import React, { useEffect } from "react"; 
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, setDarkModeFromLocalStorage } from "../actions/darkModeActions";

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

    useEffect(() => {
        const root = document.documentElement;
        const isDarkModeFromStorage = localStorage.getItem('isDarkMode') === 'true';
        dispatch(setDarkModeFromLocalStorage(isDarkModeFromStorage));
        if (isDarkMode) {
            root.classList.add("dark-mode");
        } else {
            root.classList.remove("dark-mode");
        }
    }, [isDarkMode, dispatch]);

    const handleToggle = (e) => {
        e.preventDefault(); 
        localStorage.setItem('isDarkMode', !isDarkMode);
        dispatch(toggleDarkMode());
    };

    return (
        <>
            <a href="#" onClick={handleToggle}>
                <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
                Dark Mode
            </a>
        </>
    );
};

export default DarkModeToggle;