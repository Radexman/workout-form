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
  console.log('Submitting form data:', data);
  // 👆 Log payload tylko dla celów rekrutacyjnych (ułatwia weryfikację działania formularza).
  // W realnej aplikacji zostałby usunięty.

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
