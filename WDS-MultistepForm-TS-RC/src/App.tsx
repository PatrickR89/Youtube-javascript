import { UserForm } from "./UserForm";
import { useMultistepForm } from "./useMultistepForm";
import { AdressForm } from "./AdressForm";
import { AccountForm } from "./AccountForm";
import { FormEvent, useState } from "react";

type FormData = {
	firstName: string;
	lastName: string;
	age: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	email: string;
	password: string;
};

const initialData: FormData = {
	firstName: "",
	lastName: "",
	age: "",
	street: "",
	city: "",
	state: "",
	zip: "",
	email: "",
	password: "",
};

function App() {
	const [data, setData] = useState(initialData);
	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields };
		});
	}
	const {
		step,
		steps,
		currentStepIndex,
		isFirstStep,
		isLastStep,
		previous,
		next,
	} = useMultistepForm([
		<UserForm {...data} updateFields={updateFields} />,
		<AdressForm {...data} updateFields={updateFields} />,
		<AccountForm {...data} updateFields={updateFields} />,
	]);

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		next();
	}

	return (
		<div
			style={{
				position: "relative",
				background: "white",
				border: "1px solid black",
				padding: "2rem",
				margin: "1rem",
				borderRadius: ".5rem",
				fontFamily: "Arial",
			}}
		>
			<form onSubmit={onSubmit}>
				<div
					style={{
						position: "absolute",
						top: ".5rem",
						right: ".5rem",
					}}
				>
					{currentStepIndex + 1} / {steps.length}
				</div>
				{step}
				<div
					style={{
						marginTop: "1rem",
						display: "flex",
						gap: ".5rem",
						justifyContent: "flex-end",
					}}
				>
					{!isFirstStep && (
						<button type="button" onClick={previous}>
							Back
						</button>
					)}
					<button type="submit">{isLastStep ? "Finish" : "Next"}</button>
				</div>
			</form>
		</div>
	);
}

export default App;