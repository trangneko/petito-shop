import "./App.css";
import { useEffect, useState } from "react";
import { database, auth, storage } from "./config/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Auth } from "./components/auth";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [productList, setProductList] = useState([]);

  //New product state
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [isProductType, setIsProductType] = useState(true);

  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  //File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const productCollectionRef = collection(database, "products")

  const onAdd = async () => {
    try {
      await addDoc(productCollectionRef, {
        title: newProductTitle,
        price: newProductPrice,
        type: isProductType,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(database, "products", id);
    await deleteDoc(productDoc);
  };
  const updateProduct = async (id) => {
    const productDoc = doc(database, "products", id);
    await updateDoc(productDoc, { title: updatedTitle });
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `pjFiles/${fileUpload.name}`);
    try {
    await uploadBytes(filesFolderRef, fileUpload);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
  const getProductList = async () => {
    //Read the data & set product list
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductList(filteredData);

    } catch (err) {
      console.error(err);
    }
  };
    getProductList();
  }, [onAdd]);


  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="Product Title..."
          onChange={(e) => setNewProductTitle(e.target.value)}
        />
        <input
          placeholder="Price..."
          type={"number"}
          onChange={(e) => setNewProductPrice(Number(e.target.value))}
        />
        <input
          type={"checkbox"}
          checked={isProductType}
          onChange={(e) => setIsProductType(e.target.checked)}
        />
        <label>standee</label>
        <button onClick={onAdd}>Add</button>
      </div>

      <div>
        {productList.map((product) => (
          <div>
            <h1>{product.title}</h1>
            <p>{product.price}</p>

            <button onClick={() => deleteProduct(product.id)}>Delete</button>

            <input
              placeholder="New title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateProduct(product.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>

      <div>
        <input type={'file'} 
        onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
