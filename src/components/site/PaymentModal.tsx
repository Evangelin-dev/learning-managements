
import { useState } from "react";
import {
  X,
  Smartphone,
  CreditCard,
  Landmark,
  Wallet,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  GraduationCap,
  Lock,
  ShoppingCart,
  Check,
} from "lucide-react";

type PaymentMethod = "UPI" | "Card" | "Net Banking" | "Wallet";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount?: number;
  courseName?: string;
  onSuccess?: () => void;
}

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const paymentMethods: {
  name: PaymentMethod;
  icon: typeof Smartphone;
  description: string;
}[] = [
  {
    name: "UPI",
    icon: Smartphone,
    description: "Google Pay, PhonePe, Paytm",
  },
  {
    name: "Card",
    icon: CreditCard,
    description: "Credit / Debit Card",
  },
  {
    name: "Net Banking",
    icon: Landmark,
    description: "Pay using your bank account",
  },
  {
    name: "Wallet",
    icon: Wallet,
    description: "Demo wallet payment",
  },
];

export function PaymentModal({
  open,
  onClose,
  amount = 1999,
  courseName = "Stock Market Masterclass",
  onSuccess,
}: PaymentModalProps) {
  const [method, setMethod] = useState<PaymentMethod>("UPI");

  const [step, setStep] = useState<
    "select" | "details" | "processing" | "success" | "failed"
  >("select");

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bank, setBank] = useState("");
  const [wallet, setWallet] = useState("Paytm");
  const [error, setError] = useState("");
  const [cartAdded, setCartAdded] = useState(false);

  if (!open) return null;

  // Add course to cart
  const addToCart = () => {
    try {
      const existingCart: CartItem[] = JSON.parse(
        localStorage.getItem("learning-cart") || "[]"
      );

      const courseId = courseName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      const existingCourse = existingCart.find(
        (item) => item.id === courseId
      );

      let updatedCart: CartItem[];

      if (existingCourse) {
        updatedCart = existingCart.map((item) =>
          item.id === courseId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [
          ...existingCart,
          {
            id: courseId,
            title: courseName,
            price: amount,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem(
        "learning-cart",
        JSON.stringify(updatedCart)
      );

      // Notify navbar and other cart components
      window.dispatchEvent(new Event("cart-updated"));

      setCartAdded(true);
      setError("");
    } catch {
      setError("Unable to add course to cart. Please try again.");
    }
  };

  const resetModal = () => {
    setStep("select");
    setMethod("UPI");
    setError("");
    setUpiId("");
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
    setBank("");
    setWallet("Paytm");
    setCartAdded(false);
  };

  const closeModal = () => {
    resetModal();
    onClose();
  };

  const startPayment = () => {
    setError("");

    if (method === "UPI" && !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
      setError("Please enter a valid demo UPI ID.");
      return;
    }

    if (method === "Card") {
      if (
        cardNumber.replace(/\s/g, "").length !== 16 ||
        !cardName.trim() ||
        !/^\d{2}\/\d{2}$/.test(expiry) ||
        !/^\d{3,4}$/.test(cvv)
      ) {
        setError("Please enter valid demo card details.");
        return;
      }
    }

    if (method === "Net Banking" && !bank) {
      setError("Please select a bank.");
      return;
    }

    setStep("processing");

    // Simulated payment only. No actual transaction.
    window.setTimeout(() => {
      setStep("success");
      onSuccess?.();
    }, 1800);
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 z-10 rounded-full bg-white p-2 text-slate-500 shadow-sm transition hover:bg-slate-100"
          aria-label="Close payment"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-700 px-6 pb-7 pt-7 text-white sm:px-8">
          <div className="mb-5 flex items-center gap-2">
            <div className="rounded-xl bg-white/15 p-2">
              <GraduationCap size={24} />
            </div>

            <span className="text-lg font-bold">
              Your Learning Journey
            </span>
          </div>

          <p className="text-sm text-indigo-100">
            Your Course
          </p>

          <div className="mt-2 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-extrabold">
                ₹{amount.toLocaleString("en-IN")}
              </h2>

              <p className="mt-1 text-sm text-indigo-100">
                {courseName}
              </p>
            </div>

            <span className="rounded-full bg-emerald-400/20 px-3 py-1.5 text-xs font-bold text-emerald-200">
              Bestseller
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">

          {/* Payment Selection */}
          {step === "select" && (
            <>
              <h3 className="mb-1 text-xl font-bold text-slate-900">
                Your Course
              </h3>

              <p className="mb-5 text-sm text-slate-500">
                Complete your order and start learning today.
              </p>

              {/* Course Summary */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <GraduationCap size={25} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">
                      {courseName}
                    </p>
                    <p className="text-xs text-slate-500">
                      Online Course · Lifetime Access
                    </p>
                  </div>

                  <span className="whitespace-nowrap font-bold text-slate-900">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={addToCart}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl border-2 py-4 font-bold transition ${
                  cartAdded
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-50"
                }`}
              >
                {cartAdded ? (
                  <>
                    <Check size={19} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={19} />
                    Add to Cart
                  </>
                )}
              </button>

              {cartAdded && (
                <p className="mt-2 text-center text-xs font-medium text-emerald-600">
                  Course successfully added to your cart!
                </p>
              )}

              {/* Payment Methods */}
              <h3 className="mb-1 mt-7 text-xl font-bold text-slate-900">
                Choose Payment Method
              </h3>

              <p className="mb-5 text-sm text-slate-500">
                Select your preferred payment option.
              </p>

              <div className="space-y-3">
                {paymentMethods.map((item) => {
                  const Icon = item.icon;
                  const active = method === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setMethod(item.name);
                        setError("");
                      }}
                      className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition ${
                        active
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      <div
                        className={`rounded-xl p-3 ${
                          active
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">
                        <p className="font-bold text-slate-900">
                          {item.name === "Card"
                            ? "Credit / Debit Card"
                            : item.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          active
                            ? "border-indigo-600"
                            : "border-slate-300"
                        }`}
                      >
                        {active && (
                          <div className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Continue to Payment */}
              <button
                onClick={() => {
                  setError("");
                  setStep("details");
                }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Continue to Payment <span>→</span>
              </button>
            </>
          )}

          {/* Payment Details */}
          {step === "details" && (
            <>
              <button
                onClick={() => {
                  setStep("select");
                  setError("");
                }}
                className="mb-5 flex items-center gap-2 text-sm font-semibold text-indigo-600"
              >
                <ArrowLeft size={17} />
                Back to payment methods
              </button>

              <h3 className="mb-5 text-xl font-bold text-slate-900">
                {method} Payment
              </h3>

              {method === "UPI" && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">
                    Enter a demo UPI ID.
                  </p>

                  <input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@upi"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                  />

                  <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
                    <span>Google Pay</span>
                    <span>PhonePe</span>
                    <span>Paytm</span>
                  </div>
                </div>
              )}

              {method === "Card" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Card Number
                    </label>

                    <input
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      inputMode="numeric"
                      autoComplete="off"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Cardholder Name
                    </label>

                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      autoComplete="off"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Expiry
                      </label>

                      <input
                        value={expiry}
                        onChange={(e) => {
                          const digits = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 4);

                          setExpiry(
                            digits.length > 2
                              ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                              : digits
                          );
                        }}
                        placeholder="MM/YY"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        CVV
                      </label>

                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(
                            e.target.value.replace(/\D/g, "").slice(0, 4)
                          )
                        }
                        placeholder="123"
                        autoComplete="off"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "Net Banking" && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Select Your Bank
                  </label>

                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-600"
                  >
                    <option value="">Choose your bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {method === "Wallet" && (
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">
                    Select Wallet
                  </label>

                  <select
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-indigo-600"
                  >
                    <option>Paytm</option>
                    <option>Amazon Pay</option>
                    <option>Mobikwik</option>
                  </select>
                </div>
              )}

              {error && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                onClick={startPayment}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                <Lock size={17} />
                Pay ₹{amount.toLocaleString("en-IN")}
              </button>
            </>
          )}

          {/* Processing */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-12 text-center">
              <Loader2
                size={55}
                className="animate-spin text-indigo-600"
              />

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                Processing Payment...
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Please wait while we process your demo transaction.
              </p>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="rounded-full bg-emerald-100 p-5">
                <CheckCircle2 size={55} className="text-emerald-600" />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
                Payment Successful!
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Your demo payment was successful.
              </p>

              <div className="mt-6 w-full rounded-2xl bg-slate-50 p-5 text-left">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-500">Course</span>

                  <span className="text-right font-semibold text-slate-900">
                    {courseName}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-slate-500">Payment Method</span>

                  <span className="font-semibold text-slate-900">
                    {method}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-slate-500">Amount</span>

                  <span className="font-bold text-emerald-600">
                    ₹{amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="mt-6 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white transition hover:bg-indigo-700"
              >
                Continue Learning
              </button>
            </div>
          )}

          {/* Footer */}
          {step !== "processing" && step !== "success" && (
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={16} />
              <span>
                Demo Checkout · No real payment is processed
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
