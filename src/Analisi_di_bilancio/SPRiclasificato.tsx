import React ,{useState} from "react";
import * as variables from "./variables.tsx";
import {Variables_use} from "./variables.tsx";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import { getRowStyle, resolveCell, formatCurrency, percentForm} from "./format.ts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useDati, useDatiB } from "./DatiContext.tsx";


export default function SPRiclasificato() {

  const { dataDAzienda } = useDati();
  const { dataBilancio } = useDatiB();

  const vars = Variables_use(dataBilancio);

const rows = [
  ["A", "B", "C", "D"],
  [`Stato Patrimoniale Riclassificato Anno ${dataDAzienda.B17}`,"","",""],
  ["", "", "", ""],
  ["Struttura del Capitale Investito", "", "", ""],
  ["CAPITALE FISSO (ATTIVO IMMOBILIZZATO)", "Immobilizzazioni", formatCurrency(vars.Bilancio_B8), formatCurrency(vars.Bilancio_B8)],
  ["CAPITALE CIRCOLANTE LORDO (ATTIVO CORRENTE O CIRCOLANTE)", "Disponibilità non Liquide", formatCurrency(vars.SP_Riclasificato_B36),formatCurrency(vars.SP_Riclasificato_D6)],
  ["", "Liquidità Differita", formatCurrency(vars.SP_Riclasificato_B32), ""],
  ["", "Liquidità Immediata", formatCurrency(vars.SP_Riclasificato_B28), ""],
  ["Struttura del Capitale Acquisito", "", "", ""],
  ["CAPITALE PERMANENTE", "Patrimonio (Mezzi Propri)", formatCurrency(vars.Bilancio_B132), formatCurrency(vars.Bilancio_B132+vars.SP_Riclasificato_D33)],
  ["", "Passivo Consolidato", formatCurrency(vars.SP_Riclasificato_D33), ""],
  ["CAPITALE CORRENTE", "Passivo Corrente", formatCurrency(vars.SP_Riclasificato_D28), formatCurrency(vars.SP_Riclasificato_D28)],
  ["", "", "", ""],
  ["Attivo (Sintesi)", "", "Passivo (Sintesi)", ""],
  ["A) Crediti Verso Soci", formatCurrency(vars.Bilancio_B5), "A) Patrimonio Netto", formatCurrency(vars.Bilancio_B132)],
  ["B) Immobilizzazioni", formatCurrency(vars.Bilancio_B8), "B) Fondi per Rischi e Oneri", formatCurrency(vars.Bilancio_B153)],
  ["C) Attivo Circolante", formatCurrency(vars.Bilancio_B84), "C) Trattamento Fine Rapporto", formatCurrency(dataBilancio.B158)],
  ["D) Ratei e Risconti Attivi", formatCurrency(vars.Bilancio_B128), "D) Debiti", formatCurrency(vars.Bilancio_B159)],
  ["", "", "E) Ratei e Risconti Passivi", formatCurrency(vars.Bilancio_B205)],
  ["Squadratura", formatCurrency(vars.SP_Riclasificato_B21-vars.SP_Riclasificato_D21), "Conti d'Ordine", formatCurrency(vars.Bilancio_B208)],
  ["Totale Attivo", formatCurrency(vars.SP_Riclasificato_B21), "Totale Passivo", formatCurrency(vars.SP_Riclasificato_D21)],
  ["", "", "", ""],
  [`CHECK ATTIVO/PASSIVO ${dataDAzienda.B17}`, vars.Bilancio_B4==vars.Bilancio_B131?"Ok":"Errore Bilancio", `CHECK FONTI/IMPIEGHI ${dataDAzienda.B17}`, vars.SP_Riclasificato_B42==vars.SP_Riclasificato_D42?"Ok":"Errore Bilancio"],
  [`CHECK ATTIVO/PASSIVO ${dataDAzienda.B17-1}`, vars.SP_Riclasificato_B24, `CHECK FONTI/IMPIEGHI ${dataDAzienda.B17-1}`, vars.SP_Riclasificato_D24],
  [`CHECK ATTIVO/PASSIVO ${dataDAzienda.B17-2}`, vars.SP_Riclasificato_B25, `CHECK FONTI/IMPIEGHI ${dataDAzienda.B17-2}`, vars.SP_Riclasificato_D25],
  ["", "", "", ""],
  ["Impieghi", "", "Fonti", ""],
  ["LIQUIDITA' IMMEDIATA", formatCurrency(vars.SP_Riclasificato_B28), "PASSIVO CORRENTE", formatCurrency(vars.SP_Riclasificato_D28)],
  ["Cassa", formatCurrency(dataBilancio.B127+dataBilancio.B126), "Debiti Verso Banche", formatCurrency(dataBilancio.B170)],
  ["Banca", formatCurrency(dataBilancio.B125), "Debiti Verso Fornitori", formatCurrency(dataBilancio.B179)],
  ["Titoli Negoziabili", formatCurrency(vars.Bilancio_B116), "Debiti per Imposte", formatCurrency(dataBilancio.B197+dataBilancio.B200)],
  ["LIQUIDITA' DIFFERITA", formatCurrency(vars.SP_Riclasificato_B32), "Altri Debiti a Breve", formatCurrency(vars.SP_Riclasificato_D32)],
  ["Crediti Verso Clienti a Breve Termine", formatCurrency(dataBilancio.B93), "PASSIVO CONSOLIDATO", formatCurrency(vars.SP_Riclasificato_D33)],
  ["Crediti Diversi a Breve Termine", formatCurrency(vars.SP_Riclasificato_B34), "Mutui Passivi", formatCurrency(dataBilancio.B171)],
  ["", "", "Obbligazioni", formatCurrency(dataBilancio.B162+dataBilancio.B165)],
  ["DISPONIBILITA'", formatCurrency(vars.Bilancio_B85+vars.SP_Riclasificato_B38+vars.Bilancio_B128), "Debiti per Imposte Differite", formatCurrency(dataBilancio.B198+dataBilancio.B201)],
  ["Rimanenze", formatCurrency(vars.Bilancio_B85), "Fondi (TFR + Rischi e Oneri)", formatCurrency(vars.Bilancio_B153+dataBilancio.B158)],
  ["Crediti a Lungo Termine", formatCurrency(vars.SP_Riclasificato_B38), "Ratei e Risconti Passivi", formatCurrency(vars.Bilancio_B205)],
  ["Ratei e Risconti Attivi", formatCurrency(vars.Bilancio_B128), "Altri Debiti e Lungo Termine", formatCurrency(vars.SP_Riclasificato_D39)],
  ["IMMOBILIZZAZIONI", formatCurrency(vars.Bilancio_B8), "PATRIMONIO NETTO", formatCurrency(vars.Bilancio_B132)],
  ["Totale Impieghi", formatCurrency(vars.SP_Riclasificato_B42), "Totale Fonti", formatCurrency(vars.SP_Riclasificato_D42)],
  ["", "", "", ""],
  ["Indicatori Patrimoniali", "", "", ""],
  ["Capitale Sociale", formatCurrency(dataBilancio.B133), "Margine Primario di Struttura", formatCurrency(vars.Bilancio_B132-vars.Bilancio_B8)],
  ["Riserve", formatCurrency(dataBilancio.B134+dataBilancio.B135+dataBilancio.B136+dataBilancio.B137+dataBilancio.B138+vars.Bilancio_B139), "Margine Secondario di Struttura", formatCurrency((vars.Bilancio_B132+vars.SP_Riclasificato_D33)-vars.Bilancio_B8)],
  ["Capitale Circolante Lordo o Att. Corrente/Circolante", formatCurrency(vars.SP_Riclasificato_D6), "Margine Primario di Tesoreria", formatCurrency(vars.Margini_Patrimoniali_B31-vars.Margini_Patrimoniali_B36)],
  ["Capitale Circolante Netto (C.C.N.)", formatCurrency(vars.SP_Riclasificato_D6-vars.SP_Riclasificato_D28), "Margine Secondario di Tesoreria", formatCurrency(vars.Margini_Patrimoniali_D42)],
  ["Quick Ratio (Indice Secondario di Tesoreria)", ((vars.SP_Riclasificato_B28+vars.SP_Riclasificato_B32)/vars.SP_Riclasificato_D28).toFixed(4), "Current Ratio", (vars.SP_Riclasificato_D6/vars.SP_Riclasificato_D28).toFixed(4)],
  ["Asset Turnover", (vars.CE_Riclassificato_B9/(vars.Bilancio_B8+vars.SP_Riclasificato_D6)).toFixed(4), "Acid Test (Indice Primario di Tesoreria)", (vars.SP_Riclasificato_B28/vars.SP_Riclasificato_D28).toFixed(4)],
  ["Leverage", ((vars.SP_Riclasificato_D28+vars.SP_Riclasificato_D33)/vars.Bilancio_B132).toFixed(4), "Equity Asset Ratio (Indice primario di struttura)", (vars.Bilancio_B132/vars.Bilancio_B8).toFixed(4)],
  ["Elasticità dell'Attivo", (vars.Bilancio_B84/vars.SP_Riclasificato_B21).toFixed(4), "Indebitamento netto (Posizione Netta)", formatCurrency(vars.Margini_Patrimoniali_D25)],
  ["Autofinanziamento", percentForm(vars.Bilancio_B132/vars.SP_Riclasificato_B21), "Indice Primario di Capitalizzazione", percentForm(vars.SP_Riclasificato_B53)],
  ["Indice di Innovazione", percentForm(vars.Bilancio_B9/vars.Bilancio_B8), "Indice Secondario di Capitalizzazione", percentForm(dataBilancio.B133/vars.SP_Riclasificato_D42)],
  ["", "", "", ""],
  ["Z Score", "", `Z Score = ${variables.SP_Riclasificato_B60}*X1+${variables.SP_Riclasificato_B61}*X2+${variables.SP_Riclasificato_B62}*X3+${variables.SP_Riclasificato_B63}*X4+${variables.SP_Riclasificato_B64}*X5`, ""],
  ["X1 = Elasticità dell'Attivo (Att. Circ./Tot. Att.)", variables.SP_Riclasificato_B60, (variables.SP_Riclasificato_B60*vars.SP_Riclasificato_B52+variables.SP_Riclasificato_B61*(vars.Bilancio_B297/vars.SP_Riclasificato_B21)+variables.SP_Riclasificato_B62*vars.CE_Riclassificato_B25+variables.SP_Riclasificato_B63*vars.SP_Riclasificato_B51+variables.SP_Riclasificato_B64*vars.SP_Riclasificato_B50).toFixed(4), ""],
  ["X2 = Utile/Tot. Att.", variables.SP_Riclasificato_B61, "", ""],                                                                                                    
  ["X3 = ROI", variables.SP_Riclasificato_B62, "", ""],
  ["X4 = Leverage (Indipendenza da Terzi)", variables.SP_Riclasificato_B63, vars.SP_Riclasificato_C60<1.29?"Alta":(vars.SP_Riclasificato_C60<2.9?"Media":(vars.SP_Riclasificato_C60>=2.9?"Bassa":"Errore")), ""],
  ["X5 = Asset Turnover (K)", variables.SP_Riclasificato_B64, "", ""],
];

// indici di riferimento all'array 
const darkBlueRows:any[] = [3,8,13,26,42,54];
const lightBlueRows:any[] = [22,23,24];
const lightGrayRows:any[] = [];
const yellowRows:any[] = [22,23,24];
const yellowCols:any[] = [1,3];
const Zscore:any[] = [55,56,57,58,59];

type ZScoreLevel = "Bassa" | "Media" | "Alta" | "Errore";
interface MergeBlock {
  col: number;//indice colonna di ancoraggio
  rowSpan: number;//Quante righe includere
  colSpan?: number;//Quante colonne includere
  useZscoreColor?: boolean;//applicare i colori Z‑Score ?
}

const getZscoreColor = (level: ZScoreLevel, isBg: boolean = true) => {
  const map: Record<ZScoreLevel, { bg: string; text: string }> = {
    Bassa: { bg: "#9de79dff", text: "darkgreen" },
    Media: { bg: "#f3c672ff", text: "orange" },
    Alta: { bg: "lightcoral", text: "red" },
    Errore: { bg: "violet", text: "#fff" },
  };
  return map[level] ? (isBg ? map[level].bg : map[level].text) : undefined;
};

const mergeAnchors : Record<number,MergeBlock[] >  = {
  54: [{ col: 2, rowSpan: 1, colSpan: 2,}],
  55: [{ col: 2, rowSpan: 3, colSpan: 2, useZscoreColor: true  }], // 55‑57
  58: [{ col: 2, rowSpan: 2, colSpan: 2, useZscoreColor: true  }], // 58‑59
  5: [
    { col: 0, rowSpan: 3 }, // A5‑A7
    { col: 3, rowSpan: 3 }, // D5‑D7
  ],
  9: [
    { col: 0, rowSpan: 2 }, // A9‑A10
    { col: 3, rowSpan: 2 }, // D9‑D10
  ],
};

interface AnchorInfo extends MergeBlock {
  row: number; // riga anchor
}

// Map "row-col" → AnchorInfo (solo per celle ancora)
const ANCHOR_MAP = new Map<string, AnchorInfo>();
// Set di tutte le celle da skippare perché coperte da un merge (non includere anchor)
const SKIP_SET = new Set<string>();

Object.entries(mergeAnchors).forEach(([rowStr, blocks]) => {
  const row = Number(rowStr);
  blocks.forEach((block) => {
    const { col, colSpan = 1, rowSpan } = block;
    ANCHOR_MAP.set(`${row}-${col}`, { row, ...block });
    for (let dr = 0; dr < rowSpan; dr++) {
      for (let dc = 0; dc < colSpan; dc++) {
        const key = `${row + dr}-${col + dc}`;
        if (dr === 0 && dc === 0) continue; // anchora stessa
        SKIP_SET.add(key);
      }
    }
  });
});

interface Variables {
  v1: number;
  v2: number;
  v3: number;
  v4?: number;
}

const buildData = (vars: Variables) => {
  const total = vars.v4? vars.v1 + vars.v2 + vars.v3 + vars.v4 : vars.v1 + vars.v2 + vars.v3
  const pct = (v: number) => (total === 0 ? 0 : (v / total) * 100);
  return [
    vars.v4?
    {
      label: "", // una sola barra
      v1: pct(vars.v1),v2: pct(vars.v2),v3: pct(vars.v3),v4: pct(vars.v4),
    }
    : {
      label: "", // una sola barra
      v1: pct(vars.v1),v2: pct(vars.v2),v3: pct(vars.v3)
    }
  ];
};


  const header = rows[1];
  const dataRows = rows.slice(2);

  // valore X4‑X5 (serve per i colori Z‑Score)
  const X4X5_LEVEL = resolveCell(rows[58][2]) as ZScoreLevel;

  const [hoverAnchor, setHoverAnchor] = useState<AnchorInfo | null>(null);

  const isRowInHoverBlock = (rowIndex: number) => {
    if (!hoverAnchor) return false;
    return (
      rowIndex >= hoverAnchor.row &&
      rowIndex < hoverAnchor.row + hoverAnchor.rowSpan
    );
  };
  
  const colWidths = ["30%", "20%", "30%", "20%"];

  // Grafico             
  const dataImpieghi = buildData({v1: vars.SP_Riclasificato_B28,v2: vars.SP_Riclasificato_B32,v3: vars.SP_Riclasificato_B36,v4: vars.Bilancio_B8});
  const dataFonti = buildData({v1: vars.SP_Riclasificato_D28,v2: vars.SP_Riclasificato_D33,v3: vars.Bilancio_B132});
  
  const legendImpieghi = ["LIQUIDITA' IMMEDIATA", "LIQUIDITA' DIFFERITA", "DISPONIBILITA'","IMMOBILIZZAZIONI"]
  const legendFonti = ["PASSIVO CORRENTE", "PASSIVO CONSOLIDATO", "PATRIMONIO NETTO"]

  const impieghiPalette = ["#f5a623", "#4caf50", "#4a90e2","#e94e4e"];
  const fontiPalette = ["#4caf50","#4a90e2", "#e94e4e", "#FFFFFF"];

  const renderChart = ( title: string, palette: string[], data: any[], legend:string[] ) => (
      <Card elevation={3}>
        <CardHeader
          title={
            <Typography variant="h6" align="center">
              {title}
            </Typography>
          }
        />
        <CardContent style={{ height: 500, maxHeight: 500}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="horizontal" barSize={200}>
              <YAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <XAxis type="category" dataKey="label" hide />
              <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Legend verticalAlign="bottom" height={36} />
                {(["v1","v2","v3","v4"] as const).map((k, i) => (
                  <Bar key={k} dataKey={k} stackId="a" fill={palette[i]} name={legend[i]}/>
                ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  );

  return (
    <TableContainer className="no-repeat-header" component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <colgroup>
          {colWidths.map((w, i) => (
            <col key={i} style={{ width: w }} />
          ))}
        </colgroup>
        {/* HEADER */}
        <TableHead>
          {(() => {
            const nonEmpty = header.filter((c) => c !== "");
            if (nonEmpty.length !== 1) return null;

            const value = resolveCell(nonEmpty[0]);

            return (
              <TableRow sx={{ backgroundColor: "#1a4d80", "&:hover": { backgroundColor: "rgba(9, 27, 65, 0.81)" }, }}>
                <TableCell
                  colSpan={header.length}
                  align="center"
                  sx={{ color: "#fff", padding: 1.5, fontSize: 16 }}
                >
                  {value as React.ReactNode}
                </TableCell>
              </TableRow>
            );
          })()}
        </TableHead>

        {/* BODY */}
        <TableBody>
          {dataRows.map((row, r) => {
            const originalIndex = r + 2; // indice reale
            const { bg, text, hover, borderBottom } = getRowStyle(darkBlueRows,lightBlueRows,lightGrayRows,originalIndex);

            const nonEmpty = row.filter((c) => c !== "");

            /* riga con un solo valore (cella unica centrata) */
            if (nonEmpty.length === 1) {
              const value = resolveCell(nonEmpty[0]);
              return (
                <TableRow key={r} sx={{ backgroundColor: bg, "&:hover": { backgroundColor: hover } }}>
                  <TableCell
                    colSpan={row.length}
                    align="center"
                    sx={{ color: text, borderBottom, padding: 1.5 }}
                  >
                    {value as React.ReactNode}
                  </TableCell>
                </TableRow>
              );
            }

            /* riga completamente vuota (spacer) */
            if (nonEmpty.length === 0) {
              return (
                <TableRow key={r} sx={{ backgroundColor: bg}}>
                  <TableCell colSpan={row.length} sx={{ padding: 1, borderBottom:"1px solid #000"}} />
                </TableRow>
              );
            }

            /* caso generale */
            return (
              <TableRow 
                key={r} 
                sx={{
                  backgroundColor: isRowInHoverBlock(originalIndex) ? hover : bg,
                  "&:hover": { backgroundColor: hover },
                }}
              >
                {row.map((cell, c) => {
                  const cellKey = `${originalIndex}-${c}`;
                  if (SKIP_SET.has(cellKey)) return null;
                  const anchor = ANCHOR_MAP.get(cellKey);
                  if (anchor) {
                    const { rowSpan, colSpan = 1, useZscoreColor } = anchor;
                    const value = resolveCell(cell === "" ? resolveCell(row[c]) : cell);

                    const bgAnchor = useZscoreColor ? getZscoreColor(X4X5_LEVEL, true) : bg;
                    const txtAnchor = useZscoreColor ? getZscoreColor(X4X5_LEVEL, false) : text;

                    const anchorBorderRight =
                      anchor.col + (anchor.colSpan ?? 1) - 1 < row.length - 1
                        ? anchor.col === 1
                          ? "3px double #000"
                          : "1px solid #000"
                        : "none";

                    return (
                      <TableCell
                        key={c}
                        rowSpan={rowSpan}
                        colSpan={colSpan}
                        align="center"
                        onMouseEnter={() => setHoverAnchor(anchor)}
                        onMouseLeave={() => setHoverAnchor(null)}
                        sx={{ 
                          fontSize: useZscoreColor ? 20: "defoult", 
                          borderBottom: "1px solid #000", 
                          fontWeight: useZscoreColor ? "bold": 400, 
                          padding: 1, 
                          backgroundColor: bgAnchor, 
                          color: txtAnchor, 
                          borderRight: anchorBorderRight,
                        }}
                      >
                        {value as React.ReactNode}
                      </TableCell>
                    );
                  }

                  // celle interne al blocco fuso 
                   const value = resolveCell(cell);

                  /* colori CHECK & Z‑Score */
                  const highlight = yellowRows.includes(originalIndex) && yellowCols.includes(c);
                  const isZscoreCell = Zscore.includes(originalIndex) && [2, 3].includes(c);

                  const backgroundColor = highlight
                    ? value === "Ok"
                      ? "#f5c423ff"
                      : "#e94e4e"
                    : isZscoreCell
                    ? getZscoreColor(X4X5_LEVEL, true)
                    : undefined;

                  const fontColor = highlight
                    ? value === "Ok"
                      ? "#000"
                      : "#fff"
                    : isZscoreCell
                    ? getZscoreColor(X4X5_LEVEL, false)
                    : text;

                  /* bordo */
                  const customBorderBottom = [4, 7, 10, 11, 19, 20, 24, 39, 40, 52, 59].includes(originalIndex)
                    ? "1px solid #000"
                    : [5, 6, 9].includes(originalIndex) && [0, 3].includes(c)
                    ? "none"
                    : [55, 56, 58].includes(originalIndex) && [2, 3].includes(c)
                    ? "none"
                    :[22, 23].includes(originalIndex) && [1, 3].includes(c)
                    ? "1px solid #000"
                    : borderBottom;

                  return (
                    <TableCell
                      key={c}
                      sx={{
                        backgroundColor,
                        textAlign:[22,23,24].includes(originalIndex) && [1,3].includes(c)? "center" : "left",
                        color: fontColor,
                        fontSize: [27, 31, 35, 39].includes(originalIndex) && [0].includes(c) || [27, 32, 39].includes(originalIndex) && [2].includes(c)? "15px" : "defoult",
                        padding: 1,
                        fontWeight: highlight || isZscoreCell || ([27, 31, 35, 39].includes(originalIndex) && [0].includes(c) || [27, 32, 39].includes(originalIndex) && [2].includes(c))? "bold" : undefined,
                        borderBottom: customBorderBottom,
                        borderRight: c < row.length - 1 ?  c === 1 ? "3px double #000" : "1px solid #000" : "none",
                      }}
                    >
                      {value as React.ReactNode}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Grid container spacing={2} style={{ marginTop: 24 }}>
        <Grid size={6}>
          {renderChart('Impieghi', impieghiPalette, dataImpieghi, legendImpieghi)}
        </Grid>
        <Grid size={6}>
          {renderChart('Fonti', fontiPalette, dataFonti, legendFonti)}
        </Grid>
      </Grid>
    </TableContainer>
    
  );
}
