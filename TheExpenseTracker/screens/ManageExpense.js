import {StyleSheet, Text, TextInput, View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import Button from "../components/UI/Button";
import {ExpenseContext} from "../expenses-context/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({route, navigation}) {
    const expenseCtx = useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;  //convert a contstant into boolean, falsy into false and truthy into true

    const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();        //equivalent to pressing back on screen
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expenseCtx.updateExpense(editedExpenseId, expenseData)
        } else {
            expenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return <View style={styles.container}>
        <ExpenseForm onCancel={cancelHandler}
                     onSubmit={confirmHandler}
                     submitButtonLabel={isEditing ? 'Update' : 'Add'}
                     defaultValues={selectedExpense}
        />

        {isEditing && <View style={styles.deleteContainer}>
            <IconButton
                icon={'trash'}
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler}
            />
        </View>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center"

    },

})

export default ManageExpense;