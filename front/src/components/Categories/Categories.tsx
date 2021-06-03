import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getWorksAC } from '../../redux/actionCreators/getWorks'
import { rootState } from '../../redux/init'

  interface ParamTypes {
    category: string
  }
export const Categories = () => {
  const dispatch = useDispatch()
  const worksState = useSelector((state: rootState) => state.works.works)
  console.log(worksState,'worksState', typeof worksState);
  
  const { category } = useParams<ParamTypes>()
  useEffect(() => {
    
    dispatch(getWorksAC(category));

  }, [category, dispatch])
  return (
    <>
    <h1>{category}</h1>
      {worksState.map(item => item.title)}
    </>
  )
}
