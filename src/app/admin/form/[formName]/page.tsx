'use client';
import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import { FormInputModel } from '@/model/formInputModel/FormInputModel';
import { SkipBackIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

/**
 * fetch all of form existing components
 * put it in a react component accordingly
 * and yeah figure out how to edit...
 *  
 */

const FormPage = ({ params }: FormPageProp) => {
	const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
	const formName = (params.formName).replace(/%20/g, " ");

	useEffect(() => {
		const fetchFormComponents = async () => {
			const response = await fetch(`/api/formInputs?formid=${params.formName}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const data = await response.json();
			setFormInputs(data.data as FormInputModel[])
		};
		fetchFormComponents();
	}, []);


	return (
		<div>
			<div className="w-full justify-center items-center p-5 flex font-bold text-3xl">
				<h1>{formName}</h1>
			</div>
		</div>
	);
};

export default FormPage;
