import { useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getWorksAC } from '../../redux/actionCreators/getWorks'

  interface ParamTypes {
    category: string
  }
export const Categories = () => {
  
  const { category } = useParams<ParamTypes>()

  const dispatch = useDispatch()
  dispatch(getWorksAC(category));
  return (
    <>
    <h1>{category}</h1>
      
    </>
  )
}
