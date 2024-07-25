import { Link } from "react-router-dom";
import localhost from "../config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import inStock from '../assets/inStock.svg';
import lowStock from '../assets/lowInStock.svg';
import soldOut from '../assets/soldOut.svg';

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/category/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        if (data.products.length > 0) {
          setName(data.products[0].category.name);
        }
        setProducts(data.products);
      }
    };
    fetchData();
  }, [id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const manageStock = (stockQty) => {
    if(stockQty >= 10) {
      return ['In stock', inStock];
    }else if(stockQty > 0) {
      return ['Low in stock', lowStock];
    }else{
      return ['Sold out', soldOut];
    }
  };

  return (
    <>
      <Header />
      <ul className="flex space-x-2 p-4">
        <li>
          <Link to={`/`}>Homepage</Link>
        </li>
        <li>/</li>
        {name && <li>{name}</li>}
      </ul>
      <h1 className="text-gold text-center text-5xl mb-9 font-primary">
        {name}
      </h1>
      <ul className="grid grid-cols-3 gap-6 mx-20 mb-8">
        {currentProducts.length > 0 ? (
          currentProducts.map((elem) => {
            const [stockText, stockIcon] = manageStock(elem.stockQty);
            return (
            <li key={elem.id} className="border border-gray-300 p-4 rounded-lg">
              <Link to={`/product/${elem.id}`}>
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={elem.images}
                  alt={elem.name}
                />
                <p className="text-center font-primary">{elem.name}</p>
                <div className="flex items-center">
                  <img className="w-6 h-6" src={stockIcon} alt={stockText}/>
                  <p className="text-left font-primary">{stockText}</p>
                </div>
              </Link>
            </li>
          );
        })
        ) : (
          <p className="col-span-3 text-center">No products yet</p>
        )}
      </ul>
      <div className="flex justify-center space-x-2 mb-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1 ? "bg-gold text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Footer />
    </>
  );
}
