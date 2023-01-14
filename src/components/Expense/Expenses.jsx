import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ExpenseForm from "./ExpenseForm"
import UpdateForm from "./UpdateForm"
import { expensesActions } from "../../store/expenses" 

function Expenses() {

    const url = "https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"

    const expenses = useSelector(state => state.expense.expenses)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [id, setId] = useState('')
    const [data,setData] = useState({})

    let amount = 0
    expenses.forEach(expense => {
        amount += Number(expense.amount)
    })

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
          dispatch(expensesActions.setExpenses(arr))
        })
    }

    const getData = (id) => {
        fetch(`https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`).then(res => res.json())
        .then(data => {
            setId(id)
          setData(data)
          setShow(prev => !prev)
        })
    }

    const addExpense = async (expense) => {
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
            console.log(data)
          
            getExpenses()
        } catch (error) {
            console.error(error)
        }
    }

    const deleteExpense =  (id) => {
        fetch(`https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,{
            method : 'DELETE'
        })
        .then(() => {
        console.log("Expense successfuly deleted")

        })
        const filteredExpenses = expenses.filter(expense => expense.id != id)
        dispatch(expensesActions.setExpenses(filteredExpenses))
    }

    const editExpense = (expense,id) => {
        fetch(`https://fir-99cf8-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,{
            method : 'PATCH',
            body : JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(data => {
            console.log(data)
            getExpenses()
        })
    }

    return (
        <>
        {
            !show ? <ExpenseForm addExpense={addExpense} /> : <UpdateForm edit={editExpense} data={data} setShow={setShow} id={id} />
        }
            <h1 style={{
                textTransform: 'uppercase',
                textAlign: 'center',
                color: 'cornflowerblue',
            }}>Your Expenses {amount > 1000 ? <button className="btn">Activate Premium</button> : ''}</h1>
            <section className="expenses">

                {
                    expenses.length > 0 && expenses.map(item => (
                        <article className="expense" key={item.id}>
                            <h2>{item.description}</h2>
                            <h3>{item.amount}</h3>
                            <p>{item.category}</p>
                            <div>

                            <button className="edit" onClick={() => getData(item.id)}>Edit</button>
                            <button className="delete" onClick={() => deleteExpense(item.id)}>Delete</button>
                            </div>
                        </article>
                    ))
                }
            </section>

        </>
    )
}

export default Expenses