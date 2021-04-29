import React, { useContext, useState, useEffect, createContext } from 'react'
import { createSdk, Sdk } from '@opendesign/sdk'

const SdkContext = createContext({ sdk: null })

type Props = {
  children: React.ReactNode
}

export const SdkProvider = ({ children }: Props) => {
  const [sdk, setSdk] = useState<Sdk | null>(null)
  useEffect(() => {
    try {
      const sdk = createSdk({
        token: process.env.NEXT_PUBLIC_TOKEN,
      })
      setSdk(sdk)
    } catch (error) {
      console.error(error.toString())
    }
  }, [])

  return <SdkContext.Provider value={{ sdk }}>{children}</SdkContext.Provider>
}

export const useSdkContext = () => useContext(SdkContext)
