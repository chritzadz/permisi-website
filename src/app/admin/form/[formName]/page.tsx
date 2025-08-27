'use client';
import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import FormInputEditFactory from '@/factory/FormInputEditFactory';
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

	const onFormInputDelete = (id: number) => {
		const fetchFormComponents = async () => {
			const response = await fetch(`/api/formInputs`, {
				method: 'DELETE',
				body: JSON.stringify({
					id: id,
					form_name: formName
				}),
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const data = await response.json();
			setFormInputs(data.data as FormInputModel[])
		};
		fetchFormComponents();
	}

	//acutally we should check the formName if it exists in the databse, else? should not be able to access this page. (for later is fine)

	useEffect(() => {
		const fetchFormComponents = async () => {
			const response = await fetch(`/api/formInputs?formid=${params.formName}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const data = await response.json();
			console.log(data.data);
			setFormInputs(data.data as FormInputModel[])
		};
		fetchFormComponents();
	}, []);


	return (
		<div>
			<div className="w-full justify-center items-center p-5 flex flex-col">
				<h1 className="text-3xl font-bold">{formName}</h1>
				<div className="bg-normal-creme w-full h-screen my-5 flex flex-col">
					{
						formInputs.map((formInput) => (
							<div className="w-full text-md" key={formInput.id}>
								{
									FormInputEditFactory.getFormInput(formInput, onFormInputDelete)
								}
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default FormPage;
