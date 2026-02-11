'use client';
import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import FormInputEditFactory from '@/factory/FormInputEditFactory';
import { FormInputModel } from '@/model/formInputModel/FormInputModel';
import { Form } from '@/model/formInputModel/Form';
import { Eye, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import CreateFormInputModal from '@/components/modals/CreateFormInputModal';

/**
 * fetch all of form existing components
 * put it in a react component accordingly
 * and yeah figure out how to edit...
 */


const FormPage = ({ params }: FormPageProp) => {
	const router = useRouter();
	const [formInputs, setFormInputs] = useState<FormInputModel[]>([]);
	const [createFormInputPanel, setCreateFormInputPanel] = useState(false);
	const [newFormInputType, setNewFormInputType] = useState("");
	const [newQuestion, setNewQuestion] = useState("");
	const { formName } = React.use(params);
	const formNameParse = formName.split('%20').join(' ');
	const [isLoading, setIsLoading] = useState(true);
	const [selectedFormInput, setSelectedFormInput] = useState(-1);
	const [description, setDescription] = useState("");

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

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const componentsPromise = fetch(`/api/formInputs?formid=${formName}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' }
				});

				const detailsPromise = fetch(`/api/forms?name=${encodeURIComponent(formNameParse)}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' }
				});

				const [componentsResponse, detailsResponse] = await Promise.all([componentsPromise, detailsPromise]);

				if (detailsResponse.status === 404) {
					router.push('/404');
					return;
				}

				const componentsData = await componentsResponse.json();
				setFormInputs(componentsData.data as FormInputModel[]);

				const detailsData = await detailsResponse.json();
				const foundForm = detailsData.data as Form;

				if (foundForm && foundForm.description) {
					setDescription(foundForm.description);
				}
			} catch (error) {
				console.error("Error loading form data", error);
				router.push('/404');
			} finally {
				setIsLoading(false);
			}
		};

		fetchAllData();
	}, [formName, formNameParse, router]);


	if (isLoading) {
		return (
			<div className="w-full h-screen flex justify-center items-center">
				<ClimbingBoxLoader size={15} color={"#670a0a"}></ClimbingBoxLoader>
			</div>
		)
	}


	return (
			<div onClick={() => setSelectedFormInput(-1)}>
				<div className="w-full justify-center items-center p-5 flex flex-col">
					<div className="text-center mb-6">
						<h1 className="text-3xl font-bold text-normal-maroon">{formNameParse}</h1>
						{description && (
							<p className="text-gray-600 mt-2 max-w-2xl">{description}</p>
						)}
					</div>
					<div className="w-full h-screen my-5 flex flex-col rounded-2xl">
						{
							formInputs.map((formInput) => (
								<div className="w-full text-md" key={formInput.id}>
									{
										FormInputEditFactory.getFormInput(formInput, onFormInputDelete, selectedFormInput, setSelectedFormInput)
									}
								</div>
							))
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

					<CreateFormInputModal 
						isOpen={createFormInputPanel}
						onClose={onCloseModal}
						onSubmit={onSubmitFormInput}
						currentType={newFormInputType}
						onTypeChange={setNewFormInputType}
						question={newQuestion}
						onQuestionChange={setNewQuestion}
					/>
			</div>
	);
};

export default FormPage;
