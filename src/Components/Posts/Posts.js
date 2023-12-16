import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import { getDocs,collection} from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';



function Posts() {

  const [products, setProducts] = useState([]);
  const db = useContext(FirebaseContext);

  useEffect(() => {
    //-- Getting documents from firebase 
    getDocs(collection(db, 'products')).then((snapshot) => {
      const data = snapshot.docs.map(doc => {
        return ({
          //--data() function will help to take datas from the collection 
          ...doc.data(),
          id: doc.id
        })
      })

      setProducts(data);

    })
  })

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">


          {products.map(obj => {
            return (
              <div
                className="card"
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={obj.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {obj.price}</p>
                  <span className="kilometer">{obj.category}</span>
                  <p className="name"> {obj.name}</p>
                </div>
                <div className="date">
                  <span>{obj.date}</span>
                </div>
              </div>
            )
          })}


        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
