interface PlainObject {
	[key: string]: any;
}

export interface Errors {
	[key: string]: Errors | string[];
}

export interface FormData extends PlainObject {}

export interface Payload extends PlainObject {
	path?: string;
	value?: any;
}

export interface FormAction {
	type: string;
	payload?: Payload;
}

interface Format {
	format: RegExp;
	message: string;
}

export interface ValidationRules {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	match?: Format;
	contains?: Format[];
	custom?: { rule: (v: any) => boolean; message: string }[];
}

export interface ValidationConfig {
	[key: string]: ValidationRules | ValidationConfig;
}
