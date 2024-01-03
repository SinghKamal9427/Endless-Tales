import { useContext } from "react";
import { Context } from "./createContextStore";

export default function UseStore() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("UseStore must be used within a StoreProvider");
  }

  return context;
}
