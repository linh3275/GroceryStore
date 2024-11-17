import React from 'react'

import InputContainer from './inputcontainer';

import classes from './input.module.css';

function Input(
    { label, type, defaultValue, onChange, onFocus, onBlur, name, error, textarea = false},
    ref
) {

    const handleChange = (e) => {
        if (onChange) onChange(e);
    };

    const getErrorMessage = () => {
        if(!error) return;
        if(error.message) return error.message;

        switch (error.type) {
            case 'required':
                return 'Chưa điền thông tin !';
            case 'minLength':
                return 'Thông tin điền quá ngắn !';
            default:
                return '*';
        }
    };

  return (
    <InputContainer label={label}>
        <div className={classes.container}>
            {textarea ? (
                <textarea
                    className={classes.textarea}
                    defaultValue={defaultValue}
                    placeholder={label}
                    ref={ref}
                    name={name}
                    onChange={handleChange}
                    onBlur={onBlur}
                    rows="15"
                    spellCheck={false}
                />
            ): (
                <input
                    className={classes.input}
                    defaultValue={defaultValue}
                    type={type}
                    placeholder={label}
                    ref={ref}
                    name={name}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    spellCheck={false}
                />
            )}
            { error && 
                <div className={classes.error} >
                    {getErrorMessage()}
                </div>
            }
        </div>
    </InputContainer>
  )
}

export default React.forwardRef(Input);