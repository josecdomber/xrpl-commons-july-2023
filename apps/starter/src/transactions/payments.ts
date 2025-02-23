import { Payment } from "xrpl"
import { TxnOptions } from "../models"
import { getClient } from "../xrpl-client"

const client = getClient()

type PaymentProps = Omit<Payment, "TransactionType" | "Account">

export const sendPayment = async (props: PaymentProps, { wallet }: TxnOptions) => {
  // Prepare the transaction JSON
  const payment: Payment = {
    ...props,
    TransactionType: "Payment",
    Account: wallet.address,
  }

  const prepared = await client.autofill(payment)

  // Sign

  const signed = wallet.sign(prepared)

  // Submit and wait
  const response = await client.submitAndWait(signed.tx_blob)
  console.log(response)

  return response
}
