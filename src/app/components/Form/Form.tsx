import React, { ChangeEvent, Dispatch } from "react";
import { getChildrenWithProps } from "../../../lib/utils";
import { FormContext } from "@/app/contexts/FormContext";
import { FormActions } from "@/app/reducer/formReducer";
import { Errors, FormAction, FormData, ValidationRules } from "@/lib/types";

interface FormProps {
	form: {
		state: FormData;
		dispatch: Dispatch<FormAction>;
		submitHandler: React.FormEventHandler;
		errors: Errors;
		setErrors: (path: string, value: string[]) => void;
	};
	children?: React.ReactNode;
}

function Form({ form, children }: FormProps) {
	// Destructure all props from form.
	const { state, dispatch, submitHandler, errors, setErrors } = form;

	// Generate an object that holds all context properties.
	const context = {
		state,
		dispatch,
		submitHandler,
		errors,
		setErrors,
	};

	// Generate changeHandler function.
	function changeHandler({
		target,
	}: ChangeEvent<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>) {
		const { name, value } = target;
		dispatch({
			type: FormActions.UPDATE,
			payload: {
				path: name,
				value,
			},
		});
	}

	// Generate blurHandler function.
	function blurHandler(
		validationRules: ValidationRules,
		value: string
	): string[] {
		// Destructure all rules from validationRules
		const {
			required,
			minLength,
			maxLength,
			match,
			contains = [],
			custom = [],
		} = validationRules || {
			required: false,
			minLength: undefined,
			maxLength: undefined,
			format: undefined,
			contains: [],
			custom: [],
		};

		// Generate an empty array
		let errors: string[] = [];

		// Check value against all provided rules and push error messages to array.
		if (!value) {
			if (required) errors.push("This field is required!");
		} else {
			// Only check against rules other than 'required' if the value is not an empty string.
			if (minLength && (value! as string).length < minLength) {
				errors.push(
					`The value of this field must be at least ${minLength} characters long!`
				);
			}

			if (maxLength && (value! as string).length > maxLength) {
				errors.push(
					`The value of this field can not be more than ${maxLength} characters long!`
				);
			}

			if (match && !match.format.test(value as string)) {
				errors.push(match.message);
			}

			if (contains[0]) {
				contains.forEach((item) => {
					if (!item.format.test(value as string))
						errors.push(item.message);
				});
			}

			if (custom[0]) {
				custom.forEach(({ rule, message }) => {
					if (!rule(value)) errors.push(message);
				});
			}
		}

		// Return all errors.
		return errors;
	}

	return (
		<FormContext.Provider value={context}>
			<form action="submit" onSubmit={submitHandler}>
				{getChildrenWithProps(children, {
					formData: state,
					changeHandler,
					blurHandler,
				})}
			</form>
		</FormContext.Provider>
	);
}

export default Form;
