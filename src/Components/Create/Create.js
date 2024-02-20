import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { AuthContext } from "../../store/firebaseContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const { user } = useContext(AuthContext);
  const date = new Date();
  const [complete, setComplete] = useState(true);
  const [error, setError] = useState("");

  const submitHandler = () => {
    if (name && category && price && image) {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${image.name}`);

      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          try {
            const docRef = await addDoc(collection(db, "products"), {
              name,
              category,
              price,
              url: downloadURL,
              userId: user?.uid,
              date: date.toDateString(),
            });

            if (docRef) {
              navigate("/");
            }
          } catch (e) {
            console.error("Error adding document: ", e);
            setError("user not found");
          }
        });
      });
    } else {
      setComplete(false);
    }
  };

  return (
    <Fragment>
      <Header />
      {/* <card> */}
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            name="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />
        </form>
        <br />
        <img
          alt="Posts"
          width="200px"
          height="140px"
          src={image ? URL.createObjectURL(image) : ""}
        ></img>
        <br />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <button className="uploadBtn" onClick={submitHandler}>
          upload and Submit
        </button>
        {!complete ? (
          <span style={{ color: "red" }}>all fields required</span>
        ) : (
          ""
        )}
        <span style={{ color: "red" }}>{error}</span>
      </div>
      {/* </card> */}
    </Fragment>
  );
};

export default Create;
