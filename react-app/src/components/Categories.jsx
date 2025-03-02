import './Header.css'
import CategoriesList from './categoriesList';

function Categories(props){
    

    return (
        <div className='cat-container '>
            <div>
                <span className='pr-3'>All Categories</span>
                {CategoriesList && CategoriesList.length >0 &&
                CategoriesList.map((item,index)=>{
                    return(
                        <span onClick={()=>props.handleCategory && props.handleCategory(item)}   key={index} className='category'>{item}</span>
                    )
                })}
            </div> 
        </div>
    )
}
export default Categories;