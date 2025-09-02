'use client';
import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import FormInputEditFactory from '@/factory/FormInputEditFactory';
import { FormInputModel } from '@/model/formInputModel/FormInputModel';
import { Eye, PlusCircle } from 'lucide-react';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

/**
 * fetch all of form existing components
 * put it in a react component accordingly
 * and yeah figure out how to edit...
 *  
 */


const FormPage = ({ params }: FormPageProp) => {
	const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
	const [createFormInputPanel, setCreateFormInputPanel] = useState(false);
	const [newFormInputType, setNewFormInputType] = useState("");
	const [newQuestion, setNewQuestion] = useState("");
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

	const onAddClick = () => {
		setCreateFormInputPanel(true);
	}

	const onCloseModal = () => {
		setCreateFormInputPanel(false);
	}

	const onPreviewClick = () => {
		window.open(`/form/${formName}`)
	}

	const onSubmitFormInput = async () => {
		onCloseModal();
		if (newFormInputType === "" || newFormInputType === "Please select from input type" || newQuestion === "") {
			//no suybmit
		} else{
			const response = await fetch(`/api/formInputs`, {
				method: 'POST',
				body: JSON.stringify({
					form_input: {
						id: -1,
						form_name: formName,
						type: newFormInputType,
						question: newQuestion
					}
				}),
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const data = await response.json();
			setFormInputs(data.data as FormInputModel[])
			setCreateFormInputPanel(false);
			setNewQuestion("");
			setNewFormInputType("");
		}
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
				<div className="bg-normal-creme w-full h-screen my-5 flex flex-col rounded-2xl">
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
				<div className="fixed bottom-8 right-8 rounded-full w-12 flex items-center justify-center text-3xl font-bold z-50 cursor-pointer bg-white shadow-lg" onClick={onAddClick}>
					<PlusCircle color={"#831515"} size={40} className='w-full rounded-full'></PlusCircle>
				</div>
				<div className="fixed bottom-8 right-24 rounded-full w-12 flex items-center justify-center text-3xl font-bold z-50 cursor-pointer bg-white shadow-lg" onClick={onPreviewClick}>
					<Eye color={"#831515"} size={40} className='w-full rounded-full'></Eye>
				</div>

				{createFormInputPanel && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-80">
						<div className="w-1/3 bg-white rounded-2xl p-8 flex flex-col items-center">
							<h2 className="text-xl font-bold mb-4">Add New Form Input</h2>
							<select className="w-full p-2 border-2 border-black rounded-lg mb-4" onChange={e => setNewFormInputType(e.target.value)}>
								<option value="">Please select form input type</option>
								<option value="text">text</option>
								<option value="option">option</option>
							</select>
							<input type="text" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="Please input your question" className='w-full p-2 border-2 border-black rounded-lg mb-4'></input>
							<div className='flex flex-row gap-5'>
								<button className="mt-6 px-4 py-2 bg-normal-maroon text-white rounded-lg" onClick={onCloseModal}>Close</button>
								<button className="mt-6 px-4 py-2 bg-normal-maroon text-white rounded-lg" onClick={onSubmitFormInput}>Submit</button>
							</div>
						</div>
					</div>
				)}
		</div>
	);
};

export default FormPage;
