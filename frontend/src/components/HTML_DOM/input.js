import React from 'react'

import InputContainer from './inputcontainer';

import classes from './input.module.css';

function Input(
    { label, type, defaultValue, onChange, name, error, textarea = false, },
    ref
) {

    const handleChange = (e) => {

        if (e.target.name === 'stars' || e.target.name === 'price') {

            let value = Number(e.target.value);

            if (e.target.name === "stars") {
                if (value > 5) value = 5;
            }

            if (e.target.name === "price") {
                // const step = 1000;
                // sau này suy nghĩ sau về việc ấn phím mũi tên lên, xuống tăng step
            }
    
            if (value < 0) value = 0;
            
            e.target.value = value;

            onChange({ target: { name: e.target.name, value } })
        }
    
        if (onChange) onChange(e);
    };

    const handleFocus = (e) => {
        if ( e.target.name === "stars" || e.target.name === "price") {
            e.target.value === '0' && (e.target.value = '')
        }
    }

    const handleBlur = (e) => {
        if ( e.target.name === "stars" || e.target.name === "price" ) {
            e.target.value === '' && (e.target.value = '0')
        }
    }

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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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