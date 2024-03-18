import { sendPayment } from "./transactions"
import { WALLET_1, WALLET_2 } from "./wallet"
import { getClient } from "./xrpl-client"

const client = getClient()

const main = async () => {
  await client.connect()

  await sendPayment(
    {
      Destination: WALLET_2.address,
      Amount: "10000000",
    },
    { wallet: WALLET_1 }
  )

  await client.disconnect()
}

main()
