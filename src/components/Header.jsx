import './Header.css'
import { SearchBarContext } from '../App';
import { useContext, useState } from 'react';
import Input from './Input';

const Header = ({getWeatherData, loading}) => {
    const ctx = useContext(SearchBarContext);
    const [headerOpen, setHeaderOpen] = useState("false");

    function openHeader() {
        setHeaderOpen((prevHeaderOpen) => {
            return prevHeaderOpen === "false" ? "true" : "false";
        })
    }
    return (
        <>
        <button onClick={() => openHeader()}
            className='mobile-nav-toggle'
            aria-controls='navigation'
            aria-expanded='false'>
                <span className='sr-only' >Menu</span>
            </button>
        <header data-visible={headerOpen}>
            <div className='navigation'>
                <h1>Weather</h1>
                <Input ref={ctx.country} label="Country" inputPlaceholder="Finland" />
                <Input ref={ctx.city} label="City" inputPlaceholder="Helsinki" />
                <button onClick={getWeatherData}>{loading ? "Loading" : "Search"}</button>
            </div>
        </header>
        </>
    );
}
 
export default Header;