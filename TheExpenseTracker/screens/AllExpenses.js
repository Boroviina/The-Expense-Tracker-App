import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpenseContext} from "../expenses-context/expense-context";

function AllExpenses(){
    const expensesCtx=useContext(ExpenseContext);
    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod={"total"}/>
}

export default AllExpenses;