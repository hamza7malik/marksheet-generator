import './SheetToPDF.styles.css';
import React, { useState, useNavigate, Fragment, useContext } from 'react';
import { SheetDataContext } from '../../contexts/sheetData/SheetDataContext';
import { read, utils } from 'xlsx';
import { Link } from 'react-router-dom';
import GradeSheet from '../grade_sheet/GradeSheet.components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { generateResults } from '../../utils/helpers/helper';
import GradeSheetCard from '../gradeSheetCard/GradeSheetCard';

// interface President {
//   Name: string;
//   Index: number;
// }

const SheetToPDF = () => {
  const { sheetData, setSheetData, class_name, setClass_name } =
    useContext(SheetDataContext);
  const [error, setError] = useState('');

  const isErrors = () => {
    if (error !== '') {
      return true;
    }
    if (class_name.toString() === '') {
      setError('Please enter class/grade');
      return true;
    }
    if (class_name.length > 10) {
      setError('Max characters reached');
      return true;
    }
    return false;
  };

  const generateAllResults = () => {
    if (isErrors()) return;
    sheetData.map((data, index) => {
      generateResults(index + 1);
    });
  };
  const handleUpload = async (e) => {
    const fileToConvert = e.target.files[0];

    const f = await fileToConvert.arrayBuffer();
    const wb = read(f);
    const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    setSheetData(data);
  };
  const handleInputChange = (e) => {
    setError('');
    const { value } = e.target;
    setClass_name(value);
  };
  return (
    <div className='container'>
      <div className='mt-5 p-2 m-2 bg-info text-white shadow rounded-2  '>
        {/* <input type='file'></input> */}
        <input
          type='file'
          accept='xlsx, xls'
          multiple={false}
          onChange={handleUpload}
        />
      </div>
      <div className='form mt-3'>
        <label className='p-3'>Class/Grade name: </label>
        <input
          type={'text'}
          name='class_name'
          placeholder='Enter class/grade name'
          onChange={(e) => handleInputChange(e)}
        ></input>
        <p className='text-danger'>{error}</p>
      </div>
      <button
        className='mt-3 btn btn-dark'
        disabled={sheetData.length === 0 ? true : false}
        onClick={generateAllResults}
      >
        generate results
      </button>
      <div className='m-5'>
        <div className='row'>
          {sheetData.map((item, index) => {
            return (
              <GradeSheetCard
                key={index}
                studentData={item}
                index={index}
                class_name={class_name}
              />
            );
          })}
        </div>
      </div>

      {sheetData.length !== 0 &&
        sheetData.map((data, index) => {
          return (
            <div key={index} id={`pdfArea-${index + 1}`}>
              <GradeSheet sheetData={{ ...sheetData[index] }} />
            </div>
          );
        })}
    </div>
  );
};

export default SheetToPDF;
