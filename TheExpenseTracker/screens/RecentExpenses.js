import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpenseContext} from "../expenses-context/expense-context";
import {useContext, useEffect, useState} from "react";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/loadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpenseContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (error) {
                setError("Could not fetch expnses!");
            }

            setIsFetching(false);

        }

        getExpenses();
    }, []);


    if (error && !isFetching){
        return <ErrorOverlay message={error} />
    }
    if (isFetching) {
        return <LoadingOverlay/>
    }

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return (expense.date > date7DaysAgo) && (expense.date <= today);
    });
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"}
                           fallBackText={"No Expenses Registered"}/>
}

export default RecentExpenses;