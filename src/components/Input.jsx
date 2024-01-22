import './Input.css'
import { forwardRef } from 'react';

const Input = forwardRef(({label, inputPlaceholder}, ref) => {
    return (
    <div className='input'>
        <label>{label}</label>
        <input ref={ref} type="text" placeholder={inputPlaceholder} />
    </div>);
});
 
export default Input;