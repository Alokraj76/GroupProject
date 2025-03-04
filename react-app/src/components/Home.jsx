import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import{ FaHeart , FaRegHeart} from 'react-icons/fa';
import './Home.css';

function Home(){
    const navigate = useNavigate()

    const [products,setproducts] = useState([])
    const [cproducts,setcproducts] = useState([])
    const [search,setsearch] = useState('')
    

    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login');
    //     }
    // },[])
    useEffect(()=>{
        const url = 'http://localhost:5000/get-products'
        axios.get(url)
        .then((res)=>{
            if(res.data.products){
                setproducts(res.data.products)
            }
        })
        .catch((err)=>{
            alert('get product error')
        })

    },[])

    const handlesearch = (value)=>{
        setsearch(value);
    }
    const handleClick=()=>{
        let filteredProducts =products.filter((item)=>{
            
            if(item.pname.toLowerCase().includes(search.toLowerCase()) || 
                item.pdesc.toLowerCase().includes(search.toLowerCase()) || 
                item.category.toLowerCase().includes(search.toLowerCase())){
                return item;
            }

        })
        setcproducts(filteredProducts)
    }

    const handleCategory =(value)=>{
       
        let filteredProducts = products.filter((item)=>{
            if(item.category == value){
                return item;
            }

        })
        setcproducts(filteredProducts)
    }
    return (
        <div>
            <Header search ={search} handlesearch ={handlesearch} handleClick ={handleClick}/>
            <Categories handleCategory = {handleCategory} />

            <h5>SEARCH RESULTS</h5>
           <div className="d-flex justify-content-center flex-wrap">
            {
                cproducts && products.length>0 &&
                cproducts.map((item,index)=>{
                    return(
                        <div key={item._id} className = "card m-3 ">
                            <div className="icon-con">
                                <FaHeart className="icon"/>
                            </div>
                            
                            <img width="100px" height="100px"src={'http://localhost:5000/'+item.pimage}></img>
                            <p className= "m-2">{item.pname} | {item.category}</p>
                            <p className= "m-2  text-success">{item.pdesc}</p>
                            
                        </div>
                    )
                })
            }
            </div>
            <h5>All results</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {
                products && products.length>0 &&
                products.map((item,index)=>{
                    return(
                        <div key={item._id} className = "card m-3 ">
                            <div className="icon-con">
                            <FaHeart className="icon"/>
                            </div>
                        
                            <img width="100px" height="100px"src={'http://localhost:5000/'+item.pimage}></img>
                            <p className= "m-2">{item.pname} | {item.category}</p>
                            <p className= "m-2  text-success">{item.pdesc}</p>
                            
                        </div>
                    )
                })
            }
            </div>


            
        </div> 
    )
}

export default Home;