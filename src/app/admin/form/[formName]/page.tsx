'use client';
import AdminLoginGuard from '@/components/adminLoginGuard';
import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import FormInputEditFactory from '@/factory/FormInputEditFactory';
import { FormInputModel } from '@/model/formInputModel/FormInputModel';
import { Eye, PlusCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

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
	const { formName } = React.use(params);
	const formNameParse = formName.split('%20').join(' ');
	const [isLoadingFormInput, setIsLoadingFormInput] = useState(true);
	const [selectedFormInput, setSelectedFormInput] = useState(-1);

	const onFormInputDelete = (id: number) => {
		const fetchFormComponents = async () => {
			const response = await fetch(`/api/formInputs`, {
				method: 'DELETE',
				body: JSON.stringify({
					id: id,
					form_name: formNameParse
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
						form_name: formNameParse,
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
			const response = await fetch(`/api/formInputs?formid=${formName}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const data = await response.json();
			setFormInputs(data.data as FormInputModel[])
			setIsLoadingFormInput(false);
		};
		fetchFormComponents();
	}, [formName]);


	return (
		<AdminLoginGuard>
			<div onClick={() => setSelectedFormInput(-1)}>
				<div className="w-full justify-center items-center p-5 flex flex-col">
					<h1 className="text-3xl font-bold">{formNameParse}</h1>
					<div className="w-full h-screen my-5 flex flex-col rounded-2xl">
						{
							isLoadingFormInput? (
								<div className="w-full flex justify-center">
									<ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
								</div>
							) : (
								formInputs.map((formInput) => (
								<div className="w-full text-md" key={formInput.id}>
									{
										FormInputEditFactory.getFormInput(formInput, onFormInputDelete, selectedFormInput, setSelectedFormInput)
									}
								</div>
							))
							)
						}
					</div>
				</div>
					<button 
                        className="fixed bottom-8 right-8 w-14 h-14 bg-normal-maroon text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
                        onClick={onAddClick}
                        title="Add Input"
                    >
						<PlusCircle size={32} />
					</button>
					<button 
                        className="fixed bottom-8 right-24 w-14 h-14 bg-normal-maroon text-white border-2 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50" 
                        onClick={onPreviewClick}
                        title="Preview Form"
                    >
						<Eye size={32} />
					</button>

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
		</AdminLoginGuard>
	);
};

export default FormPage;
