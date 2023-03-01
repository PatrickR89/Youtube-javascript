import { FormWrapper } from "./FormWrapper";
type AdressFormDetails = {
	street: string;
	city: string;
	zip: string;
	state: string;
};

type AdressFormProps = AdressFormDetails & {
	updateFields: (fields: Partial<AdressFormDetails>) => void;
};

export function AdressForm({
	street,
	city,
	zip,
	state,
	updateFields,
}: AdressFormProps) {
	return (
		<FormWrapper title="Adress">
			<label> Street </label>
			<input
				type="text"
				autoFocus
				required
				value={street}
				onChange={(e) => updateFields({ street: e.target.value })}
			/>
			<label> City </label>
			<input
				type="text"
				required
				value={city}
				onChange={(e) => updateFields({ city: e.target.value })}
			/>
			<label> State </label>
			<input
				type="text"
				required
				value={state}
				onChange={(e) => updateFields({ state: e.target.value })}
			/>
			<label> Zip </label>
			<input
				type="text"
				required
				value={zip}
				onChange={(e) => updateFields({ zip: e.target.value })}
			/>
		</FormWrapper>
	);
}
