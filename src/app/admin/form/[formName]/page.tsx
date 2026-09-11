'use client';
import { FormPageProp } from '@/components/properties/FormPageProp.ts';
import FormInputEditFactory from '@/factory/FormInputEditFactory';
import { FormInputModel } from '@/model/formInputModel/FormInputModel';
import { Form } from '@/model/formInputModel/Form';
import { ArrowLeft, Eye, PlusCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from "@/components/loadingSpinner";
import { DisplayBebasNeue } from "@/lib/font";
import CreateFormInputModal from '@/components/modals/CreateFormInputModal';
import { apiFetch } from '@/lib/apiFetch';

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
			const response = await apiFetch(`/api/formInputs`, {
				method: 'DELETE',
				body: JSON.stringify({
					id: id,
					form_name: formNameParse
				}),
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
			const response = await apiFetch(`/api/formInputs`, {
				method: 'POST',
				body: JSON.stringify({
					form_input: {
						id: -1,
						form_name: formNameParse,
						type: newFormInputType,
						question: newQuestion
					}
				}),
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
				const componentsPromise = apiFetch(`/api/formInputs?formid=${formName}`, {
					method: 'GET',
				});

				const detailsPromise = apiFetch(`/api/forms?name=${encodeURIComponent(formNameParse)}`, {
					method: 'GET',
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
				<LoadingSpinner size={36} />
			</div>
		)
	}


	return (
			<div onClick={() => setSelectedFormInput(-1)}>
				<div className="w-full p-5 sm:p-10 flex flex-col">
					<div className="max-w-3xl w-full mx-auto mb-6">
						<button
							onClick={() => router.push('/admin/form')}
							className="inline-flex items-center gap-2 text-sm text-normal-maroon hover:text-dark-maroon transition-colors"
						>
							<ArrowLeft size={16} />
							Custom Form
						</button>
						<h1 className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl tracking-wide text-normal-maroon mt-3 leading-none`}>
							{formNameParse}
						</h1>
						<div className="mt-3 h-1 w-16 bg-normal-maroon" />
						{description && (
							<p className="text-gray-600 mt-4 max-w-2xl">{description}</p>
						)}
						<p className="text-sm text-gray-500 mt-2">
							{formInputs.length === 0
								? "No questions yet — add one with the + button."
								: `${formInputs.length} question${formInputs.length === 1 ? "" : "s"}`}
						</p>
					</div>
					<div className="max-w-3xl w-full mx-auto my-5 flex flex-col rounded-2xl">
						{
							formInputs.map((formInput, index) => (
								<div className="w-full text-md" key={formInput.id}>
									{
										FormInputEditFactory.getFormInput(formInput, onFormInputDelete, selectedFormInput, setSelectedFormInput, index)
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
