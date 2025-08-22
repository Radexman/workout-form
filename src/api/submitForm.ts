export interface FormDataPayload {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File;
  date: string;
  hour: string;
}

export const submitForm = async (data: FormDataPayload): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('age', String(data.age));
    formData.append('photo', data.photo);
    formData.append('date', data.date);
    formData.append('hour', data.hour);

    const response = await fetch('/submit', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.status}`);
    }

    await response.text();
    console.log('Form submitted successfully');
  } catch (error) {
    console.error(`Error submitting form: ${error}`);
    throw error;
  }
};
