import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
