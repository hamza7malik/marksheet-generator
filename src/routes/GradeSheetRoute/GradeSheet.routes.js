import logo from '../../images/logo.jpg';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isFocusable } from '@testing-library/user-event/dist/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import GradeSheet from '../../component/grade_sheet/GradeSheet.components';
import { generateResults } from '../../utils/helpers/helper';
import { SheetDataContext } from '../../contexts/sheetData/SheetDataContext';
import { useParams } from 'react-router-dom';

const GradeSheetRoute = () => {
  const { sheetData } = useContext(SheetDataContext);
  let { roll } = useParams();

  const generateResult = () => generateResults(roll);
  return (
    <div>
      <button
        className='mt-3 btn btn-dark'
        disabled={sheetData.length === 0 ? true : false}
        onClick={generateResult}
      >
        generate results
      </button>
      <div id={`pdfArea-${roll}`}>
        <GradeSheet sheetData={{ ...sheetData[roll] }} />
      </div>
    </div>
  );
};

export default GradeSheetRoute;
