type Props = {
  planet: string;
};

const Label = ({ planet }: Props) => {
  return (
    <div
      data-planet={planet}
      className="w-12 flex justify-center p-1 rounded-3xl data-[planet=Marte]:bg-red-300 data-[planet=Terra]:bg-green-300 "
    >
      <div className="text-[10px] uppercase">{planet}</div>
    </div>
  );
};

export default Label;
