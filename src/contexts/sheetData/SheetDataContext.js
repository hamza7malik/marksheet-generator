import react, { useState, createContext } from 'react';

export const SheetDataContext = createContext({
  sheetData: [],
  setSheetData: () => {},
  class_name: '',
  setClass_name: () => {},
});

export const SheetDataProvider = ({ children }) => {
  const [sheetData, setSheetData] = useState([]);
  const [class_name, setClass_name] = useState([]);

  const value = { sheetData, setSheetData, class_name, setClass_name };
  return (
    <SheetDataContext.Provider value={value}>
      {children}
    </SheetDataContext.Provider>
  );
};
