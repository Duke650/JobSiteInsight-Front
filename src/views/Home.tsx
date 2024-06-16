
import Search from "../components/Search/Search"

interface IProps {
  isLoggedIn: boolean
}

const Home: React.FC<IProps> = ({isLoggedIn}) => {

  return (
    <>
        <Search isLoggedIn={isLoggedIn}/>
    </>
  )
}

export default Home