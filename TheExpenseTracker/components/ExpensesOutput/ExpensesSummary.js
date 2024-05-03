import {Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

function ExpensesSummary({expenses, periodName}) {
    const expensesSum = expenses.reduce((sum, expense) => {  //this function allows zou to combine a multiple values of array into a single number
        return sum + expense.amount;
    }, 0);

    return <View style={styles.constainer}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
}

export default ExpensesSummary;

const styles=StyleSheet.create({
    constainer:{
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400
    },
    sum:{
        fontSize: 16,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary500
    }
})