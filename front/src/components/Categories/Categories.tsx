import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getWorksAC } from '../../redux/actionCreators/getWorks'

  interface ParamTypes {
    category: string
  }
export const Categories = () => {
  const dispatch = useDispatch()
  
  const { category } = useParams<ParamTypes>()
  useEffect(() => {
    
    dispatch(getWorksAC(category));

  }, [category, dispatch])
  return (
    <>
    <h1>{category}</h1>
      
    </>
  )
}
