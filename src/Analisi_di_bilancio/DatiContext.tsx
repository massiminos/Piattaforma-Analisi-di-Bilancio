import { createContext, useContext, useState } from "react";
import { Dati_Azienda, BilancioOb } from "./Bilancio&DatiAzienda.ts";

type DatiAziendaType = typeof Dati_Azienda;

const DatiContext = createContext<{
  dataDAzienda: DatiAziendaType;
  setDataDAzienda: React.Dispatch<React.SetStateAction<DatiAziendaType>>;
} | undefined>(undefined);

export const DatiProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataDAzienda, setDataDAzienda] = useState<DatiAziendaType>(Dati_Azienda);

  return (
    <DatiContext.Provider value={{ dataDAzienda, setDataDAzienda }}>
      {children}
    </DatiContext.Provider>
  );
};

export const useDati = () => {
  const context = useContext(DatiContext);
  if (!context) {
    throw new Error("useDati must be used within a DatiProvider");
  }
  return context;
};

//-----------

type BilancioType = typeof BilancioOb;

const DatiContextB = createContext<{
  dataBilancio: BilancioType;
  setDataBilancio: React.Dispatch<React.SetStateAction<BilancioType>>;
} | undefined>(undefined);

export const DatiProviderB = ({ children }: { children: React.ReactNode }) => {
  const [dataBilancio, setDataBilancio] = useState<BilancioType>(BilancioOb);

  return (
    <DatiContextB.Provider value={{ dataBilancio, setDataBilancio }}>
      {children}
    </DatiContextB.Provider>
  );
};

export const useDatiB = () => {
  const context = useContext(DatiContextB);
  if (!context) {
    throw new Error("useDati must be used within a DatiProviderB");
  }
  return context;
};

//---------loading

const LoadingContext = createContext<{
  showLoaderModal: boolean;
  setShowLoaderModal: (val: boolean) => void;
} | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [showLoaderModal, setShowLoaderModal] = useState(false);

  return (
    <LoadingContext.Provider value={{ showLoaderModal, setShowLoaderModal }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
