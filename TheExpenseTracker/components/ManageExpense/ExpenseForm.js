import {View, StyleSheet, Text} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel}) {
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }
    function submitHandler(){
        const expenseData={
            amount: +inputValues.amount,  //plus converts string to a number
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        onSubmit(expenseData);
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input label={"Amount"}
                   style={styles.rowInput}
                   textInputConfig={{
                       keyboardType: 'decimal-pad',
                       onChangeText: inputChangeHandler.bind(this, 'amount'),
                       value: inputValues.amount
                   }}/>
            <Input label={"Date"}
                   style={styles.rowInput}
                   textInputConfig={{
                       placeholder: 'YYYY-MM-DD',
                       maxLength: 10,
                       onChangeText: inputChangeHandler.bind(this, 'date'),
                       value: inputValues.date
                   }}/>
        </View>
        <Input label={"Description"} textInputConfig={{
            multiline: true,
            // autoCorrect: false,
            // autoCapitalize:'sentences'
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputValues.description
        }}/>
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput: {
        flex: 1
    },
    form: {
        marginTop: 40,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
        marginVertical: 40,
        textAlign: "center"
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