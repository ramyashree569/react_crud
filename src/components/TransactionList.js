import React, { Component } from 'react'
import TransactionForm from './TransactionForm'

class TransactionList extends Component {
    state={
        list:this.returnList(),
        currentIndex:-1
    }

    returnList(){
        if(localStorage.getItem('transactions')==null){
            localStorage.setItem('transactions',JSON.stringify([]))
        }
        return JSON.parse(localStorage.getItem('transactions'))
    }

    onAddorEdit=(data)=>{
        var list=this.returnList();
        if(this.state.currentIndex == -1){
            list.push(data)
        }else{
            list[this.state.currentIndex] = data
        }
        
        localStorage.setItem('transactions',JSON.stringify(list))
        this.setState({list:list,currentIndex:-1})
    }

    handleEdit=(index)=>{
        this.setState({
            currentIndex:index
        })
        console.log(this.state.currentIndex)

    }

    handleDelete=(index)=>{
        var deleteList = this.returnList();
        deleteList.splice(index,1)
        localStorage.setItem('transactions',JSON.stringify(deleteList))
        this.setState({list:deleteList,currentIndex:-1})
    }
    render() {
        return (
            <div>
                <TransactionForm
                onAddorEdit={this.onAddorEdit}
                currentIndex={this.state.currentIndex}
                list={this.state.list}
                />
                <hr></hr>
                <table>
                    <thead>
                        <td>Account No</td>
                        <td>Account Name</td>
                        <td>Amount</td>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map((item,index)=>{
                                return <tr key={index}>
                                    <td>{item.bAccountNo}</td>
                                    <td>{item.bName}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={()=>this.handleEdit(index)}>Edit</button></td>
                                    <td><button onClick={()=>this.handleDelete(index)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}



export default TransactionList;