import {FlatList, Text, View, StyleSheet} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

const DUMMY_EXPENSES =[
    {
        id: 'e1',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'a pair of trousers',
        amount: 89.99,
        date: new Date('2022-12-19')
    },{
        id: 'e3',
        description: 'bananas',
        amount: 39.99,
        date: new Date('2021-06-20')
    },{
        id: 'e4',
        description: 'a book',
        amount: 19.99,
        date: new Date('2021-12-09')
    },{
        id: 'e5',
        description: 'a cup',
        amount: 15.99,
        date: new Date('2023-01-09')
    },
];

function ExpensesOutput({expenses, expensesPeriod}) {
    return (<View style={styles.constainer}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>

    );
}

export default ExpensesOutput;

const styles =StyleSheet.create({
    constainer:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    }
})