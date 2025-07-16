import { Routes, Route } from 'react-router';
import styles from './App.module.css';
import './App.css';

import TodosPage from './pages/TodosPage/TodosPage';
import About from './pages/About/About';
import Header from './shared/Header';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
