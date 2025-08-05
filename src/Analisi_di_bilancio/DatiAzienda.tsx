import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TextField, MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import provinceCitta from './province_citta.json';
import { formatCurrency } from "./format.ts";
import { Dati_Azienda } from "./Bilancio&DatiAzienda.ts";
import {macroSettore, subSettore, microSettore, settoreOptions, principaliBorse} from "./utilities.ts";


const helperTexts: Partial<Record<keyof typeof Dati_Azienda, string>> = {
  B16: "Digita un numero (es. 10000.50): sarà automaticamente convertito nel formato € 10.000,50.",
  B24: "Digita un numero.",
};

// Mappa dei tipi attesi per ciascun campo
const fieldTypes: Record<keyof typeof Dati_Azienda, "string" | "number" | "date"> = {
  B11: "string",
  B12: "string",
  B13: "string",
  B14: "string",
  B15: "string",
  B16: "number",
  B17: "number",
  B18: "date",
  B19: "string",
  B20: "string",
  B21: "string",
  B22: "string",
  B23: "string",
  B24: "number",
  B25: "string",
  B26: "string",
};


export default function DatiAzienda({
  formData,
  setFormData,
  isManual,
  setDataDAzienda,
}: {
  formData: typeof Dati_Azienda,
  setFormData: React.Dispatch<React.SetStateAction<typeof Dati_Azienda>>;
  isManual: boolean;
  setDataDAzienda: React.Dispatch<React.SetStateAction<typeof Dati_Azienda>>;
}) {

  const [openYearPicker, setOpenYearPicker] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [tempValueB16, setTempValueB16] = useState<string>(formData.B16 ? String(formData.B16) : "");

  const [comuniList, setComuniList] = useState<string[]>([]);

  const [editingField, setEditingField] = useState<
    keyof typeof Dati_Azienda | null
  >(null);

  // NEW: province e comuni
  const provinceList = provinceCitta.map(p => p.provincia);
  useEffect(() => {
    const sigla = formData.B13;
    const entry = provinceCitta .find((item) => item.provincia.startsWith(sigla + " "));

    if (entry) {
      setComuniList(entry.città);
    } else {
      setComuniList([]);
    }
  }, [formData.B13]);

  const sortedProvinceList = [...provinceList].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );

  const handleChange = (key: keyof typeof Dati_Azienda, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    // Aggiornamento immediato per B11 e B17
    if ((key === "B11" || key === "B17")) {
    setDataDAzienda((prev) => ({ ...prev, [key]: value }));
  }
  };

  const fields: [label: string, key: keyof typeof Dati_Azienda][] = [
    ["Ragione Sociale:", "B11"],
    ["Provincia:", "B13"],
    ["Città:", "B12"],
    ["Indirizzo:", "B14"],
    ["P.IVA:", "B15"],
    ["Capitale Sociale:", "B16"],
    ["Ultimo bilancio anno:", "B17"],
    ["Aggiornamento Dati", "B18"],
    ["Amministratore:", "B19"],
    ["Macro Settore:", "B20"],
    ["Sub Settore:", "B21"],
    ["Micro Settore:", "B22"],
    ["Going Concern Trade Area", "B23"],
    ["Addetti:", "B24"],
    ["Appartenente a gruppo:", "B25"],
    ["Principale Borsa:", "B26"],
  ];

  return (
    <TableContainer component={Paper} className="no-repeat-header">
      <Table sx={{ backgroundColor: "#f5f5f5", borderCollapse: "separate", borderSpacing: 0 , tableLayout: "fixed", width: "100%"}}>
        <TableBody>
          {fields.map(([label, key], index) => {
            const value = formData[key];
            const isEditingCurrency = key === "B16" && editingField !== key;
            const isDate = fieldTypes[key] === "date";
            const isSelect =  key === "B20"|| key === "B21"|| key === "B22"|| key === "B23" || key === "B25" || key === "B26";

            const cleanNumber = (val: string) => {
              if (val.includes(",")) {
                return val.replace(/\./g, "").replace(",", ".");
              } else {
                return val;
              }
            };

            const displayValue =
              key === "B16" && editingField !== key
                ? formatCurrency(Number(value))
                : key === "B24"
                  ? editingField === "B24"
                    ? String(value ?? "")
                    : (() => {
                      const valStr = String(value ?? "");
                      const num = parseFloat(cleanNumber(valStr));
                      if (isNaN(num)) return "";

                      return num % 1 === 0
                        ? String(num)
                        : num.toFixed(2).replace(".", ",");
                    })()
                  : String(value ?? "");

            let isValid = true;
            if (key === "B16") {
              // Consente numeri con punto o virgola
              isValid = /^(\d{1,3}(\.\d{3})*|\d+)([.,]\d+)?$/.test(String(value));
            } else if (key === "B24") {
              isValid = /^(\d{1,3}(\.\d{3})*|\d+)?([.,]\d+)?$/.test(String(value));
            }

            const helperText = (key === "B16" || key === "B24") && !isValid ? helperTexts[key] : "";

            return (
              <TableRow key={key} sx={{ "&:hover": {backgroundColor: "rgba(0, 0, 63, 0.05)"}}}>
                <TableCell
                  align="center"
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    borderRight: "1px solid #b0b0b0",
                    padding: "8px",
                    width: "50%",
                    borderTop: index===0? "3px double #000" : "none",  
                    borderBottom: index===15? "3px double #000" : "1px solid #ccc"
                  }}
                >
                  {label}
                </TableCell>

                <TableCell  sx={{ padding: 1 , width: "50%", borderTop: index===0? "3px double #000" : "none",  borderBottom: index===15? "3px double #000" : "1px solid #ccc"}}>
                  {!isManual ? (
                    <div
                      style={{
                      fontSize: "15px",
                      fontWeight: 400,
                      padding: "1px",
                      textAlign: "center",
                    }}
                  >
                    {isDate
                      ? value
                        ? dayjs(value).format("DD/MM/YYYY")
                        : ""
                      : isEditingCurrency
                        ? formatCurrency(Number(value))
                        : String(value ?? "")}
                  </div>
                ) : key === "B12" ? (
                    <Autocomplete
                      freeSolo 
                      options={comuniList}
                      value={formData.B12 || ""}
                      onChange={(_, newValue) => handleChange("B12", newValue || "")}
                      renderInput={(params) => <TextField {...params} placeholder ="Seleziona o scrivi" size="small" fullWidth />}
                    />
                  ) : key === "B13" ? (
                    <Autocomplete
                      freeSolo 
                      options={sortedProvinceList}
                      getOptionLabel={(option) => {
                        // quando è una stringa, prendi solo la sigla prima dello spazio
                        if (typeof option === 'string') {
                          return option.split(' ')[0]; // "CT" da "CT (Catania)"
                        }
                        return option;
                      }}
                      value={formData.B13 || ""}
                      onChange={(_, newValue) => {
                        // salva solo la sigla, es: "CT"
                        if (typeof newValue === 'string') {
                          const sigla = newValue.split(' ')[0];
                          handleChange("B13", sigla);
                          handleChange("B12", ""); // reset città
                        } else {
                          handleChange("B13", "");
                          handleChange("B12", "");
                        }
                      }}
                      renderOption={(props, option) => {
                        // Separa sigla e parte tra parentesi (compresa)
                        const match = option.match(/^(\S+)\s+(\(.*\))?$/);
                        const sigla = match ? match[1] : option;
                        const parentesi = match && match[2] ? match[2] : '';
                      return (
                        <li {...props}>
                          <span>{sigla}</span>
                          <span style={{ color: 'gray', marginLeft: 7 }}>{parentesi}</span>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Seleziona o scrivi" size="small" fullWidth />
                    )}
                  />
                  ) : key === "B17" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year"]}
                      open={openYearPicker}
                      onOpen={() => setOpenYearPicker(true)}
                      onClose={() => setOpenYearPicker(false)}
                      openTo="year"
                      value={value ? dayjs(`${value}-01-01`) : null}
                      onChange={(newValue) => {
                        const selectedYear = newValue?.year();
                        handleChange(key, selectedYear || "");
                        setOpenYearPicker(false);
                      }}
                      format="YYYY"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          error: !isValid,
                          helperText,
                          onClick: () => setOpenYearPicker(true),
                          inputProps: {
                            readOnly: true,
                            style: { cursor: "pointer" },
                          },
                          sx: {
                            input: {
                              textAlign: "left",
                              fontSize: "15px",
                              fontWeight: 400,
                            },
                            "& .MuiInputBase-root": {
                              justifyContent: "center",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                ) : key === "B18" ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value ? dayjs(value, "YYYY-MM-DD") : null}
                      onChange={(newValue) => {
                        const formatted = newValue?.format("YYYY-MM-DD") || "";
                        handleChange(key, formatted);
                        setOpenDatePicker(false);
                      }}
                      format="DD/MM/YYYY"
                      open={openDatePicker}
                      onOpen={() => setOpenDatePicker(true)}
                      onClose={() => setOpenDatePicker(false)}
                      openTo="day"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          error: !isValid,
                          helperText,
                          onClick: () => setOpenDatePicker(true),
                          inputProps: {
                            readOnly: true, // impedisce input manuale
                            style: { cursor: "pointer" },
                          },
                          sx: {
                            input: {
                            textAlign: "left",
                            fontSize: "15px",
                            fontWeight: 400,
                            },
                            "& .MuiInputBase-root": {
                              justifyContent: "center",
                            },
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                ) : isSelect ? (
                  (key === "B21" || key === "B22" || key === "B26") ? (
                    <Autocomplete
                      freeSolo
                      options={
                        key === "B21" ? subSettore :
                        key === "B22" ? microSettore :
                        key === "B26" ? principaliBorse :
                        []
                      }

                      value={typeof value === "string" ? value : value?.toString() || ""}
                      inputValue={typeof value === "string" ? value : value?.toString() || ""}
                      onChange={(_, newValue) => {
                        handleChange(key, newValue ?? "");
                      }}
                      onInputChange={(event, newInputValue) => {
                        if (event?.type !== 'change') return;
                        handleChange(key, newInputValue);
                      }}
                      renderOption={(props, option) => {
                        const isHeader = macroSettore.includes(option);
                        return (
                          <li
                            {...props}
                            style={{
                              fontWeight: isHeader ? "bold" : "normal",
                              pointerEvents: isHeader ? "none" : "auto",
                              backgroundColor: isHeader ? "#2e498d" : "inherit",
                              color: isHeader ? "#fff" : "inherit",
                            }}
                          >
                            {option}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Seleziona o scrivi"
                          size="small"
                          variant="outlined"
                          error={!isValid}
                          helperText={helperText}
                          sx={{
                            input: {
                              fontSize: "15px",
                              fontWeight: 400,
                              textAlign: "left",
                            },
                          }}
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      variant="outlined"
                      value={value || ""}
                      error={!isValid}
                      helperText={!isValid ? "Seleziona" : helperText}
                      onChange={(e) => handleChange(key, e.target.value)}
                      SelectProps={{
                        displayEmpty: true,
                        renderValue: (selected) => {
                          if (!selected) {
                            return <label style={{color: "rgba(0, 0, 0, 0.38)", fontSize:"15px"}}>Seleziona</label>;
                          }
                          return selected as React.ReactNode;
                        },
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              maxHeight: 300,
                            },
                          },
                        },
                      }}
                      sx={{
                        input: { fontSize: "15px", fontWeight: 400 },
                      }}
                    >
                      <MenuItem value="">
                        <em>Seleziona</em>
                      </MenuItem>

                      {key === "B20" &&
                        macroSettore.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}

                      {key === "B23" &&
                        settoreOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}

                      {key === "B25" &&
                        ["Si", "No"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                    </TextField>
                  )
                  
                ) : ( key === "B16" ? (
                    <TextField
                      value={editingField === "B16" ? tempValueB16 : formatCurrency(Number(formData.B16 || 0))}
                      onFocus={() => {
                        setEditingField("B16");
                        setTempValueB16(formData.B16 ? String(formData.B16) : "");
                      }}
                      onChange={(e) => {
                        setTempValueB16(e.target.value);
                      }}
                      onBlur={() => {
                        setEditingField(null);

                        const raw = tempValueB16.trim();
                        const hasComma = raw.includes(",");
                        const hasDot = raw.includes(".");

                        let cleaned = raw;

                        if (hasComma && hasDot) {
                          cleaned = raw.replace(/\./g, "").replace(",", ".");
                        } else if (!hasComma && hasDot) {
                          cleaned = raw;
                        } else if (hasComma && !hasDot) {
                          cleaned = raw.replace(",", ".");
                        }

                        const parsed = parseFloat(cleaned);
                        handleChange("B16", isNaN(parsed) ? "" : parsed);
                      }}
                      error={!isValid}
                      helperText={helperText}
                      placeholder="Inserisci un numero (es. 10000.50)"
                      size="small"
                      variant="outlined"
                      fullWidth
                      sx={{
                        input: {
                          fontSize: "15px",
                          fontWeight: 400,
                          textAlign: "left",
                        },
                      }}
                    />
                  ) : (
                    <TextField
                      value={displayValue}
                      onFocus={() => setEditingField(key)}
                      onBlur={() => setEditingField(null)}
                      onChange={(e) => handleChange(key, e.target.value)}
                      error={!isValid}
                      helperText={helperText}
                      placeholder={key === "B24" ? "Scrivi un numero" : String(value ? value : "Scrivi")}
                      size="small"
                      variant="outlined"
                      fullWidth
                      sx={{
                        input: {
                          fontSize: "15px",
                          fontWeight: 400,
                          textAlign: "left",
                        },
                      }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
