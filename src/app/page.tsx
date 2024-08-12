"use client";
import React from "react";
import Form from "./components/Form/Form";
import FormArray from "./components/FormArray/FormArray";
import Field from "./components/Field/Field";
import useForm from "./hooks/useForm";
import { FormData } from "@/lib/types";
import FieldErrors from "./components/FieldErrors/FieldErrors";

export default function Home() {
	const initialData: FormData = {
		email: "",
		password: "",
		user: {
			name: "",
			address: {
				city: "",
				street: "",
				number: "",
			},
			hobbies: [],
		},
	};

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	const form = useForm(initialData, handleSubmit);
	console.log(form);

	return (
		<main>
			<Form form={form}>
				<Field
					type="email"
					name="email"
					placeholder="email"
					validation={{
						required: true,
						match: {
							format: /^(?!.*[_.]{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
							message: "Email not valid!",
						},
					}}
				/>
				<FieldErrors fieldName="" />
				<Field
					type="password"
					name="password"
					placeholder="password"
					validation={{
						required: true,
						minLength: 8,
						contains: [
							{
								format: /[!@#$%^&*(),.?:{}|<>]/,
								message:
									"Password must contain at least 1 special character. Characters allowed are: '!@#$%^&*(),.?:{}|<></>'.",
							},
							{
								format: /[a-z]/,
								message:
									"Password must contain at least 1 lowercase letter.",
							},
							{
								format: /[A-Z]/,
								message:
									"Password must contain at least 1 uppercase letter.",
							},
							{
								format: /[0-9]/,
								message:
									"Password must contain at least 1 number.",
							},
						],
					}}
				/>
				<fieldset>
					<legend>User Information</legend>
					<Field
						type="text"
						name="user.name"
						placeholder="Name"
						validation={{
							required: true,
						}}
					/>
					<fieldset>
						<legend>Address</legend>
						<Field
							type="text"
							name="user.address.number"
							placeholder="Number"
							validation={{
								required: true,
							}}
						/>
						<Field
							type="text"
							name="user.address.street"
							placeholder="Street"
							validation={{
								required: true,
							}}
						/>
						<Field
							type="text"
							name="user.address.city"
							placeholder="City"
							validation={{
								required: true,
							}}
						/>
					</fieldset>
					<FormArray
						name="user.hobbies"
						config={{
							emptyObj: { name: "" },
							legend: "Hobbies",
						}}
					>
						<Field
							type="text"
							name="name"
							placeholder="Hobby"
							validation={{
								required: true,
							}}
						/>
					</FormArray>
				</fieldset>
				<input type="submit" value="Submit" />
			</Form>

			<div>
				<h1>Form Data</h1>
				<p>Email: {form.state.email}</p>
				<p>Password: {form.state.password}</p>
				<div style={{ marginLeft: "10px" }}>
					<h2>User Details</h2>
					<p>Name: {form.state.user.name}</p>
					<p>
						Address: {form.state.user.address.number}{" "}
						{form.state.user.address.street}
						{(form.state.user.address.number ||
							form.state.user.address.street) &&
						form.state.user.address.city
							? ","
							: ""}{" "}
						{form.state.user.address.city}
					</p>
					<div style={{ marginLeft: "10px" }}>
						<h3>Hobbies</h3>
						<ul>
							{form.state.user.hobbies.map((h, i) => {
								return <li key={i}>{h.name}</li>;
							})}
						</ul>
					</div>
				</div>
			</div>
		</main>
	);
}
