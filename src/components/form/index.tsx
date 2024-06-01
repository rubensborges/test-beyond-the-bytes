import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Separator from "../separator";
import LabledInput from "../labeledInput";
import Header from "../header";
import ErrorMessage from "../errorMessage";

interface IAddress {
  [key: string]: string;
}

const addressLabel = [
  {
    label: "Casa",
  },
  {
    label: "Trabalho",
  },
  {
    label: "Pessoal",
  },
  {
    label: "Outro",
  },
];

const planetList = [
  {
    name: "Terra",
  },
  {
    name: "Marte",
  },
];

const Form = () => {
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [planetDropDown, setPlanetDropDown] = useState(false);
  const [addressId, setAddressId] = useState("");
  // form

  const [labelSelected, setLabelSelected] = useState(""); //address type eg: Home
  const [planetSelected, setPlanetSelected] = useState("");
  const [title, setTitle] = useState("");
  const [publicPlace, setPublicPlace] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState("");
  const [hasError, setHasError] = useState(false);

  const saveAddress = () => {
    const required = [
      "label",
      "planet",
      "title",
      "publicPlace",
      "number",
      "neighborhood",
    ];
    const address: IAddress = {
      label: labelSelected,
      planet: planetSelected,
      title,
      number: addressNumber,
    };
    if (planetSelected === "Terra") {
      address.complement = complement;
      address.publicPlace = publicPlace;
      address.neighborhood = neighborhood;
    }
    for (const key of required) {
      if (key in address) {
        if (!address[key]) {
          setHasError(true);
          return;
        }
      }
    }
    localStorage.setItem(
      addressId ? addressId : Date.now().toString(),
      JSON.stringify(address)
    );
    navigate("/");
  };

  const handlePlanetSelectedAndCloseDropDown = (planet: string) => {
    setPlanetSelected(planet);
    setPlanetDropDown(false);
  };

  const handleLabelSelectedAndCloseDropDown = (label: string) => {
    setLabelSelected(label);
    setDropDown(false);
  };

  useEffect(() => {
    const url = new URL(location.href);
    const id = url.searchParams.get("id");
    if (id) {
      const addr = JSON.parse(localStorage.getItem(id) || "{}");
      setAddressId(id);
      setPublicPlace(addr.publicPlace);
      setNeighborhood(addr.neighborhood);
      setComplement(addr.complement);
      setAddressNumber(addr.number);
      setLabelSelected(addr.label);
      setPlanetSelected(addr.planet);
      setTitle(addr.title);
      console.log(addr);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex items-center gap-6">
        <Link to={"/"}>
          <div className="border w-6 h-6 cursor-pointer rounded-md border-[#dcdcdc] flex items-center justify-center">
            <img src="src/assets/back-arrow.svg" alt="" />
          </div>
        </Link>
        <div className="text-3xl text-center font-bold">
          {addressId ? "Editar Endereço" : "Novo endereço"}
        </div>
      </div>
      <Separator />
      <div className="mt-4 flex flex-col gap-1">
        <div className="text-sm">Selecione o rótulo do endereço*</div>
        <div className="flex items-center">
          <input
            type="text"
            className="text-sm p-2 outline-none w-full h-10 border rounded-lg"
            readOnly
            value={labelSelected}
            placeholder="Selecione..."
            name=""
            id=""
          />
          <img
            className="w-6 h-6 -ml-8 cursor-pointer"
            src="src/assets/chevron-down.svg"
            alt=""
            onClick={() => setDropDown(!dropDown)}
          />
        </div>
        {dropDown && (
          <div className="rounded-lg border border-[#eee] w-full">
            {addressLabel.map((e, index) => (
              <div
                key={index}
                onClick={() => handleLabelSelectedAndCloseDropDown(e.label)}
                className="text-sm p-2 hover:bg-[#eee] cursor-pointer"
              >
                {e.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="text-sm">Selecione o Planeta*</div>
        <div className="flex items-center">
          <input
            type="text"
            className="p-2 text-sm outline-none w-full h-10 border rounded-lg"
            readOnly
            value={planetSelected}
            placeholder="Selecione..."
            name=""
            id=""
          />
          <img
            className="w-6 h-6 -ml-8 cursor-pointer"
            src="src/assets/chevron-down.svg"
            alt=""
            onClick={() => setPlanetDropDown(!planetDropDown)}
          />
        </div>
        {planetDropDown && (
          <div className="rounded-lg border border-[#eee] w-full">
            {planetList.map((e, index) => (
              <div
                key={index}
                onClick={() => handlePlanetSelectedAndCloseDropDown(e.name)}
                className="text-sm p-2 hover:bg-[#eee] cursor-pointer"
              >
                {e.name}
              </div>
            ))}
          </div>
        )}
        <Separator />
        {planetSelected === "Terra" && (
          <>
            <LabledInput
              onChange={(e) => setTitle(e)}
              title="Título do endereço*"
              isMars={false}
              value={title}
            />
            <LabledInput
              onChange={(e) => setPublicPlace(e)}
              title="Logradouro*"
              isMars={false}
              value={publicPlace}
            />
            <div className="flex w-full gap-2">
              <LabledInput
                onChange={(e) => setAddressNumber(e)}
                title="Número*"
                isMars={false}
                value={addressNumber}
              />
              <LabledInput
                onChange={(e) => setNeighborhood(e)}
                title="Bairro*"
                isMars={false}
                value={neighborhood}
              />
            </div>
            <LabledInput
              onChange={(e) => setComplement(e)}
              title="Complemento"
              isMars={false}
              value={complement}
            />
            <ErrorMessage show={hasError} />
            <div className="flex gap-2 justify-end">
              <Link to={"/"}>
                <button
                  onClick={() => saveAddress()}
                  className="mt-4 p-2 rounded-lg text-xs bg-[#fff] text-black border"
                  color="white"
                >
                  Cancelar
                </button>
              </Link>
              <button
                onClick={() => saveAddress()}
                className="mt-4 p-2 rounded-lg text-xs bg-[#5ebbe7] text-white"
                color="white"
              >
                Cadastrar
              </button>
            </div>
          </>
        )}

        {planetSelected === "Marte" && (
          <>
            <LabledInput
              onChange={(e) => setTitle(e)}
              title="Título do endereço*"
              isMars={false}
              value={title}
            />
            <LabledInput
              onChange={(e) => setAddressNumber(e)}
              title="Lote*"
              isMars={true}
              value={addressNumber}
            />
            <ErrorMessage show={hasError} />

            <div className="flex gap-2  justify-end">
              <Link to={"/"}>
                <button
                  onClick={() => saveAddress()}
                  className="mt-4 p-2 rounded-lg text-xs bg-[#fff] text-black border"
                  color="white"
                >
                  Cancelar
                </button>
              </Link>
              <button
                onClick={() => saveAddress()}
                className="mt-4 p-2 rounded-lg text-xs bg-[#5ebbe7] text-white"
                color="white"
              >
                Cadastrar
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Form;
