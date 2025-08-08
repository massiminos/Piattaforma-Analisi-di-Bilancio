import * as vars from "./variables.tsx"
import { useDati } from "./DatiContext.tsx";


export const useGoingConcern = () => {
  const { dataDAzienda } = useDati();

  const rowsGC = [ 
    ["(A) Agricoltura, sivlicoltura e pesca", vars.Going_Concern_B10, vars.Going_Concern_C10, vars.Going_Concern_D10, vars.Going_Concern_E10, vars.Going_Concern_F10],
    ["(B) Estrazione", vars.Going_Concern_B11, vars.Going_Concern_C11, vars.Going_Concern_D11, vars.Going_Concern_E11, vars.Going_Concern_F11],
    ["(C) Manifattura", vars.Going_Concern_B12, vars.Going_Concern_C12, vars.Going_Concern_D12, vars.Going_Concern_E12, vars.Going_Concern_F12],
    ["(D) Produzione energia/gas", vars.Going_Concern_B13, vars.Going_Concern_C13, vars.Going_Concern_D13, vars.Going_Concern_E13, vars.Going_Concern_F13],
    ["(E) Fornitura acqua reti fognarie, rifiuti", vars.Going_Concern_B14, vars.Going_Concern_C14, vars.Going_Concern_D14, vars.Going_Concern_E14, vars.Going_Concern_F14],
    ["(D) Trasmissione energia/gas", vars.Going_Concern_B15, vars.Going_Concern_C15, vars.Going_Concern_D15, vars.Going_Concern_E15, vars.Going_Concern_F15],
    ["(F41) Costruzione di edifici", vars.Going_Concern_B16, vars.Going_Concern_C16, vars.Going_Concern_D16, vars.Going_Concern_E16, vars.Going_Concern_F16],
    ["(F42) Ingegneria civile", vars.Going_Concern_B17, vars.Going_Concern_C17, vars.Going_Concern_D17, vars.Going_Concern_E17, vars.Going_Concern_F17],
    ["(F43) Costruzioni specializzate", vars.Going_Concern_B18, vars.Going_Concern_C18, vars.Going_Concern_D18, vars.Going_Concern_E18, vars.Going_Concern_F18],
    ["(G45) Commercio autoveicoli", vars.Going_Concern_B19, vars.Going_Concern_C19, vars.Going_Concern_D19, vars.Going_Concern_E19, vars.Going_Concern_F19],
    ["(G46) Comm. Ingrosso", vars.Going_Concern_B20, vars.Going_Concern_C20, vars.Going_Concern_D20, vars.Going_Concern_E20, vars.Going_Concern_F20],
    ["(D) Distr. Energia/gas", vars.Going_Concern_B21, vars.Going_Concern_C21, vars.Going_Concern_D21, vars.Going_Concern_E21, vars.Going_Concern_F21],
    ["(G47) Commercio dettaglio", vars.Going_Concern_B22, vars.Going_Concern_C22, vars.Going_Concern_D22, vars.Going_Concern_E22, vars.Going_Concern_F22],
    ["(I56) Bar e ristoranti", vars.Going_Concern_B23, vars.Going_Concern_C23, vars.Going_Concern_D23, vars.Going_Concern_E23, vars.Going_Concern_F23],
    ["(H) Trasporto e magazzinaggio", vars.Going_Concern_B24, vars.Going_Concern_C24, vars.Going_Concern_D24, vars.Going_Concern_E24, vars.Going_Concern_F24],
    ["(I55) Hotel", vars.Going_Concern_B25, vars.Going_Concern_C25, vars.Going_Concern_D25, vars.Going_Concern_E25, vars.Going_Concern_F25],
    ["(JMN) Servizi alle imprese", vars.Going_Concern_B26, vars.Going_Concern_C26, vars.Going_Concern_D26, vars.Going_Concern_E26, vars.Going_Concern_F26],
    ["(PQRS) Servizi alle persone", vars.Going_Concern_B27, vars.Going_Concern_C27, vars.Going_Concern_D27, vars.Going_Concern_E27, vars.Going_Concern_F27],
  ] 

  //VLOOKUP ricerca verticale di excel:
  const vlookup = (
    colIndex:number,
    lookup:string = dataDAzienda.B23,
    data:any[] = rowsGC,
    rowStart = 0,
    rowEnd = data.length - 1
  ) => {
    // Valida rapidamente gli input più critici
    if (!Array.isArray(data) || data.length === 0) return null;
    if (colIndex < 0) return null;

    // Normalizza gli estremi del range
    rowStart = Math.max(0, rowStart);
    rowEnd   = Math.min(data.length - 1, rowEnd);

    // Scansione lineare del sotto‑array selezionato
    for (let i = rowStart; i <= rowEnd; i++) {
      const row = data[i];
      // Salta righe non valide o troppo corte
      if (!Array.isArray(row) || colIndex >= row.length) continue;

      if (row[0] === lookup) {
        return row[colIndex] ?? null;   // Restituisce il valore desiderato
      }
    }
    // Se non trovato
    return null;
  };
 return {
    Going_Concern_B31: vlookup(1),
    Going_Concern_C31: vlookup(2),
    Going_Concern_D31: vlookup(3),
    Going_Concern_E31: vlookup(4),
    Going_Concern_F31: vlookup(5),
  };
};