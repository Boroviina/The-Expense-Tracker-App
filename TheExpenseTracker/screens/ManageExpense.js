import {StyleSheet, Text, View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import Button from "../components/UI/Button";
import {ExpenseContext} from "../expenses-context/expense-context";

function ManageExpense({route, navigation}) {
    const expenseCtx=useContext(ExpenseContext);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;  //convert a contstant into boolean, falsy into false and truthy into true

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

    function confirmHandler() {
        if (isEditing){
            expenseCtx.updateExpense(editedExpenseId,{})
        }else {
            expenseCtx.addExpense({});
        }
        navigation.goBack();
    }

    return <View style={styles.container}>
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
            <Button style={styles.button} onPress={confirmHandler}>{isEditing ? "Update" : "Add"}</Button>
        </View>
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
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})

export default ManageExpense;