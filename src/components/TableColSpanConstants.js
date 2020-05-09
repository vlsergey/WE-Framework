// @flow


export const COLUMNS_FOR_DATA_VALUE_EDITOR = 12;

// + SelectSnakTypeButtonCell
export const COLUMNS_FOR_SNAK_EDITOR = 1 + COLUMNS_FOR_DATA_VALUE_EDITOR;

// + add + label + [SNAK EDITOR] + delete
export const COLUMNS_FOR_SNAK_ROW = 2 + COLUMNS_FOR_SNAK_EDITOR + 1;

// + add + rank + flag + label + add qualifier + [SNAK] + references + delete
export const COLUMNS_FOR_CLAIMS_EDITOR = 5 + COLUMNS_FOR_SNAK_EDITOR + 2;
