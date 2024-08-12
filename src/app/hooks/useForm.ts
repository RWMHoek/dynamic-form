import { Errors, FormData, ValidationConfig } from "@/lib/types";
import { FormEventHandler, useReducer, useState } from "react";
import { formReducer } from "../reducer/formReducer";
import { updateState } from "@/lib/utils";

export default function useForm(
	initialData: FormData,
	submitHandler: FormEventHandler
) {
	const [state, dispatch] = useReducer(formReducer, initialData);
	const [errors, setErrors] = useState<Errors>({});

	function updateErrors(path: string, value: string[]) {
		setErrors((prev) => {
			return updateState(prev, path, value);
		});
	}

	return {
		state,
		dispatch,
		errors,
		setErrors: updateErrors,
		submitHandler,
	};
}
