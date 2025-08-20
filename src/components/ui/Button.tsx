import clsx from 'clsx';

interface ButtonProps {
  text: string;
  disabled: boolean;
}

const Button = ({ text, disabled }: ButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        'w-[342px] rounded-sm px-4 py-3 font-sans text-white md:w-[426px]',
        disabled ? 'bg-muted cursor-default' : 'bg-primary hover:bg-primary-hover cursor-pointer'
      )}
    >
      {text}
    </button>
  );
};

export default Button;
