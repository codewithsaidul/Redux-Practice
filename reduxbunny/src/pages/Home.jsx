import Balance from "../components/Home/Balance"
import Form from "../components/Home/Form"
import Transactions from "../components/Home/Transactions/Transactions"


const Home = () => {
  return (
    <main className="main">
        <div className="container">
            <Balance />
            <Form />
            <Transactions />
        </div>
    </main>
  )
}

export default Home