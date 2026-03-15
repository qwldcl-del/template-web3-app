import { defineConfig } from "@wagmi/cli"
import { react } from "@wagmi/cli/plugins"

import { CFAv1ForwarderABI } from "./abis/cfa-v1-forwarder"
import { GDAv1ForwarderABI } from "./abis/gda-v1-forwarder"

export default defineConfig({
  out: "./integrations/superfluid/generated/superfluid-wagmi.ts",
  contracts: [
    {
      name: "CFAv1Forwarder",
      abi: CFAv1ForwarderABI,
    },
    {
      name: "GDAv1Forwarder",
      abi: GDAv1ForwarderABI,
    },
  ],
  plugins: [react()],
})
