import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import localhost from "../../config";
import Header from "../Header";
import Footer from "../Footer";

export default function CreadArticle() {
  const [allCategorie, setAllCategorie] = useState([]);
  const [allMaterial, setAllMaterial] = useState([]);
  const [allStone, setAllStone] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [nom, setNom] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [stone, setStone] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchIsAdmin = async () => {
      const email = localStorage.getItem("user");
      const response = await fetch(`${localhost}/api/isAdmin/${email}`);
      if (response.status === 200) {
        const data = await response.json();
        if (data.isAdmin) {
          fetchData();
        } else {
          navigate("/", { replace: true });
        }
      } else {
        navigate("/", { replace: true });
      }
    };
    fetchIsAdmin();
    const fetchData = async () => {
      const response = await fetch(`${localhost}/api/categorie`);
      if (response.status === 200) {
        const data = await response.json();
        setAllCategorie(data.allCategory);
      }
      const response_material = await fetch(`${localhost}/api/material`);
      if (response_material.status === 200) {
        const data_material = await response_material.json();
        setAllMaterial(data_material.allMaterial);
      }
      const response_stone = await fetch(`${localhost}/api/stone`);
      if (response_stone.status === 200) {
        const data_stone = await response_stone.json();
        setAllStone(data_stone.allStone);
      }
    };
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      category_id: parseInt(category_id),
      material_id: parseInt(material),
      stone_id: parseInt(stone),
      image: image,
      color: color,
      nom: nom,
      size: size,
      weight: weight,
      price: price,
      stockQty: stockQty,
      description: description,
    };
    const response = await fetch(`${localhost}/api/admin/addArticle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
    });
    if (response.status === 200) {
      navigate("/admin", { replace: true });
    }
  };
  return (
    <>
      <Header></Header>
      <h1 className="text-center	text-2xl	mb-4	mt-4 text-gold">
        Create a product
      </h1>
      <form
        className="flex flex-col justify-center	items-center"
        onSubmit={handelSubmit}
      >
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="nom"
          id="nom"
          placeholder="Product name"
          required
          onChange={(e) => setNom(e.target.value)}
        />
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="cat"
          id="categorie"
          onChange={(e) => setCategory_id(e.target.value)}
        >
          <option value="">--Please choose a category--</option>
          {allCategorie &&
            allCategorie.map((elem) => (
              <option value={elem.id}>{elem.name}</option>
            ))}
        </select>

        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="material"
          id="material"
          onChange={(e) => setMaterial(e.target.value)}
        >
          <option value="">--Please choose a material--</option>
          {allMaterial &&
            allMaterial.map((elem) => (
              <option value={elem.id}>{elem.name}</option>
            ))}
        </select>
        <select
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="stone"
          id="stone"
          onChange={(e) => setStone(e.target.value)}
        >
          <option value="">--Please choose a stone--</option>
          {allStone &&
            allStone.map((elem) => (
              <option value={elem.id}>{elem.name}</option>
            ))}
        </select>
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="image"
          id="image"
          placeholder="Image"
          required
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="color"
          id="color"
          placeholder="Color"
          required
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="text"
          name="size"
          id="size"
          placeholder="Size"
          required
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="weight"
          id="weight"
          placeholder="Weight"
          step="0.01"
          required
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          step="0.01"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          type="number"
          name="stockQty"
          id="stockQty"
          placeholder="StockQty"
          required
          onChange={(e) => setStockQty(e.target.value)}
        />
        <textarea
          className="border	border-solid	border-slate-500 w-96 p-2.5	rounded-xl mb-4"
          name="content"
          id="content"
          placeholder="Description"
          required
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" id="submit">
          Add a product
        </button>
      </form>
      <Footer></Footer>
    </>
  );
}
