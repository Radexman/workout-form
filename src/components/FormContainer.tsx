import { useState, type ChangeEvent, type FormEvent } from 'react';

const FormContainer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: 26,
    photo: null as File | null,
    date: '',
    hour: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = event.target as any;
    if (name === 'photo' && files) {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = 'First name required';
    if (!formData.lastName) newErrors.lastName = 'Last name required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.age || formData.age < 9 || formData.age > 100)
      newErrors.age = 'Age must be between 9 and 100';
    if (!formData.photo) newErrors.photo = 'Photo required';
    setErrors(newErrors);
    console.log('Validation error');
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    console.log(formData);
  };

  return (
    <div className="text-primary-dark mx-auto max-w-md py-20">
      <div className="grid place-content-center">
        <h1 className="mb-4 text-2xl font-medium">Personal Info</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border-muted text-primary-dark h-12 w-[342px] rounded-lg border bg-white px-4 font-medium md:w-[426px]"
              required
            />
            {errors.firstName && <p className="text-error">{errors.firstName}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border-muted text-primary-dark h-12 w-[342px] rounded-lg border bg-white px-4 font-medium md:w-[426px]"
              required
            />
            {errors.lastName && <p className="text-error">{errors.lastName}</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-muted text-primary-dark h-12 w-[342px] rounded-lg border bg-white px-4 font-medium md:w-[426px]"
              required
            />
            {errors.email && <p className="text-error">{errors.email}</p>}
          </div>
          <div className="relative flex flex-col">
            <label htmlFor="age">Age</label>
            <div className="flex justify-between text-sm">
              <div>8</div>
              <div>100</div>
            </div>
            <input
              type="range"
              name="age"
              id="age"
              min={8}
              max={100}
              value={formData.age}
              onChange={handleChange}
              className="bg-muted h-1 w-[342px] cursor-pointer rounded-xl md:w-[426px]"
              required
            />
            {errors.age && <p className="text-error">{errors.age}</p>}
            {/* Tooltip */}
            <div
              className="bg-background text-primary border-muted absolute -bottom-8 -translate-x-1/2 rounded border px-3 py-1 text-xs shadow-md"
              style={{
                left: `calc(${((formData.age - 8) / (100 - 8)) * 100}% - 0.5rem)`,
              }}
            >
              {formData.age}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="photo">Photo</label>
            <label
              htmlFor="photo"
              className="border-muted text-primary-blue relative flex h-[96px] w-[342px] cursor-pointer items-center justify-center rounded-lg border bg-white text-center hover:bg-blue-50 md:w-[426px]"
            >
              {formData.photo ? (
                <span className="text-primary">{formData.photo.name}</span>
              ) : (
                <>
                  <span className="text-primary mr-1 underline">Upload a file</span>{' '}
                  <span className="text-muted-text">or drag and drop here</span>
                </>
              )}
              <input
                type="file"
                name="photo"
                id="photo"
                accept=".jpg,.jpeg,.png"
                onChange={handleChange}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                required
              />
            </label>
            {errors.photo && <p className="text-error">{errors.photo}</p>}
          </div>
          <button type="submit" disabled={Object.keys(errors).length > 0}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
