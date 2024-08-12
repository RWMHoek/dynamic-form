import { FormData, FormAction } from "@/lib/types";
import { getStateWithPath, updateState } from "@/lib/utils";

export enum FormActions {
	UPDATE = "update",
	ADD_TO_ARRAY = "addToArray",
	INSERT_IN_ARRAY = "insertInArray",
	REMOVE_FROM_ARRAY = "removeFromArray",
}

/**
 * Reducer function that takes the state and an action to update the state.
 * @param formData The form state
 * @param action The action
 * @returns The new state.
 */
export function formReducer(formData: FormData, action: FormAction): FormData {
	const { type, payload } = action;

	// Throw an error if no payload is provided, or when the payload does not contain all necessary properties.
	if (!payload) throw new Error(
			`Action type: ${type} requires a payload, but no payload was provided.`
		);
	if (
		type !== FormActions.UPDATE && (
			!payload.path ||
			!payload.value === null ||
			!payload.value === undefined
		)
	) throw new Error(
			`The payload for action type ${type} is missing the 'path' and/or 'value' property.`
		);

	switch (type) {
		case FormActions.UPDATE: {
			// Update the state and return the new state.
			return updateState(formData, payload.path, payload.value);
		}

		case FormActions.ADD_TO_ARRAY: {
			const listData = getStateWithPath(formData, payload.path);
			const newArray = [...listData, payload.emptyObj];

			// Update the state and return the new state.
			return updateState(formData, payload.path, newArray);
		}

		case FormActions.INSERT_IN_ARRAY: {
			const { path, index, emptyObj } = payload;

			const listData = getStateWithPath(formData, path);
			const newArray = [
				...listData.slice(0, index),
				emptyObj,
				...listData.slice(index),
			];

			// Update the state and return the new state.
			return updateState(formData, payload.path, newArray);
		}

		case FormActions.REMOVE_FROM_ARRAY: {
			const { path, index } = payload;

			// Clone the array and remove the specified item from the clone
			const newArray = [...getStateWithPath(formData, path)];
			newArray.splice(index, 1);

			// Update the state and return the new state.
			return updateState(formData, path, newArray);
		}

		default: {
			// Throw an error if the action has an unknown type.
			throw new Error(`Invalid action type: ${type}`);
		}
	}
}
