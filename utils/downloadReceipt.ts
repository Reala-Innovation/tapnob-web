import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { PayoutConfirmation } from "@/@types";

export const downloadReceipt = (transaction: PayoutConfirmation) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(34, 139, 34);
  doc.text("Payment Receipt", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Reference: ${transaction.reference}`, 14, 28);
  doc.text(`Date: ${new Date(transaction.createdAt).toLocaleString()}`, 14, 34);

  autoTable(doc, {
    startY: 40,
    head: [["Field", "Details"]],
    body: [
      ["Transaction ID", transaction.id],
      ["Status", transaction.status],
      [
        "Amount (NGN)",
        `${Number(transaction.settlementAmount).toLocaleString()}`,
      ],
      ["Amount (BTC)", `${transaction.btcAmount} BTC`],
      ["Exchange Rate", `${transaction.exchangeRate.rate}`],
      ["SAT Amount", `${transaction.satAmount}`],
      [
        "Account Name",
        transaction.beneficiary?.destination?.["accountName"] || "N/A",
      ],
      [
        "Account Number",
        transaction.beneficiary?.destination?.["accountNumber"] || "N/A",
      ],
      ["Payment ETA", transaction.paymentETA],
      ["Reason", transaction.paymentReason],
    ],
  });

  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(
    "Thank you for using Tapnob!",
    14,
    doc.internal.pageSize.height - 20
  );

  doc.save(`tapnob_receipt_${transaction.reference}.pdf`);
};
