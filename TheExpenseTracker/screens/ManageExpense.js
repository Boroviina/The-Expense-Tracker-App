import {Text} from "react-native";
import {useLayoutEffect} from "react";

function ManageExpense({route, navigation}) {
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;  //convert a contstant into boolean, falsy into false and truthy into true

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    return <Text>ManageExpense screen</Text>
}

export default ManageExpense;