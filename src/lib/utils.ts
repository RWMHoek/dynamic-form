import React from "react";
import _ from "lodash";
import { FormData, ValidationRules } from "./types";

/**
 * Returns a value of the state using a dot notation string with the path to the value.
 * @param {*} state The state object to extract the value from.
 * @param {string} path The path to the value in the provided state object.
 * @returns The value in the state specified by the provided path.
 */
export function getStateWithPath<T extends { [key: string]: any }>(
	state: T,
	path: string
): any {
	// Split the path into keys and copy the state to the value.
	const keys = path.split(".");
	let value = state;
	let exists = true;

	// Loop over each key and update the value.
	keys.forEach((key) => {
		if (key in value) {
			value = value[key];
		} else {
			exists = false;
		}
	});

	// Return the value.
	return exists ? (value as any) : undefined;
}

/**
 * Updates a property specified by the provided path in the provided state with the provided value.
 * @param {T extends { [key: string]: any }} state The state to be updated.
 * @param {string} path The path as a dot notation string to the property in the state.
 * @param {any} value The value to update the property with.
 * @returns {T} The updated state.
 */
export function updateState<T extends { [key: string]: any }>(
	state: T,
	path: string,
	value: any
): T {
	// Split the path into keys and separate the last key.
	const keys = path.split(".");
	const lastKey = keys.pop()!;

	// Clone the state to avoid mutation of original.
	let current: any = _.cloneDeep(state);

	// Traverse the object and assign the value to the target property.
	let target = current;
	keys.forEach((key) => {
		// Create an empty object if key does not exist.
		if (!(key in target)) {
			target[key] = {};
		}
		target = target[key];
	});
	target[lastKey] = value;

	// Return the updated clone.
	return current;
}

/**
 * Checks if a child is a form input that is allowed to take the properties 'onChange', 'onBlur', and 'value'.
 * @param {*} child The React child component to check
 * @returns True if the child is a valid form input or false otherwise
 */
export function isFormInput(child: React.ReactNode) {
	const elements = ["Field", "input"];

	const types = ["text", "number", "password", "email"];

	if (!React.isValidElement(child)) return false;

	if (typeof child.type === "string") {
		return (
			elements.includes(child.type) &&
			(child.props.type ? types.includes(child.props.type) : false)
		);
	} else if (typeof child.type === "function" && child.type.name) {
		return (
			elements.includes(child.type.name) &&
			(child.props.type ? types.includes(child.props.type) : false)
		);
	}

	return false;
}

/**
 * Returns all children of the Form component with handlers added to all eligible form input components.
 * @param {React.Children} children The children to update.
 * @returns The updated children.
 */
export function getChildrenWithProps(
	children: React.ReactNode,
	childOptions: {
		formData: FormData;
		changeHandler: React.ChangeEventHandler<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>;
		blurHandler: (
			validationRules: ValidationRules,
			name: string,
			value: string
		) => void;
	}
) {
	const { formData, changeHandler, blurHandler } = childOptions;

	// Recursively loop over all children
	return React.Children.map(children, (child) => {
		if (!child) return child;

		let props: any = {};
		// Return the child if it does not have any props.
		if (!React.isValidElement(child)) return child;

		// If the child has children, return its children with handlers attached.
		if (child.props.children) {
			props.children = getChildrenWithProps(
				child.props.children,
				childOptions
			);
		}

		if (typeof child.type === "function" && child.type.name === "Field") {
			props.blurHandler = blurHandler;
		}

		// If the child is an eligible form input, add the handlers to the props.
		if (isFormInput(child)) {
			props.value = getStateWithPath(formData, child.props.name);
			props.onChange = changeHandler;
		}

		// update the child with the necessary props and return it.
		return React.cloneElement(child, props);
	});
}
