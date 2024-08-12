'use client';
import React, { useContext } from 'react';
import styles from './Field.module.css';
import { ValidationRules } from '@/lib/types';
import { FormContext } from '@/app/contexts/FormContext';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    validation?: ValidationRules,
    blurHandler?: (validationRules: ValidationRules, value: string) => string[]
}

const Field = ({ validation, blurHandler, ...rest }: FieldProps ) => {

    // Destructure context
    const { setErrors } = useContext(FormContext);

    // Destructure props
    const { name, value } = rest;
    
    // Handle blur events
    function handleBlur(validation: ValidationRules) {
        // Check if validation has been provided.
		if (validation) {
            // Update the errors context with field errors.
			setErrors(name, blurHandler(validation, value as string));
		}
	}

    return (
		<div className={styles.container}>
			<input {...rest} name={name} onBlur={(e) => {handleBlur(validation)}} value={value} />
		</div>
	);
}

export default Field;