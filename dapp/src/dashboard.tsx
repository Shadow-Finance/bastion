import React, { useEffect, useState } from "react";
import {
  WalletAdapterNetwork,
  WalletNotConnectedError,
  Transaction,
} from "@demox-labs/aleo-wallet-adapter-base";
import app from "../apps.json";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

import { Button, Cascader, Input, InputNumber } from "antd";
const Dashboard: React.FC = () => {
  const { publicKey, requestTransaction } = useWallet();

  const [bastionID, setBastionID] = useState<any>("Bastion id");
  const [operation, setOpeartion] = useState<any>();
  const [proposalId, setProposalId] = useState<any>();
  const [amount, setAmount] = useState<any>();
  const [address, setAddress] = useState<any>();

  interface Option {
    value: number;
    label: string;
  }
  useEffect(() => {
    setBastionID(localStorage.getItem("id"));
  });
  const items: Option[] = [
    {
      value: 1,
      label: "Add Signer",
    },
    {
      value: 2,
      label: "Switch Mode",
    },
    {
      value: 3,
      label: "Add to BlackList",
    },
    {
      value: 4,
      label: "Add to Whitelist",
    },
    {
      value: 5,
      label: "Transfer",
    },
  ];

  const modes: Option[] = [
    { value: 0, label: "Frozen" },
    { value: 1, label: "Enabled" },
    { value: 2, label: "Blacklist" },
    { value: 3, label: "Whitelist" },
  ];

  const propose = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const inputs = [proposalId, operation, amount, address];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      app.bastion.base_call_id + bastionID + ".aleo",
      app.bastion.propose_function,
      inputs,
      app.bastion.propose_fee
    );
    if (requestTransaction) {
      await requestTransaction(aleoTransaction);
    }
  };
  
  const sign = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const inputs = [proposalId, operation, amount, address];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      app.bastion.base_call_id + bastionID + ".aleo",
      app.bastion.propose_function,
      inputs,
      app.bastion.propose_fee
    );
    if (requestTransaction) {
      await requestTransaction(aleoTransaction);
    }
  };

  const execute = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    const inputs = [proposalId, operation, amount, address];
    const aleoTransaction = Transaction.createTransaction(
      publicKey,
      WalletAdapterNetwork.Testnet,
      app.bastion.base_call_id + bastionID + ".aleo",
      app.bastion.propose_function,
      inputs,
      app.bastion.propose_fee
    );
    if (requestTransaction) {
      await requestTransaction(aleoTransaction);
    }
  };

  return (
    <div>
      <div>{bastionID}</div>

      <Input
        value={proposalId}
        placeholder="Proposal ID"
        onChange={(event) => {
          setProposalId(event.target.value);
        }}
      />

      <Cascader
        options={items}
        placeholder={"Select A Operation"}
        value={operation}
        onChange={(value) => {
          setOpeartion(value);
          console.log(operation);
        }}
      />


      <InputNumber
        className={operation != 5 ? "hidden" : ""}
        placeholder="Amount"
        value={amount}
        onChange={(value) => {
          setAmount(value);
        }}
      />

      <Input
        className={operation == 2 ? "hidden" : ""}
        placeholder="Address"
        value={address}
        onChange={(event) => {
          setAddress(event.target.value);
        }}
      />

      <Cascader
        className={operation != 2 ? "hidden" : ""}
        options={modes}
        placeholder={"Select A Mode"}
        value={amount}
        onChange={(value) => {
          setAmount(value);
        }}
      />

      <Button onClick={async () => await propose()}>Propose</Button>
      <Button
        onClick={async () => {
          await sign();
        }}
      >
        Sign
      </Button>
      <Button>Execute</Button>
    </div>
  );
};

export default Dashboard;
