import { useState, type ChangeEvent } from 'react';

const FormContainer = () => {
  const [age, setAge] = useState(26);
  const [fileName, setFileName] = useState<string | undefined>();

  const handleAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="text-primary-dark mx-auto max-w-md py-20">
      <div className="grid place-content-center">
        <h1 className="mb-4 text-2xl font-medium">Personal Info</h1>
        <form className="w-full space-y-4">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border-muted text-primary-dark h-12 w-[342px] rounded-lg border bg-white px-4 font-medium md:w-[426px]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border-muted text-primary-dark h-12 w-[342px] rounded-lg border bg-white px-4 font-medium md:w-[426px]"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="border-muted text-primary-dark h-12 w-[342px] rounded-lg border bg-white px-4 font-medium md:w-[426px]"
            />
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
              value={age}
              onChange={handleAgeChange}
              className="bg-muted h-1 w-[342px] cursor-pointer rounded-xl md:w-[426px]"
            />
            {/* Tooltip */}
            <div
              className="bg-background text-primary border-muted absolute -bottom-8 -translate-x-1/2 rounded border px-3 py-1 text-xs shadow-md"
              style={{
                left: `calc(${((age - 8) / (100 - 8)) * 100}% - 0.5rem)`,
              }}
            >
              {age}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="photo">Photo</label>
            <label
              htmlFor="photo"
              className="border-muted text-primary-blue relative flex h-[96px] w-[342px] cursor-pointer items-center justify-center rounded-lg border bg-white text-center hover:bg-blue-50 md:w-[426px]"
            >
              {fileName ? (
                <span className="text-primary">{fileName}</span>
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
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
