    import React, { useState } from 'react';
    import Image from 'next/image';
    import QRCode from 'react-qr-code'; // Import the QRCode component
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';
    import { useRouter } from "next/router";
    
    const PaymentPage = () => {
      const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
      const [paymentDetails, setPaymentDetails] = useState({});
      const [amountToPay, setAmountToPay] = useState(0); // State to store the amount to pay
      const router = useRouter();
      const [promoCode, setPromoCode] = useState("");
      const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);
      const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);

      const applyPromoCode = () => {
        const promoCodes = process.env.NEXT_PUBLIC_PROMO_CODES.split(',');
        const discounts = process.env.NEXT_PUBLIC_DISCOUNTS.split(',').map(parseFloat);
        
        const promoCodeMappings = {};
        
        promoCodes.forEach((promoCode, index) => {
            promoCodeMappings[promoCode] = discounts[index];
        });
        const promoCodeDiscount = promoCodeMappings[promoCode];
        if (promoCodeDiscount !== undefined && !isPromoCodeApplied) {
            const subTotal = amountToPay;
    
            const discountedAmount = subTotal * (1 - promoCodeDiscount);
            setAmountToPay(discountedAmount + 20);
            setIsPromoCodeApplied(true);
            toast.success('Voucher applied successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (isPromoCodeApplied) {
            toast.error('Voucher already applied!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.error('Invalid voucher code!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    

    

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
        setPaymentDetails({});
        const product = JSON.parse(localStorage.getItem('product'));
        setAmountToPay(product.basePremium);
        
          
      };
      

      

      const handlePayment = async (e) => {
        const product = JSON.parse(localStorage.getItem('product'));
        const userID = JSON.parse(localStorage.getItem('userid'));


    
        
        
        e.preventDefault();
        const data = { amountToPay,selectedPaymentMethod ,paymentDetails,userID,product};
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
       
        e.preventDefault();
        const data1 = { amountToPay, paymentDetails,userID,product};
        const res1 = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data1),
        });
        let response = await res.json()
        let response1 = await res1.json()
        if(response1.success){
       
       
          e.preventDefault();
          
          const userId = JSON.parse(localStorage.getItem('userid'));
          const data2 = { userId:userId,orderID: response1.order._id};
          const res2 = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/odertoprofile`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data2),
          });
        }
        if (response.success) {
          
          toast.success('Payment done', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
          }, 2000);
        }

        
      };
      const renderPaymentFields = () => {
        switch (selectedPaymentMethod) {
          case 'debit-card':
          case 'credit-card':
            return (
              <>
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <div className="mt-1">
                    <input
                      id="card-number"
                      name="card-number"
                      type="text"
                      autoComplete="cc-number"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value, })}
                    />
                  </div>
                </div>
                <div class="flex items-center">
  <input
    className="appearance-none block w-auto my-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    name="voucher"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
    placeholder="Enter Voucher Code"
  />
  <button
    className="mt-2 ml-3 text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-green-400 rounded text-l"
    onClick={applyPromoCode}
  >
    Apply Voucher
  </button>
</div>
<div>
        <p>Amount to Pay: ₹ {amountToPay-20}</p>
        <p>GST: ₹ 20</p>
      </div>

              </>
            );
          case 'netbanking':
            return (
              <>
                <div>
                  <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
                    Select Bank
                  </label>
                  <div className="mt-1">
                    <select
                      id="bank"
                      name="bank"
                      autoComplete="bank"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, bank: e.target.value })}
                    >
                      <option value="">Select Bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="idbi">IDBI Bank</option>
                      <option value="canara">Canara Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                      <option value="boi">Bank of India</option>
                      <option value="bob">Bank of Baroda</option>
                      <option value="union">Union Bank of India</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <div class="flex items-center">
  <input
    className="appearance-none block w-auto my-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    name="voucher"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
    placeholder="Enter Voucher Code"
  />
  <button
    className="mt-2 ml-3 text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-green-400 rounded text-l"
    onClick={applyPromoCode}
  >
    Apply Voucher
  </button>
</div>
<div>
        <p>Amount to Pay: ₹ {amountToPay-20}</p>
        <p>GST: ₹ 20</p>
      </div>
                
              </>
            );
          case 'upi':
            return (
              <>
                <div>
                  <label htmlFor="upi-id" className="block text-sm font-medium text-gray-700">
                    UPI ID
                  </label>
                  <div className="mt-1">
                    <input
                      id="upi-id"
                      name="upi-id"
                      type="text"
                      autoComplete="upi-id"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                    />
                  </div>
                </div>
                <div class="flex items-center">
  <input
    className="appearance-none block w-auto my-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    name="voucher"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
    placeholder="Enter Voucher Code"
  />
  <button
    className="mt-2 ml-3 text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-green-400 rounded text-l"
    onClick={applyPromoCode}
  >
    Apply Voucher
  </button>
</div>
<div>
        <p>Amount to Pay: ₹ {amountToPay-20}</p>
        <p>GST: ₹ 20</p>
      </div>
                
              </>
            );
          case 'wallet':
            return (
              <>
                <div>
                  <label htmlFor="wallet-id" className="block text-sm font-medium text-gray-700">
                    Wallet ID
                  </label>
                  <div className="mt-1">
                    <input
                      id="wallet-id"
                      name="wallet-id"
                      type="text"
                      autoComplete="wallet-id"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, walletId: e.target.value })}
                    />
                  </div>
                </div>
                <div class="flex items-center">
  <input
    className="appearance-none block w-auto my-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    name="voucher"
    value={promoCode}
    onChange={(e) => setPromoCode(e.target.value)}
    placeholder="Enter Voucher Code"
  />
  <button
    className="mt-2 ml-3 text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-green-400 rounded text-l"
    onClick={applyPromoCode}
  >
    Apply Voucher
  </button>
</div>
<div>
        <p>Amount to Pay: ₹ {amountToPay-20}</p>
        <p>GST: ₹ 20</p>
      </div>
              </>
            );
          default:
            return null;
        }
      };

      return (
        
        <div className="min-h-screen bg-gray-100 py-12 sm:px-6 lg:px-8">
          
          <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
          <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              <PaymentOptionCard
                icon="/debitcard.jpeg"
                title="Debit Card"
                description="Pay securely using your debit card."
                onClick={() => handlePaymentMethodSelect('debit-card')}
                isSelected={selectedPaymentMethod === 'debit-card'}
              />
              <PaymentOptionCard
                icon="/creditcard.jpeg"
                title="Credit Card"
                description="Pay securely using your credit card."
                onClick={() => handlePaymentMethodSelect('credit-card')}
                isSelected={selectedPaymentMethod === 'credit-card'}
              />
              <PaymentOptionCard
                icon="/netbanking.jpeg"
                title="Netbanking"
                description="Pay securely using netbanking."
                onClick={() => handlePaymentMethodSelect('netbanking')}
                isSelected={selectedPaymentMethod === 'netbanking'}
              />
              <PaymentOptionCard
                icon="/upi.jpeg"
                title="UPI"
                description="Pay securely using UPI."
                onClick={() => handlePaymentMethodSelect('upi')}
                isSelected={selectedPaymentMethod === 'upi'}
              />
              <PaymentOptionCard
                icon="/wallet.jpeg"
                title="Wallet"
                description="Pay securely using your digital wallet."
                onClick={() => handlePaymentMethodSelect('wallet')}
                isSelected={selectedPaymentMethod === 'wallet'}
              />
            </div>
          </div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg">{renderPaymentFields()}</div>
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg">
            {selectedPaymentMethod === 'upi' && (
              <div className="flex flex-col items-center">
                <p className="text-lg font-medium mb-2">Scan QR Code to Pay</p>
                <QRCode value={`upi://pay?pa=${paymentDetails.upiId}&pn=Recipient&am=${amountToPay}&cu=INR`} />
              
              </div>
            )}
            {selectedPaymentMethod && (
              <button my-4
                onClick={handlePayment}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Pay Now
              </button>
            )}
            
          </div>
        </div>

      );
    };

    const PaymentOptionCard = ({ icon, title, description, onClick, isSelected }) => {
      return (
        <div
          className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer ${
            isSelected ? 'border-4 border-indigo-500' : ''
          }`}
          onClick={onClick}
        >
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center">
              <Image src={icon} alt={title} width={200} height={100} />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <div className="mt-2 text-sm text-gray-600">{description}</div>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      );
    };

    export default PaymentPage;
