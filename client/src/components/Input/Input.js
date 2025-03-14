import React from 'react'
import classes from './input.module.css';
import InputContainer from '../InputContainer/InputContainer';

 const Input = ({label, type, defaultValue, onChange, onBlur, name, error}, ref) => {

  const getErrorMessage=()=>{
    if(!error) return;
    if(error.message) return error.message;
    //defaults

    switch (error.type) {
      case 'required':
        return 'This Field Is Required'
      
      case 'minLength':
        return 'Field Is Too Short'
    
      default:
        return '*';
    }
  }

  return (
    <InputContainer label={label}>
      <input 
        className={classes.input}
        type={type}
        placeholder={label}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      {error && <div className={classes.error}>
        {getErrorMessage()}
      </div>}
    </InputContainer>
  )
}

export default React.forwardRef(Input);