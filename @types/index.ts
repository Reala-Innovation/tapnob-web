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
