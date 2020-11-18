import React from 'react';

// Create Modal 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import {withStyles} from '@material-ui/core/styles';
import Typography from  '@material-ui/core/Typography';

class CustomerDelete extends React.Component{

    constructor(props){
        super(props);
        this.state={
            open:false
        }
    }
    // handleClickOpen(){  자동적으로 바인딩 처리를 할수 있도록 아래 처럼 한다. 
    handleClickOpen = () =>{
        this.setState({
            open:true
        })
    }


    handleClose=()=> {
        this.setState({
            open : false
        })
    }

    deleteCustomer(id){
        // /api/cusomers/7
        const url = 'api/customers/' + id;
        fetch(url,{
            method:'DELETE'
        });       
    }

    render(){
        return (
            // <button onClick={(e)=>{
            //     this.deleteCustomer(this.props.id)
            // }}> 
            //     Delete
            // </button>
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}> Delete </Button>
                {/* // Diaglog 에는  Open 의 상태가 True 일때만 열린다.  */}
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        Warnning deleting
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            selected cusomter will be deleted !!
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=> {this.deleteCustomer(this.props.id)}}> Delete </Button>
                        <Button variant="outlined " color="primary" onClick={this.handleClose}> Close </Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}

export default  CustomerDelete;
