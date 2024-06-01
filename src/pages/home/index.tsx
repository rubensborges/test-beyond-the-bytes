import AddressBox from "@/components/addressesBox";
import Body from "@/components/body";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IAddress {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: { [y: string]: any };
}
const Home = () => {
  const navigate = useNavigate();
  const [addressList, setAddressList] = useState<IAddress>();
  const [filter, setFilter] = useState("");

  function populateAddress() {
    const storage = { ...localStorage };
    for (const key in storage) {
      storage[key] = JSON.parse(storage[key]);
    }
    setAddressList(storage);
  }
  useEffect(() => {
    populateAddress();
  }, []);

  const getLabelIcon = (label: string) => {
    switch (label) {
      case "Casa":
        return "src/assets/home-4-svgrepo-com.svg";
      case "Trabalho":
        return "src/assets/suitcase-svgrepo-com.svg";
      case "Pessoal":
        return "src/assets/user-3-svgrepo-com.svg";
      default:
        return "src/assets/location-1-svgrepo-com.svg";
    }
  };

  const handleDelete = (index: string) => {
    localStorage.removeItem(index);
    populateAddress();
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setFilter(search);
  };

  const handleEdit = (addressId: string) => {
    navigate("/edit?id=" + addressId);
  };
  return (
    <Body>
      <div className="text-3xl text-center mb-4 font-bold">Endereços</div>
      <div className="border border-[#eee] w-full"></div>
      <div className="flex items-center mt-4">
        <img
          className="-mr-[40px] z-50"
          src="src/assets/magnify-svgrepo-com.svg"
          alt=""
        />
        <input
          type="text"
          className="p-2 pl-10 outline-none w-[70%] h-10 border rounded-lg"
          placeholder="Buscar endereço"
          name=""
          value={filter}
          onChange={(e) => handleSearch(e)}
          id=""
        />
        {filter && (
          <img
            className="-ml-[30px] z-50 cursor-pointer"
            onClick={() => setFilter("")}
            src="src/assets/close-svgrepo-com.svg"
            alt=""
          />
        )}
        <Link
          className="flex items-center border h-10 w-[25%] text-[#5ebbe7] text-xs border-[#5ebbe7] p-2 rounded-lg ml-4"
          to={"/new-address"}
        >
          <button className="">Novo Endereço</button>
        </Link>
      </div>
      {addressList &&
        Object.keys(addressList).map((addressId, index) => {
          const labelIcon = getLabelIcon(addressList[addressId].label);
          return (
            addressList[addressId].title
              .toLowerCase()
              .includes(filter.toLowerCase()) && (
              <AddressBox
                key={index}
                onDeleteClick={() => handleDelete(addressId)}
                onEditClick={() => handleEdit(addressId)}
                label={labelIcon}
                planet={addressList[addressId].planet}
                title={addressList[addressId].title}
                details={
                  addressList[addressId].planet === "Terra"
                    ? `${addressList[addressId].publicPlace}, ${addressList[addressId].number}, ${addressList[addressId].neighborhood}, ${addressList[addressId].complement}`
                    : `${addressList[addressId].number}`
                }
              />
            )
          );
        })}
    </Body>
  );
};

export default Home;
