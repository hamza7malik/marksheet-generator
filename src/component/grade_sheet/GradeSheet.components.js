import './GradeSheet.styles.css';
import logo from '../../images/logo.jpg';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isFocusable } from '@testing-library/user-event/dist/utils';
import { SheetDataContext } from '../../contexts/sheetData/SheetDataContext';
import { generateResults } from '../../utils/helpers/helper';

const GradeSheet = ({ sheetData }) => {
  const [showPercentage, setShowPercentage] = useState(true);
  const { class_name } = useContext(SheetDataContext);

  const { name, roll, f_name, grNo, total, obtained, grade, percentage } =
    sheetData;
  const {
    English,
    Biology,
    Computer,
    Mathematics,
    Chemistry,
    Physics,
    Urdu,
    Islamiat,
    Pakistan_Studies,
    Sindhi,
    Attendance,
  } = sheetData;

  const subjects = [
    { name: 'English', val: English },
    { name: 'Biology', val: Biology },
    { name: 'Computer', val: Computer },
    { name: 'Mathematics', val: Mathematics },
    { name: 'Chemistry', val: Chemistry },
    { name: 'Physics', val: Physics },
    { name: 'Urdu', val: Urdu },
    { name: 'Islamiat', val: Islamiat },
    { name: 'Pakistan Studies', val: Pakistan_Studies },
    { name: 'Sindhi', val: Sindhi },
  ];

  useEffect(() => {
    subjects.map((sub, index) => {
      if (sub.val < 8 || sub.val === 'Absent') {
        setShowPercentage(false);
        return;
      }
    });
  }, []);

  const getGrade = (percentage) => {
    let grade = '';
    percentage = parseInt((percentage * 100).toFixed(2));
    if (80 <= percentage && percentage <= 100) grade = 'A+';
    if (70 <= percentage && percentage <= 79.99) grade = 'A';
    if (60 <= percentage && percentage <= 69.99) grade = 'B';
    if (50 <= percentage && percentage <= 59.99) grade = 'C';
    if (40 <= percentage && percentage <= 49.99) grade = 'D';
    if (33 <= percentage && percentage <= 39.99) grade = 'E';
    if (percentage && percentage < 33) grade = 'F';
    return grade;
  };
  return (
    <div>
      <div id={`pdfArea-${roll}`}>
        <div className='container mt-5 pt-5'>
          <div className='table-responsive-lg mt-5'>
            <div className='table-responsive-lg'>
              <div className='table table-bordered'>
                <div className='row'>
                  <div className='col-md-3 '>
                    <div>
                      <img
                        className='float-left '
                        src={logo}
                        style={{ maxWidth: '50%' }}
                      />
                    </div>
                    <div>
                      <p className='bold-txt '>EST. Since 2000</p>
                    </div>
                  </div>
                  <div className='col-md-8'>
                    <h1 className='mt-4 '>S.K. Skills & Knowledge</h1>
                    <h3 className='mt-0 pt-0'> Grammar School</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className='box bg-secondary text-light p-3 m-5'>
              <h5>MARK-SHEET</h5>
              <h6>MONTHLY TEST OCTOBER 2022</h6>
            </div>

            <div className='student-details p-5'>
              <div className='row mt-3'>
                <div className='col-md-4'>
                  <p className='bold-txt'>Roll# : </p>{' '}
                  <u className='underline bold-txt'>{roll}</u>
                </div>
                {/* {!Attendance && <div className='col-md-4'></div>} */}
                <div className='col-md-4'>
                  <p className='bold-txt'>GR # : </p>
                  <u className='underline bold-txt'>{grNo}</u>
                </div>
                <div className='col-md-4'>
                  <p className='bold-txt'>Class : </p>{' '}
                  <u className='underline bold-txt'>{class_name}</u>
                </div>
                {Attendance && (
                  <div className='col-md-4'>
                    <p className='bold-txt'>Attendance : </p>{' '}
                    <u className='underline bold-txt'>---</u>
                  </div>
                )}
              </div>
              <div className='row d-flex mt-5'>
                <div className='col-md-4 ml-auto'>
                  <p className='bold-txt'>Name : </p>{' '}
                  <u className='underline bold-txt'>{name}</u>
                </div>

                {!Attendance && <div className='col-md-4'></div>}
                <div className='col-md-4'>
                  <p className='bold-txt'>Father's Name : </p>{' '}
                  <u className='underline bold-txt'>{f_name}</u>
                </div>
                {/* <div className='col-md-4'>
                  <p className='bold-txt'>GR # : </p>
                  <u className='underline bold-txt'>{grNo}</u>
                </div> */}
              </div>
            </div>

            <table className='table table-bordered p-3 mt-5'>
              <thead>
                <tr>
                  <th scope='col' colSpan='2'>
                    Subject
                  </th>
                  <th scope='col'>Maximum Marks</th>
                  <th scope='col'>Marks Obtained</th>
                  <th scope='col'>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => {
                  const { name, val } = subject;
                  if (val === undefined) return;

                  return (
                    <tr key={index}>
                      <th scope='row'>{index + 1}</th>
                      <td> {name} </td>
                      <td>25</td>
                      <td>{val}</td>
                      <td>
                        {val === 'Absent' || val < 8 ? 'uncleared' : 'cleared'}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <th colSpan='2'>Total</th>
                  <th>{total}</th>
                  <th>{obtained}</th>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div className='student-details p-3'>
              <div className='row mt-5'>
                <div className='col-md-4'></div>
                <div className='col-md-4'>
                  <p className='bold-txt'>Grade : </p>
                  <u className='underline bold-txt'>
                    {' '}
                    {showPercentage ? getGrade(percentage) : '---'}
                  </u>
                </div>
                <div className='col-md-4'>
                  <p className='bold-txt'>Overall Percentage : </p>{' '}
                  <u className='underline bold-txt'>
                    {showPercentage
                      ? (percentage * 100).toFixed(2) + ' %'
                      : '---'}
                  </u>
                </div>
              </div>
            </div>
            <div className='signatures p-5 m-5'>
              <div className='row mt-5'>
                <div className='col-md-6'>
                  <h1>_______________</h1>
                  <label className='bold-txt'>Controller of Examination</label>
                </div>

                <div className='col-md-6 float-right'>
                  <h1 className='float-right'>_______________</h1>
                  <label className='bold-txt'>Principal</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeSheet;
