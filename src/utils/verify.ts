import { createDataItemSigner, message, result } from "@permaweb/aoconnect";

const verify = async () => {
  const msgId = await message({
    process: "B0Bs8S0iXXBd6esAEKEPq9WnztqrzBoOVw78bYGe_YQ",
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "Send-Tokens" }],
  });

  let { Messages } = await result({
    message: msgId,
    process: "B0Bs8S0iXXBd6esAEKEPq9WnztqrzBoOVw78bYGe_YQ",
  });
  console.log("verify.ts Error:", Error, "\nType:", typeof Error);
  if (
    Messages[0].Data === "Not Eligible to Receive Tokens OR Already Claimed"
  ) {
    const amt = Messages[0].Data;
    return { amt, msgId };
  } else {
    const Tags: Record<string, any> = {};
    Messages[0].Tags.forEach((tag: any) => {
      Tags[tag.name] = tag.value;
    });
    const amt = Tags["Quantity"];
    return { amt, msgId };
  }
};

export default verify;
