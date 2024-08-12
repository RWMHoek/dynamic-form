import { getStateWithPath, isFormInput } from "../../../lib/utils";
import React, { useContext } from "react";
import { FormContext } from "@/app/contexts/FormContext";
import { FormActions } from "@/app/reducer/formReducer";

interface FormArrayProps<T> {
	name: string;
	children: React.ReactNode;
	config: {
		emptyObj: { [key: string]: any };
		withInsert?: boolean;
		legend?: string;
	};
}

export default function FormArray<T extends { [key: string]: any }>({
	name,
	children,
	config,
}: FormArrayProps<T>) {
	const { emptyObj, withInsert = false, legend } = config;

	const { state, dispatch } = useContext(FormContext)!;

	const listData = getStateWithPath(state, name) as { [key: string]: any }[];

	/**
	 * Adds a new empty object (as specified in the FormArray config object) to the field array.
	 */
	function add() {
		console.log("Add gets called...");
		dispatch({
			type: FormActions.ADD_TO_ARRAY,
			payload: {
				path: name,
				emptyObj,
			},
		});
	}

	/**
	 * Inserts a new empty object (as specified in the FormArray config object) to the field array.
	 * @param {number} index The index at which to insert the new empty object.
	 */
	function insert(index: number) {
		dispatch({
			type: FormActions.INSERT_IN_ARRAY,
			payload: {
				path: name,
				index,
				emptyObj,
			},
		});
	}

	/**
	 * Removes an item from the field array.
	 * @param {*} index The index of the field to remove.
	 */
	function remove(index: number) {
		dispatch({
			type: FormActions.REMOVE_FROM_ARRAY,
			payload: {
				path: name,
				index,
			},
		});
	}

	return (
		<fieldset>
			{legend && <legend>{legend}</legend>}
			<ul>
				{
					// Loop over the array.
					listData.map((data, index) => {
						// Update valid child input elements.
						const namedChildren = React.Children.map(
							children,
							(child) => {
								if (
									!React.isValidElement(child) ||
									!isFormInput(child)
								)
									return child;

								// Prepend the name of the child with the name of the FormArray component and set the value to the correct state path.
								const newName = `${name}.${index}.${child.props.name}`;
								return React.cloneElement(child, {
									name: newName,
									value: getStateWithPath(state, newName),
								} as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>);
							}
						);

						return (
							// For each item in the array return a list item.
							<li key={index}>
								{withInsert && (
									<input
										type="button"
										value="Insert"
										onClick={() => {
											insert(index);
										}}
									/>
								)}
								{namedChildren}
								<input
									type="button"
									value="X"
									onClick={() => {
										remove(index);
									}}
								/>
							</li>
						);
					})
				}
				<li>
					<input type="button" value="Add" onClick={add} />
				</li>
			</ul>
		</fieldset>
	);
}
