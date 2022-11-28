import react from 'react';
import { Link } from 'react-router-dom';
import './GradeSheetCard.css';

const GradeSheetCard = ({ studentData, index, class_name }) => {
  return (
    <div key={index} className='col-md-3 mt-3'>
      <div className='card' style={{ width: '18rem' }}>
        <div className='card-body'>
          <h5 className='card-title'>Rollno : {studentData.roll}</h5>
          <h6 className='card-subtitle mb-2 text-muted'>
            Name: {studentData.name}{' '}
          </h6>
          <Link
            to={`/result-${index}`}
            state={{ ...studentData, class_name }}
            className='card-link'
          >
            view result
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GradeSheetCard;
