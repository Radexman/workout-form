import { useState, type ChangeEvent, type FormEvent } from 'react';

import TextInput from './inputs/TextInput';
import RangeInput from './inputs/RangeInput';
import FileInput from './inputs/FileInput';
import CalendarInput from './inputs/CalendarInput';
import Button from './ui/Button';
import { validateForm } from '../utils/validateForm';

const FormContainer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 8,
    photo: null as File | null,
    date: '',
    hour: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = event.target as any;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'photo' && files ? files[0] : value,
    }));
  };

  const isFormFilled = () => {
    return (
      formData.firstName && formData.lastName && formData.email && formData.age && formData.photo
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid ✅', formData);
    }
  };

  return (
    <div className="text-primary-dark mx-auto max-w-md py-20">
      <div className="grid place-content-center">
        <h1 className="mb-4 text-2xl font-medium">Personal info</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
          <TextInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <TextInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <RangeInput
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            error={errors.age}
            min={8}
            max={100}
            required
          />
          <FileInput
            label="Photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            error={errors.photo}
            required
          />
          <CalendarInput
            date={formData.date}
            hour={formData.hour}
            onDateChange={(newDate) => setFormData((prev) => ({ ...prev, date: newDate }))}
            onHourChange={(newHour) => setFormData((prev) => ({ ...prev, hour: newHour }))}
          />

          <Button text="Send Application" disabled={!isFormFilled()} />
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
