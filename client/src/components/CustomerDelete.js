import React from 'react';

class CustomerDelete extends React.Component{

    deleteCustomer(id){
        // /api/cusomers/7
        const url = 'api/customers/' + id;
        fetch(url,{
            method:'DELETE'
        });
       
    }

    render(){
        return (
            <button onClick={(e)=>{
                this.deleteCustomer(this.props.id)
            }}> 
                Delete
            </button>

        )
    }
}

export default  CustomerDelete;
