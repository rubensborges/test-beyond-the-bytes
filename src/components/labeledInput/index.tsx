type Props = {
  title: string;
  onChange: (value: string) => void;
  isMars?: boolean;
  value: string;
};

const LabledInput = ({ title, onChange, isMars, value }: Props) => {
  const max = isMars ? 4 : 99;
  return (
    <div className="flex w-full flex-col gap-1 mt-4">
      <div className="text-sm">{title}</div>
      <input
        type="text"
        className="p-2 outline-none w-full h-10 border rounded-lg"
        maxLength={max}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default LabledInput;
