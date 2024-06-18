import { dryrun } from "@permaweb/aoconnect";

const eligible = async (wallet: string) => {
  const msg = await dryrun({
    process: "B0Bs8S0iXXBd6esAEKEPq9WnztqrzBoOVw78bYGe_YQ",
    tags: [
      { name: "Action", value: "Send-Tokens" },
      { name: "Recipient", value: wallet },
    ],
  });
  if (msg.Error) {
    return "Sorry";
  }
  return msg.Messages[0].Data;
};

export default eligible;
