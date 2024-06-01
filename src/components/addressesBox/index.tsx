import Label from "../label";

type Props = {
  title: string;
  details: string;
  label: string;
  planet: string;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onEditClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddressBox = ({
  title,
  details,
  label,
  planet,
  onDeleteClick,
  onEditClick,
}: Props) => {
  return (
    <>
      <div className="mt-4 border border-[#5ebbe7] w-[100%] h-auto p-4 rounded-lg">
        <div className="flex gap-5">
          <div>
            <img className="rounded-xl object-cover" src={label} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <Label planet={planet} />
            </div>
            <div className="font-bold">{title}</div>
            <div className="text-xs font-thin">
              <div>{details}</div>
            </div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={onEditClick}
                className="min-w-32 p-2 rounded-lg text-sm bg-[#5ebbe7] text-white"
                color="white"
              >
                Editar
              </button>
              <button
                onClick={onDeleteClick}
                className="min-w-32 p-2 rounded-lg text-sm bg-[#5ebbe7] text-white"
                color="white"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressBox;
