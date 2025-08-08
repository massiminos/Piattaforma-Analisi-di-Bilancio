interface RowStyle {
  bg: string;
  text: string;
  borderBottom?: string;
  hover: string
}

export const getRowStyle = (darkBlueRows:any[],lightBlueRows:any[],lightGrayRows:any[],rowOriginalIndex: number): RowStyle => {
  if (darkBlueRows.includes(rowOriginalIndex)) {
    return { bg: "#003366", text: "#ffffff", hover:"rgba(9, 27, 65, 0.92)"};
  }
  if (lightBlueRows.includes(rowOriginalIndex)) {
    return { bg: "#1a4d80", text: "#ffffff", hover:"rgba(9, 27, 65, 0.81)" };
  }
  if (lightGrayRows.includes(rowOriginalIndex)) {
    return { bg: "#e0e0e0", text: "#000000", borderBottom:"1px solid #fff", hover:"rgba(0, 0, 0, 0.25)" };
  }
  return { bg: "transparent", text: "#000000", hover:"rgba(60, 61, 88, 0.08)" };
};

//----------------------------------------
export type tCell = string | number | undefined;
export const resolveCell = (cell:tCell): tCell =>
  typeof cell === "string" && cell.startsWith("vars.") ? eval(cell) : cell;

export const percentForm = (v:any) => `${(Number(v)*100).toFixed(2)}%`;
export const fix4_0 = (v:any) => Number(v).toFixed(4);

export const formatCurrency = (value: number): string =>  {
  const formatted = new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `€ ${formatted}`;
};