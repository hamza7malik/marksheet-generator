import './App.css';
import GradeSheet from './component/grade_sheet/GradeSheet.components';
import SheetToPDF from './component/SheetToPDF/SheetToPDF';
import { Routes, Route } from 'react-router-dom';
import GradeSheetRoute from './routes/GradeSheetRoute/GradeSheet.routes';

function App() {
  return (
    <div className='App '>
      {/* <GradeSheet /> */}
      <Routes>
        <Route path='/' element={<SheetToPDF />} />
        <Route path='/result-:roll' element={<GradeSheetRoute />} />
      </Routes>
    </div>
  );
}

export default App;
