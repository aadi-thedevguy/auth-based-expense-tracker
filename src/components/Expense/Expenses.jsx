import { useEffect, useState } from "react"
import ExpenseForm from "./ExpenseForm"


function Expenses() {

    const url = "https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"

    const [expenses, setExpenses] = useState([])
    useEffect(() => {
     getExpenses()
    }, [])
    
    const getExpenses = () => {
        fetch(url).then(res => res.json())
        .then(data => {
          const arr = []
          for (const key in data) {
              arr.push({
                  id : key,
                  amount: data[key].amount,
                  description: data[key].description,
                  category : data[key].category
              })
          }
          setExpenses(arr)
        })
    }

    const onAdd = async (expense) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        try {

            const res = await fetch(url, options)
            const data = await res.json()
            // getExpenses()
            setExpenses([...expenses, expense])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <ExpenseForm addExpense={onAdd} />
            <h1 style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                color: 'cornflowerblue',
            }}>Your Expenses</h1>
            <section className="expenses">

                {
                    expenses.map(item => (
                        <article className="expense" key={item.description}>
                            <h2>{item.description}</h2>
                            <h3>{item.amount}</h3>
                            <p>{item.category}</p>
                        </article>
                    ))
                }
            </section>

        </>
    )
}

export default Expenses