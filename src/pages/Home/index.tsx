import { Link, useHistory } from 'ice';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { fetchList } from '../../app/data/datasSlice'
import { RootState } from '../../app/store'
import { useState, useEffect } from 'react'
import item from "@/pages/Home/models/item";
// import { Data } from '../../components/Data/Data'


const Home = () => {
  const item_data = useAppSelector((state: RootState) => state.data.data)
  // console.log(item_data.map((item, index) => { console.log(item.id) }))
  const dispatch = useAppDispatch()
  const history = useHistory();
  // const datas = ['bulbasaur', 'pikachu', 'ditto', 'bulbasaur']
  // const [pollingInterval, setPollingInterval] = useState(0)

  // const { data } = useAppSelector((state) => {
  //   console.log(data)
  // })

  useEffect(() => {
    dispatch(fetchList())
  }, [dispatch])


  return (
    <div>
      {/*<div>*/}
      {/*  {item_data.map((item, index) => (*/}
      {/*    <div>*/}
      {/*    <h3>{item.id} - {item.name}</h3>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <h1>HOME PAGE</h1>
      <div><Link to="/about" >About</Link></div>
      <button
        onClick={() => {
          history.push({
            pathname: '/seller',
            state: { name: 'click span', age: 100, char: 'wewe', array: ['HEHEHE', 'HOHOHO', 'HAHAHA'] },
          });
        }}
      > SELLER
      </button>
      {/* eslint-disable-next-line max-len */}
      <div><Link to={{ pathname: '/seller', state: { name: 'JAMES', age: 100, char: 'wewe', array: ['HEHEHE', 'HOHOHO', 'HAHAHA'] } }}>seller</Link></div>
    </div>
  );
};

export default Home;
