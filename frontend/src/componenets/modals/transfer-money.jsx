import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineWarning } from "react-icons/md";
import { toast } from "sonner";

import Button from "../button";
import InputField from "../textfield";
import DialogWrapper from "../wrappers/dialog-wrapper";
import { formatCurrency } from "../../libs";
import api from "../../libs/apiCall";
import Loading from "../loading";
import useStore from "../../store";

const TransferMoney = ({ isOpen, setIsOpen, refetch }) => {
  const { user } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const [fromAccountInfo, setFromAccountInfo] = useState({});
  const [toAccountInfo, setToAccountInfo] = useState({});

  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const newData = {
        ...data,
        from_account: fromAccountInfo.id,
        to_account: toAccountInfo.id,
      };

      const { data: res } = await api.put(
        `/transaction/transfer-money`,
        newData
      );
      if (res?.status === "success") {
        toast.success(res?.message);
        setIsOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAccountBalance = (setAccount, val) => {
    const filteredAccount = accountData?.find(
      (account) => account.account_name === val
    );

    setAccount(filteredAccount);
  };

  function closeModal() {
    setIsOpen(false);
  }

  const fetchAccounts = async () => {
    try {
      const { data: res } = await api.get(`/account`);

      setAccountData(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <DialogWrapper isOpen={isOpen} closeModal={closeModal}>
      <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all'>
        <DialogTitle
          as='h3'
          className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 mb-4 uppercase'
        >
          Transfer Money
        </DialogTitle>

        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='fex flex-col gap-1 mb-2'>
              <p className='text-gray-700 dark:text-gray-400 text-sm mb-2'>
                Select Account
              </p>
              <select
                onChange={(e) =>
                  getAccountBalance(setFromAccountInfo, e.target.value)
                }
                className='inputStyles'
              >
                <option
                  disabled
                  selected
                  className='w-full flex items-center justify-center dark:bg-slate-900 '
                >
                  Select Account
                </option>
                {accountData?.map((acc, index) => (
                  <option
                    key={index}
                    value={acc?.account_name}
                    className='w-full flex items-center justify-center dark:bg-slate-900'
                  >
                    {acc?.account_name} {" - "}
                    {formatCurrency(acc?.account_balance)}
                  </option>
                ))}
              </select>
            </div>

            <div className='fex flex-col gap-1 mb-2'>
              <p className='text-gray-700 dark:text-gray-400 text-sm mb-2'>
                From Account
              </p>
              <select
                onChange={(e) =>
                  getAccountBalance(setToAccountInfo, e.target.value)
                }
                className='inputStyles'
              >
                <option
                  disabled
                  selected
                  className='w-full flex items-center justify-center dark:bg-slate-900 '
                >
                  To Account
                </option>
                {accountData?.map((acc, index) => (
                  <option
                    key={index}
                    value={acc?.account_name}
                    className='w-full flex items-center justify-center dark:bg-slate-900'
                  >
                    {acc?.account_name} {" - "}
                    {formatCurrency(acc?.account_balance)}
                  </option>
                ))}
              </select>
            </div>

            {fromAccountInfo?.account_balance <= 0 && (
              <div className='flex items-center gap-2 bg-yellow-400 text-black p-2 mt-6 rounded'>
                <MdOutlineWarning size={30} />
                <span className='text-sm'>
                  You can not transfer money from this account. Insufficient
                  account balance.
                </span>
              </div>
            )}

            {fromAccountInfo.account_balance > 0 && toAccountInfo.id && (
              <>
                <div></div>
                <InputField
                  type='number'
                  name='amount'
                  label='Amount'
                  placeholder='10.56'
                  register={register("amount", {
                    required: "Transaction amount is required!",
                  })}
                  error={errors.amount ? errors.amount.message : ""}
                />

                <div className='w-full mt-8'>
                  <Button
                    loading={loading}
                    type='submit'
                    label={`Transfer ${
                      watch("amount") ? formatCurrency(watch("amount")) : ""
                    }`}
                    className='bg-violet-700 text-white w-full'
                  />
                </div>
              </>
            )}
          </form>
        )}
      </DialogPanel>
    </DialogWrapper>
  );
};

export default TransferMoney;
