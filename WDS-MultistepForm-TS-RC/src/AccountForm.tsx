import { FormWrapper } from "./FormWrapper";

type AccountFormDetails = {
	email: string;
	password: string;
};

type AccountFormProps = AccountFormDetails & {
	updateFields: (field: Partial<AccountFormDetails>) => void;
};

export function AccountForm({
	email,
	password,
	updateFields,
}: AccountFormProps) {
	return (
		<FormWrapper title="Account">
			<label>Email</label>
			<input
				type="email"
				required
				autoFocus
				value={email}
				onChange={(e) => updateFields({ email: e.target.value })}
			/>
			<label>Password</label>
			<input
				type="password"
				required
				value={password}
				onChange={(e) => updateFields({ password: e.target.value })}
			/>
		</FormWrapper>
	);
}
