import { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home(){
    const navigate = useNavigate()

    const [products,setproducts] = useState([])
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
        // console.log('',value)
        setsearch(value);
    }
    const handleClick=()=>{
        console.log('products',products);
        let filteredProducts =products.filter((item)=>{
            if(item.pname.toLowerCase().includes(search.toLowerCase()) || 
                item.pdesc.toLowerCase().includes(search.toLowerCase()) || 
                item.category.toLowerCase().includes(search.toLowerCase())){
                return item;
            }

        })
        setproducts(filteredProducts)
    }

    return (
        <div>
            <Header search ={search} handlesearch ={handlesearch} handleClick ={handleClick}/>
           { !!localStorage.getItem('token')&&<Link to="add-product">ADD PRODUCT</Link> }
            <h2>LOST ITEMS DETAILS: </h2>
            <div className="d-flex justify-content-center flex-wrap">
            {
                products && products.length>0 &&
                products.map((item,index)=>{
                    return(
                        <div className = "card m-3 ">
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