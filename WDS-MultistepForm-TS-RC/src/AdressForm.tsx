import { FormWrapper } from "./FormWrapper";
export function AdressForm() {
	return (
		<FormWrapper title="Adress">
			<label> Street </label>
			<input type="text" autoFocus required />
			<label> City </label>
			<input type="text" required />
			<label> State </label>
			<input type="text" required />
			<label> Zip </label>
			<input type="text" required />
		</FormWrapper>
	);
}
