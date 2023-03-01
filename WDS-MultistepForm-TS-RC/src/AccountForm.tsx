import { FormWrapper } from "./FormWrapper";
export function AccountForm() {
	return (
		<FormWrapper title="Account">
			<label>Email</label>
			<input type="email" required autoFocus />
			<label>Password</label>
			<input type="password" required />
		</FormWrapper>
	);
}
