import * as variables from "./variables.tsx";
import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getRowStyle, resolveCell, formatCurrency, percentForm } from "./format.ts";
import { useGoingConcern } from './GoingConcernData.tsx';
import { useDati, useDatiB } from "./DatiContext.tsx";


export default function GoingConcern() {
  
  const {Going_Concern_B31, Going_Concern_C31, Going_Concern_D31, Going_Concern_E31, Going_Concern_F31} = useGoingConcern();

  const { dataDAzienda } = useDati();
  const { dataBilancio } = useDatiB();

  const vars = Variables_use(dataBilancio);

  const Going_Concern_B6 = vars.Bilancio_B132 > 0 ? "Positivo" : "Negativo";
  const Going_Concern_D6 = (vars.CE_Riclassificato_B15+(dataBilancio.B227-vars.CE_Riclassificato_D9)+(vars.CE_Riclassificato_D6-vars.Bilancio_B266))/(dataBilancio.B161+dataBilancio.B164+dataBilancio.B167+dataBilancio.B170+dataBilancio.B173+vars.Bilancio_B266);

  const Going_Concern_B35 = (vars.Bilancio_B266 / vars.Bilancio_B220) < Going_Concern_B31? "Ok": "Ko";
  const Going_Concern_C35 = vars.Bilancio_B132 / (vars.Bilancio_B159 + dataBilancio.B158) > Going_Concern_C31? "Ok": "Ko";
  const Going_Concern_D35 = (vars.SP_Riclasificato_B28 / vars.SP_Riclasificato_D28) > Going_Concern_D31? "Ok": "Ko";
  const Going_Concern_E35 = (vars.CE_Riclassificato_B15 / vars.Bilancio_B4) > Going_Concern_E31? "Ok": "Ko";
  const Going_Concern_F35 = ((vars.Bilancio_B196 + vars.Bilancio_B199) / vars.Bilancio_B4) < Going_Concern_F31? "Ok": "Ko";

  const Going_Concern_D38 = Going_Concern_B6 === "Positivo" ? "Positivo" : "Negativo";
  const Going_Concern_D39 = !Number.isFinite(Going_Concern_D6)? "Non Disponibile": (Going_Concern_D6 > variables.Going_Concern_F6 ? "Positivo" : "Negativo");
  const Going_Concern_D40 = [Going_Concern_B35, Going_Concern_C35, Going_Concern_D35, Going_Concern_E35, Going_Concern_F35].filter(v => v === "Ko").length > 3? "Negativo": "Positivo";
  const Going_Concern_D41 = (vars.SP_Riclasificato_C60 < 1.29? "Alta": (vars.SP_Riclasificato_C60 < 2.9 ? "Media" : "Bassa")) === "Bassa"? "Positivo": "Negativo";


  const rows:any[] = [
  ["A", "B", "C", "D", "E", "F"],
  [`Going Concern Trade Area ${dataDAzienda.B23} Anno ${dataDAzienda.B17}`, "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["Indicatori primari", "", "", "", "", ""],
  ["Patrimonio netto", "", "DSCR", "", "", ""],
  [formatCurrency(vars.Bilancio_B132), Going_Concern_B6, "Azienda", Going_Concern_D6.toFixed(2), "Soglia", (variables.Going_Concern_F6).toFixed(2)],
  ["", "", "", "", "", ""],
  ["Valori Soglia", "", "", "", "", ""],
  ["Settore/Indicatori", "1. Oneri finanziari/ricavi", "2. Patr. netto/debiti totali", "3. Att. a breve/Pass. a breve", "4. Cash flow/Attivo", "5. Indebit. Prev. E trib./Attiv"],
  ["(A) Agricoltura, sivlicoltura e pesca", percentForm(variables.Going_Concern_B10), percentForm(variables.Going_Concern_C10), percentForm(variables.Going_Concern_D10), percentForm(variables.Going_Concern_E10), percentForm(variables.Going_Concern_F10)],
  ["(B) Estrazione", percentForm(variables.Going_Concern_B11), percentForm(variables.Going_Concern_C11), percentForm(variables.Going_Concern_D11), percentForm(variables.Going_Concern_E11), percentForm(variables.Going_Concern_F11)],
  ["(C) Manifattura", percentForm(variables.Going_Concern_B12), percentForm(variables.Going_Concern_C12), percentForm(variables.Going_Concern_D12), percentForm(variables.Going_Concern_E12), percentForm(variables.Going_Concern_F12)],
  ["(D) Produzione energia/gas", percentForm(variables.Going_Concern_B13), percentForm(variables.Going_Concern_C13), percentForm(variables.Going_Concern_D13), percentForm(variables.Going_Concern_E13), percentForm(variables.Going_Concern_F13)],
  ["(E) Fornitura acqua reti fognarie, rifiuti", percentForm(variables.Going_Concern_B14), percentForm(variables.Going_Concern_C14), percentForm(variables.Going_Concern_D14), percentForm(variables.Going_Concern_E14), percentForm(variables.Going_Concern_F14)],
  ["(D) Trasmissione energia/gas", percentForm(variables.Going_Concern_B15), percentForm(variables.Going_Concern_C15), percentForm(variables.Going_Concern_D15), percentForm(variables.Going_Concern_E15), percentForm(variables.Going_Concern_F15)],
  ["(F41) Costruzione di edifici", percentForm(variables.Going_Concern_B16), percentForm(variables.Going_Concern_C16), percentForm(variables.Going_Concern_D16), percentForm(variables.Going_Concern_E16), percentForm(variables.Going_Concern_F16)],
  ["(F42) Ingegneria civile", percentForm(variables.Going_Concern_B17), percentForm(variables.Going_Concern_C17), percentForm(variables.Going_Concern_D17), percentForm(variables.Going_Concern_E17), percentForm(variables.Going_Concern_F17)],
  ["(F43) Costruzioni specializzate", percentForm(variables.Going_Concern_B18), percentForm(variables.Going_Concern_C18), percentForm(variables.Going_Concern_D18), percentForm(variables.Going_Concern_E18), percentForm(variables.Going_Concern_F18)],
  ["(G45) Commercio autoveicoli", percentForm(variables.Going_Concern_B19), percentForm(variables.Going_Concern_C19), percentForm(variables.Going_Concern_D19), percentForm(variables.Going_Concern_E19), percentForm(variables.Going_Concern_F19)],
  ["(G46) Comm. Ingrosso", percentForm(variables.Going_Concern_B20), percentForm(variables.Going_Concern_C20), percentForm(variables.Going_Concern_D20), percentForm(variables.Going_Concern_E20), percentForm(variables.Going_Concern_F20)],
  ["(D) Distr. Energia/gas", percentForm(variables.Going_Concern_B21), percentForm(variables.Going_Concern_C21), percentForm(variables.Going_Concern_D21), percentForm(variables.Going_Concern_E21), percentForm(variables.Going_Concern_F21)],
  ["(G47) Commercio dettaglio", percentForm(variables.Going_Concern_B22), percentForm(variables.Going_Concern_C22), percentForm(variables.Going_Concern_D22), percentForm(variables.Going_Concern_E22), percentForm(variables.Going_Concern_F22)],
  ["(I56) Bar e ristoranti", percentForm(variables.Going_Concern_B23), percentForm(variables.Going_Concern_C23), percentForm(variables.Going_Concern_D23), percentForm(variables.Going_Concern_E23), percentForm(variables.Going_Concern_F23)],
  ["(H) Trasporto e magazzinaggio", percentForm(variables.Going_Concern_B24), percentForm(variables.Going_Concern_C24), percentForm(variables.Going_Concern_D24), percentForm(variables.Going_Concern_E24), percentForm(variables.Going_Concern_F24)],
  ["(I55) Hotel", percentForm(variables.Going_Concern_B25), percentForm(variables.Going_Concern_C25), percentForm(variables.Going_Concern_D25), percentForm(variables.Going_Concern_E25), percentForm(variables.Going_Concern_F25)],
  ["(JMN) Servizi alle imprese", percentForm(variables.Going_Concern_B26), percentForm(variables.Going_Concern_C26), percentForm(variables.Going_Concern_D26), percentForm(variables.Going_Concern_E26), percentForm(variables.Going_Concern_F26)],
  ["(PQRS) Servizi alle persone", percentForm(variables.Going_Concern_B27), percentForm(variables.Going_Concern_C27), percentForm(variables.Going_Concern_D27), percentForm(variables.Going_Concern_E27), percentForm(variables.Going_Concern_F27)],
  ["", "", "", "", "", ""],
  ["Valori Azienda", "", "", "", "", ""],
  ["Settore/Indicatori", "1. Oneri finanziari/ricavi", "2. Patr. netto/debiti totali", "3. Att. a breve/Pass. a breve", "4. Cash flow/Attivo", "5. Indebit. Prev. E trib./Attiv"],
  [dataDAzienda.B23, percentForm(Going_Concern_B31),percentForm(Going_Concern_C31), percentForm(Going_Concern_D31), percentForm(Going_Concern_E31), percentForm(Going_Concern_F31)],
  [`${dataDAzienda.B11} ${dataDAzienda.B17}`, percentForm(vars.Bilancio_B266/vars.Bilancio_B220), percentForm(vars.Bilancio_B132/(vars.Bilancio_B159+dataBilancio.B158)), percentForm(vars.SP_Riclasificato_B28/vars.SP_Riclasificato_D28), percentForm(vars.CE_Riclassificato_B15/vars.Bilancio_B4), percentForm((vars.Bilancio_B196+vars.Bilancio_B199)/vars.Bilancio_B4)],
  [`${dataDAzienda.B11} ${dataDAzienda.B17-1}`, percentForm(vars.Bilancio_C266/vars.Bilancio_C220), percentForm(vars.Bilancio_C132/(vars.Bilancio_C159+dataBilancio.C158)), percentForm(vars.Andamenti_F30/vars.Andamenti_F34), percentForm(vars.Andamenti_F68/vars.Bilancio_C4), percentForm((vars.Bilancio_C196+vars.Bilancio_C199)/vars.Bilancio_C4)],
  [`${dataDAzienda.B11} ${dataDAzienda.B17-2}`, percentForm(vars.Bilancio_D266/vars.Bilancio_D220), percentForm(vars.Bilancio_D132/(vars.Bilancio_D159+dataBilancio.D158)), percentForm(vars.Andamenti_B30/vars.Andamenti_B34), percentForm(vars.Andamenti_B68/vars.Bilancio_D4), percentForm((vars.Bilancio_D196+vars.Bilancio_D199)/vars.Bilancio_D4)],
  [`Valuation ${dataDAzienda.B17}`, Going_Concern_B35, Going_Concern_C35, Going_Concern_D35, Going_Concern_E35,Going_Concern_F35 ],
  ["", "", "", "", "", ""],
  ["Sintesi", "", "", "", "", ""],
  ["Partrimonio netto", "", Going_Concern_D38, "", "", ""],
  ["DSCR", "", Going_Concern_D39, "", "", ""],
  ["Indici (CNDCEC)", "", Going_Concern_D40, "", "", ""],
  ["Z-Score", "", Going_Concern_D41, "", "", ""],
  ["", "", "", "", "", ""],
  ["Opinion", "", Going_Concern_D38 === "Negativo"? "Alert": ([Going_Concern_D38, Going_Concern_D39, Going_Concern_D40, Going_Concern_D41].filter(v => v === "Positivo").length > 3? "Clean": "Alert"), "", "", ""]
];
// indici di riferimento all'array 
const darkBlueRows:any[] = [3,7,28,36,42];
const lightBlueRows:any[] = [4,8,29];
const lightGrayRows:any[] = [5];

const colWidths = ["25%", "15%", "15%", "15%", "15%", "15%"];

const indexRowBB = [26,34,40,42];
const indexRowDBB = [4,5,7,8,29,34,37,38,39,40,41];

const indexBold1 = [34,42];
const indexBold2 = [3,4,5,7,8,28,29,36];

const indicatoriSett = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]


  const header = rows[1];
  const dataRows = rows.slice(2);

  return (
    <TableContainer className="no-repeat-header" component={Paper}>
      <Table>
         <colgroup>
          {colWidths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1a4d80", "&:hover": { backgroundColor: "rgba(9, 27, 65, 0.81)" }, }}>
            {(() => {
               const value = resolveCell(header[0]);
               return(
              <TableCell  
                align="center" 
                colSpan = {header.length} 
                sx={{ color:"#ffffff", backgroundColor:"#003366", padding:1.5, fontSize:16}}
              >
                {value as React.ReactNode}
              </TableCell>
              );
            })()}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataRows.map((row, r) => {
            const originalIndex = r + 2; // indice reale
            const { bg, text, hover, borderBottom } = getRowStyle(
              darkBlueRows,
              lightBlueRows,
              lightGrayRows,
              originalIndex
            );
            const nonEmpty = row.filter((c:any) => c !== "");

            /* riga con un solo valore (cella unica centrata) */
            if (nonEmpty.length === 1) {
              const value = resolveCell(nonEmpty[0]);
              return (
                <TableRow
                  key={r}
                 sx={{ backgroundColor: bg, "&:hover": { backgroundColor: hover } }}
                >
                  <TableCell
                    colSpan={row.length}
                    align="center"
                    sx={{ color: text, borderBottom, padding: 1 }}
                  >
                    {value as React.ReactNode}
                  </TableCell>
                </TableRow>
              );
            }

            /* riga completamente vuota (spacer) */
            if (nonEmpty.length === 0) {
              return (
                <TableRow
                  key={r}
                  sx={{ 
                    backgroundColor: bg, 
                    "&:hover": { backgroundColor: hover }
                  }}
                >
                  <TableCell colSpan={row.length} sx={{ padding: 1 ,borderBottom: indexRowBB.includes(originalIndex) ? "1px solid #000" : borderBottom}} />
                </TableRow>
              );
            }
            /* riga “normale” */
            return (
              <TableRow
                key={r}
                sx={{ 
                  backgroundColor: bg, 
                  "&:hover": { backgroundColor: hover }  
                }}
              >
                {row.map((cell:any, c:any) => {

                  const rows3 = [31,32,33];
                  const rows4 = [37,38,39,40];
                  const refRow = dataRows[28] ?? [];
                  let bgc = bg;

                  // Condizioni su "Positivo"/"Negativo"
                  if (rows4.includes(originalIndex)) {
                    if (cell === "Positivo") {
                      bgc = "lightgreen";
                    } else if (cell === "Negativo") {
                      bgc = "lightcoral";
                    }
                  }

                  // Condizioni su confronto con riga 30
                  const parsePercent = (v: string): number =>
                    parseFloat(v.replace('%', '')) / 100;

                  if (rows3.includes(originalIndex) && refRow[c] !== undefined && typeof cell === "string" && cell.includes('%')) {
                    const current = parsePercent(cell);
                    const reference = parsePercent(refRow[c]);

                    if ([5, 1].includes(c)) {
                      bgc = current < reference ? "lightgreen" : "lightcoral";
                    } else if ([2, 3, 4].includes(c)) {
                      bgc = current > reference ? "lightgreen" : "lightcoral";
                    }
                  }

                  const spanRow = [4,37,38,39,40,42]
                   
                  if (spanRow.includes(originalIndex)) {
                    if (c === 1 || c === 3 || c === 4 || c === 5) return null;
                  }

                  const colSpan = spanRow.includes(originalIndex) && c === 0 ? 2 : spanRow.includes(originalIndex) && c === 2 ? 4 : 1;

                  return (
                    <TableCell
                      key={c}
                      colSpan={colSpan}
                      align={spanRow.includes(originalIndex) ? "center" : "left"}
                      sx={{ 
                        wordBreak: "break-word",
                        backgroundColor: indicatoriSett.includes(originalIndex) && dataDAzienda.B23 === cell ? "#e0e0e0": bgc,
                        color: text, 
                        fontWeight: indexBold1.includes(originalIndex) ? "bold": !indexBold2.includes(originalIndex) && c==0 ? "bold" : 400,
                        padding: 1, 
                        borderRight: c!=5 ? "1px solid #000" : "none",
                        borderBottom: indexRowBB.includes(originalIndex) ? "1px solid #000" : indexRowDBB.includes(originalIndex) ? "3px double #000" : borderBottom, 
                      }}
                    >
                      {typeof cell === "string" && cell.startsWith("vars.") ? (
                        // eslint-disable-next-line no-eval
                        eval(cell)
                      ) : (
                        cell
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
