import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import PageTitle from '../components/common/PageTitle';
import { FetchContext } from '../context/FetchContext';
import { formatCurrency } from './../util';
import InventoryItemForm from './../components/InventoryItemForm';
import DangerButton from './../components/common/DangerButton';
import FormError from './../components/FormError';
import FormSuccess from './../components/FormSuccess';

const InventoryItemContainer = ({ children }) => (
  <div className="bg-white rounded shadow-md mb-4 p-4">
    {children}
  </div>
);

const InventoryItem = ({ item, onDelete }) => {
  return (
    <div className="flex">
      <img
        className="rounded w-32 h-full"
        src={item.image}
        alt="inventory"
      />
      <div className="flex justify-between w-full">
        <div className="flex flex-col ml-4 justify-between">
          <div>
            <p className="font-bold text-xl text-gray-900">
              {item.name}
            </p>
            <p className="text-sm text-gray-600">
              {item.itemNumber}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-xl">
              {formatCurrency(item.unitPrice)}
            </p>
          </div>
        </div>
        <div className="self-end">
          <DangerButton
            text="Delete"
            onClick={() => onDelete(item)}
          />
        </div>
      </div>
    </div>
  );
};

const NewInventoryItem = ({ onSubmit }) => {
  return (
    <section className="bg-white p-4 shadow-md rounded-md">
      <p className="font-bold mb-2">New Inventory Item</p>
      <InventoryItemForm onSubmit={onSubmit} />
    </section>
  );
};

const Inventory = () => {
  const fetchContext = useContext(FetchContext);
  const [inventory, setInventory] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const getInventory = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'inventory'
        );
        setInventory(data);
      } catch (err) {
        console.log('the err', err);
      }
    };

    getInventory();
  }, [fetchContext]);

  const onSubmit = async (values, resetForm) => {
    try {
      const { data } = await fetchContext.authAxios.post(
        'inventory',
        values
      );
      setInventory([...inventory, data.inventoryItem]);
      resetForm();
      setSuccessMessage(data.message);
      setErrorMessage(null);
    } catch (err) {
      const { data } = err.response;
      setSuccessMessage(null);
      setErrorMessage(data.message);
    }
  };

  const onDelete = async item => {
    try {
      if (
        window.confirm(
          'Are you sure you want to delete this item?'
        )
      ) {
        const {
          data
        } = await fetchContext.authAxios.delete(
          `inventory/${item._id}`
        );
        setInventory(
          inventory.filter(
            item => item._id !== data.deletedItem._id
          )
        );
      }
    } catch (err) {
      const { data } = err.response;
      setErrorMessage(data.message);
    }
  };

  return (
    <>
      <PageTitle title="Inventory" />
      {successMessage && (
        <FormSuccess text={successMessage} />
      )}
      {errorMessage && <FormError text={errorMessage} />}
      <div className="mb-4">
        <NewInventoryItem onSubmit={onSubmit} />
      </div>
      {inventory && inventory.length
        ? inventory.map(item => (
            <InventoryItemContainer key={item._id}>
              <InventoryItem
                item={item}
                onDelete={onDelete}
              />
            </InventoryItemContainer>
          ))
        : 'No Inventory Items'}
    </>
  );
};

export default Inventory;
