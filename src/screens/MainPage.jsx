import { ScrollView, StyleSheet, Text, View, Dimensions, Alert, Modal, TextInput, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import AddData from '../components/AddData'
import { FakeData } from '../data/FakeData'
import EmpInfo from '../components/EmpInfo'
import Button from '../components/Button'
import { GetData } from '../services/GetData'
import { DeleteEmployee } from '../services/DeleteApi'
import { UpdateEmp } from '../services/UpdateApi'
const windoWidth = Dimensions.get('window').width;
const windoHeight = Dimensions.get('window').height;
const MainPage = () => {
    const [Name, setName] = useState("")
    const [Title, setTitle] = useState("")
    const [Department, setDepartment] = useState("")
    const [Salary, setSalary] = useState("")
    const [EmpData, setEmpData] = useState([])
    const [Id, setId] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    useEffect(() => {
        DataGet()
    }, [])
    const DataGet = async () => {
        console.log("data get is called");
        const result = await GetData();
        console.log(result, "i am data");
        setEmpData(result)
    }
    const DeleteEmp = async (id) => {
        console.log(id);
        const resp = await DeleteEmployee(id)
        console.log(resp, "man");
        if (resp.deletedCount == 1) {
            console.log(resp, "deleted");
            alert("deleted")
            await DataGet()
        }
        else {
            alert("Issue in Deleting")
        }
    }
    const DataSet = (item) => {
        console.log(item);
        setModalVisible(true)
        setId(item._id);
        setName(item.Name);
        setDepartment(item.Department)
        setTitle(item.EmpTitle)
        setSalary(item.Salary)
        console.log(Id, Name, Department, Salary)
    }
    const UpdatedData = {
        Name: Name,
        EmpTitle: Title,
        Department: Department,
        Salary: Salary
    }
    const updateEmployee = async () => {
        console.log(UpdatedData, Id, "I am data");
        if (Name == "" || Title == "" || Department == "" || Salary == "") {
            alert("Please Enter all fields")
        }
        else {
            const result = await UpdateEmp(Id, UpdatedData)
            console.log(result);
            if (result.message == "Data is Updated") {
                alert("Data is Updated")
                setModalVisible(false)
                setName(""); setTitle(""); setDepartment(""); setSalary("")
                await DataGet()
            }
            else {
                alert("Some Issue in Updating")
            }
        }
    }
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await DataGet()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
    return (
        <ScrollView style={{ height: windoHeight }}
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Header title={"Employee"} />
            <AddData />
            <View style={styles.ScrollList}>
                <Header title={"Employee List"} />
                {
                    EmpData.length == [] ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: 20, color: "black", fontWeight: "700" }}>NO Employee is added yet</Text>
                        </View> :
                        EmpData.map((item, index) => (
                            <View style={styles.MainListView} key={index}>
                                <EmpInfo title={"Name"} value={item?.Name} />
                                <EmpInfo title={"Title"} value={item?.EmpTitle} />
                                <EmpInfo title={"Salary"} value={item?.Salary} />
                                <EmpInfo title={"Department"} value={item?.Department} />
                                <Button title={"Delete"} onPress={() => { DeleteEmp(item._id) }} />
                                <Button title={"Edit"} onPress={() => { DataSet(item) }} />
                            </View>
                        ))
                }
            </View>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput placeholder='Emp Name' value={Name} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setName(val)} />
                            <TextInput placeholder='Emp Title' value={Title} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setTitle(val)} />
                            <TextInput placeholder='Department' value={Department} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setDepartment(val)} />
                            <TextInput placeholder='Salary' value={Salary} placeholderTextColor={"grey"} style={styles.InputForm} onChangeText={(val) => setSalary(val)} keyboardType='numeric' />
                            <TouchableOpacity style={styles.Btn} onPress={updateEmployee} >
                                <Text style={styles.BntText}>Save Data</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Btn} onPress={() => { setModalVisible(false) }}>
                                <Text style={styles.BntText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

export default MainPage

const styles = StyleSheet.create({
    ScrollList: {
        // borderWidth: 1,
        borderRadius: 8,
        marginHorizontal: "5%",
        marginVertical: "10%"
    },
    MainListView: {
        borderWidth: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
        marginVertical: 10,
        backgroundColor: "white",
        elevation: 5,
        shadowColor: "blue",
        borderColor: "blue"
    },
    EmpService: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: "100%"
    },
    modalView: {
        margin: 5,
        width: "70%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 39,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    InputForm: {
        borderWidth: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 8,
        color: "black",
        paddingHorizontal: 10,
        width: "100%"
    },
    Btn: {
        borderRadius: 7,
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: "center",
        paddingVertical: 7,
        backgroundColor: "lightblue",
        width: "100%"
    },
    BntText: {
        fontSize: 19,
        color: "white",
        fontWeight: "700"
    }
})