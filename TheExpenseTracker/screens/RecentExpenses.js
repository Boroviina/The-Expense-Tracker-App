import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpenseContext} from "../expenses-context/expense-context";
import {useContext} from "react";
import {getDateMinusDays} from "../util/date";

function RecentExpenses() {
    const expenseCtx = useContext(ExpenseContext);
    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"} fallBackText={"No Expenses Registered"}/>
}

export default RecentExpenses;