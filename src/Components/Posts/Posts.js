import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../store/firebaseContext';
import { postContext } from '../../store/postContext';
import { getDocs, collection } from 'firebase/firestore';
//import { searchContext } from '../../store/searchContext';
import Heart from '../../assets/Heart';
import './Post.css';



function Posts() {

  const [ products,setProducts ] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const db = useContext(FirebaseContext);
  const { setPostDetails } = useContext(postContext);
  //const { searchProduct } = useContext(searchContext);
  const navigate = useNavigate();

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
      setFilterProduct(products);

    })
  })

 useEffect(() => {

  const searchText = "Nokia"

  if (searchText){
    console.log('hello')
    const filter = products.filter((product) => {
      return product?.name?.toLowerCase()?.includes(searchText.toLowerCase()) ||
      product?.category?.toLowerCase()?.includes(searchText.toLowerCase()) 
    });
  
    setFilterProduct(filter);
    console.log('checking...')
  }else{

    setFilterProduct(products);
    console.log('checking...else')
  }
  

 },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">


          { filterProduct.map(obj => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(obj)
                  navigate('/view')
                }}
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
