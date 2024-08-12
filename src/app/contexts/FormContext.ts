import { Errors, FormAction, FormData, ValidationConfig } from "@/lib/types";
import { createContext } from "react";

interface FormContext {
	state: FormData;
	dispatch: React.Dispatch<FormAction>;
	submitHandler: React.FormEventHandler<Element>;
	errors: Errors;
	setErrors: (path: string, value: string[]) => void;
}

export const FormContext = createContext<FormContext | null>(null);
