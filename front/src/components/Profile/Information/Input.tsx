import React, { forwardRef, ReactNode } from 'react';
import TextField from '@material-ui/core/TextField';

interface InputProps {
	children?: ReactNode;
	className: string;
	label: string;
	type?: string;
  defaultValue?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	return (
		<>
			<TextField
				id="outlined-basic"
				variant="outlined"
				inputRef={ref}
				{...props}
			/>
		</>
	);
});
