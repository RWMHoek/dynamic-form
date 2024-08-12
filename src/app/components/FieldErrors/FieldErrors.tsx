import { FormContext } from "@/app/contexts/FormContext";
import { getStateWithPath } from "@/lib/utils";
import { useContext } from "react";
import styles from "./FieldErrors.module.css";

interface FieldErrorsProps {
	fieldName: string;
}

export default function FieldErrors({ fieldName }: FieldErrorsProps) {
	const { errors } = useContext(FormContext);
	const fieldErrors: string[] = getStateWithPath(errors, fieldName);

	return fieldErrors && fieldErrors.length ? (
		<div className={styles.errors}>
			<ul>
				{fieldErrors.map((error, index) => (
					<li key={index}>{error}</li>
				))}
			</ul>
		</div>
	) : null;
}
