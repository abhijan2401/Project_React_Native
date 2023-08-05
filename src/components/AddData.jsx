import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header';
import Button from './Button';
import { GetData } from '../services/GetData';
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const AddData = () => {
    const [Name, setName] = useState("")
    const [Title, setTitle] = useState("")
    const [Department, setDepartment] = useState("")
    const [Salary, setSalary] = useState("")
    const AddDatat = () => {
        console.log(Name, Title, Department, Salary);
        const data = {
            Name: Name,
            EmpTitle: Title,
            Department: Department,
            Salary: Salary
        }
        if (Name == "" || Title == "" || Department == "" || Salary == "") {
            alert("Please Enter all fields")
        }
        if (Department != "HR" && Department != "Tech" && Department != "Product" && Department != "Leadership") {
            alert("Department must be one of them")
        }
        else {
            fetch("http://192.168.109.185:3000/addTodo", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    alert("Employee is added")
                    setName(""); setTitle(""); setDepartment(""); setSalary("")
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }


    return (
        <View style={styles.MainView}>
            <Header title={"Add Employee"} />
            <TextInput placeholder='Emp Name' value={Name} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setName(val)} />
            <TextInput placeholder='Emp Title' value={Title} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setTitle(val)} />
            <TextInput placeholder='Department : HR | Tech | Product' value={Department} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setDepartment(val)} />
            <TextInput placeholder='Salary' value={Salary} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setSalary(val)} keyboardType='numeric' />
            <Button title={"Add Data"} onPress={AddDatat} />
        </View>
    )
}

export default AddData

const styles = StyleSheet.create({
    InputForm: {
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 8,
        color: "black",
        paddingHorizontal: 10
    },
    MainView: {
        borderWidth: 1,
        marginHorizontal: "5%",
        paddingVertical: "5%",
        borderRadius: 8,
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "blue",
        borderColor: "blue"
    }
})