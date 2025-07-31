export interface Bank {
  bankName: string;
  bankCode: string;
}

export interface FormData {
  country: string;
  chain: string;
  bank: string;
  accountNumber: string;
  amount: string;
  email?: string;
  accountName?: string;
}


export interface QuoteResponse {
  amount: number;
  btcAmount: number;
  exchangeRate: number;
  expiresInText: string;
  id:string;
  quoteId:string
  settlementAmount: number;
  satAmount: number;
  destination: {
    accountName: string;
    accountNumber: string;
    bankCode: string;
    bankName: string;
  };
}

interface BeneficiaryDetails {
  type: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
}

export interface Quote {
  id: string;
  fees: number;
  chain: string;
  amount: number;
  status: string;
  address: string;
  quoteId: string;
  btcAmount: number;
  fromAsset: string;
  reference: string;
  satAmount: number;
  paymentETA: string;
  exchangeRate: number;
  expiresInText: string;
  paymentReason: string;
  expiryTimeStamp: number;
  settlementAmount: number;
  settlementCurrency: string;
  barcodeUrl: string;
  beneficiaryDetails: BeneficiaryDetails;
}

interface Destination {
  type: string;
  bankCode: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface ExchangeRate {
  btc: {
    [key: string]: string | number;
  };
  rate: number;
  currency: string;
}

interface Trip {
  submitted: string;
  quoteSentAt: string;
  assetReceived: string;
  initializedAt: string;
  completionTime: string;
}

export interface Transaction {
  address: string;
  amount: string;
  beneficiary: string;
  beneficiaryId: string;
  btcAmount: string;
  callbackUrl: string | null;
  centAmount: string;
  centFees: string;
  chain: string;
  clientMetaData: Record<string, string | number | boolean | null>;
  companyId: string;
  createdAt: string;
  currency: string;
  customerId: string;
  destination: Destination;
  exchangeRate: ExchangeRate;
  expiry: string;
  fees: string;
  fromAsset: string;
  id: string;
  paymentETA: string;
  paymentReason: string;
  quoteId: string;
  reference: string;
  satAmount: string;
  settlementAmount: number;
  source: string;
  status: string;
  toCurrency: string;
  trip: Trip;
  updatedAt: string;
}
export interface PayoutConfirmation {
  id: string;
  address: string;
  amount: string;
  bankSessionId: string;
  beneficiaryId: string;
  btcAmount: string;
  callbackUrl: string | null;
  centAmount: string;
  centFees: string;
  chain: string;
  clientMetaData: Record<string, unknown>;
  companyId: string;
  createdAt: string;
  customerId: string;
  exchangeRate: {
    btc?: Record<string, unknown>;
    rate: number;
    currency: string;
  };
  expiry: string;
  fees: string;
  fromAsset: string;
  paymentETA: string;
  paymentReason: string;
  quoteId: string;
  reference: string;
  satAmount: string;
  settlementAmount: number;
  source: string;
  status: string;
  toCurrency: string;
  updatedAt: string;

  beneficiary: {
    id: string;
    status: string;
    country: string;
    currency: string;
    createdAt: string;
    destination: {
      accountName: string;
      accountNumber: string;
      bankCode: string;
      bankName: string;
      type: string;
    };
    [key: string]: unknown; 
  };

  trip: {
    submitted: string;
    quoteSentAt: string;
    assetReceived: string;
    initializedAt: string;
    completionTime: string;
    [key: string]: unknown;
  };
}
