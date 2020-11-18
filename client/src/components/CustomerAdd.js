import React from 'react';

//HTTP client for the browser and node.js
import {post} from 'axios';

// Create Modal 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden :{
        display : 'none'
    }
})

// ClassAdd 클래스 만들기
//  render 로  componet 그리기
class CustomerAdd extends React.Component{

    constructor(props){
        super(props);
        this.state={
            file:null,
            userName :'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            title :"WEB",
            open: false
        }
    }

    handleFileChange =(e)=>{
        // debugger;
        // console.log("file changed");
        this.setState({
            file:e.target.files[0],
            fileName:e.target.value
        })
    }

    handleValueChange =(e) => {
        // debugger;
        // console.log("value changed");
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
    }

    addCustomer=()=>{
        const url = '/api/customers';
        const formData =  new FormData();
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config = {
            headers:{
                'content-type': 'multipart/form-data'
            }
        }
        return post(url,formData,config);

    }

    // handleClickOpen(){  자동적으로 바인딩 처리를 할수 있도록 아래 처럼 한다. 
    handleClickOpen = () =>{
        this.setState({
            open:true
        })
    }


    handleClose=()=> {
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open : false
        })
    }

    // Submit 할때 호출되는 함수
    handleFormSubmit =(e) =>{
        // debugger;
        // console.log("Submit")
        e.preventDefault()
        this.addCustomer()
        .then((response)=>{
            console.log(response.data);
        })
        // sent
        this.setState({
            file:null,
            userName:'',
            birthday:'',
            gender:'',
            job:'',
            fileName:'',
            open : false
        })
         window.location.reload();
    }

    render(){
        // render design class
        // class  최기화
        const { classes } = this.props;

        return(

            <div>
                <Button variant = "contained" color="primary" onClick={this.handleClickOpen}>
                    Add Customer
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> Add Customers</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file"  file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor ="raised-button-file">                            
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Select Profile image" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="name" type="text" name ="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label="birthday" type="text" name ="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="gender" type="text" name ="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="job" type="text" name ="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> Add </Button>
                        {/* 닫기버튼의 디자인은 아웃라인드라고 설정 */}
                        <Button variant="outlined" color="primary" onClick={this.handleClose}> Close </Button>
                    </DialogActions>

                </Dialog>
            </div>
            // <div>
            //     <h1> <a href="/" onClick={
            //         function(e){
            //             alert('Hi');
            //             debugger;
            //         }
            //     // prop 중에  title 가져 오기 
            //     }> {this.state.title} </a></h1>     
            //     <form onSubmit={this.handleFormSubmit}>
            //     {/* <form onSubmit={
            //         function(e){
            //             alert('Add');
            //             debugger;
            //         }
            //     }> */}
            //         <h1> Add customer</h1>
            //             Profile image : <input type="file" name ="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
            //             name : <input type="text" name ="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            //             Birthday : <input type="text" name ="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            //             Gender : <input type="text" name ="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            //             Job : <input type="text" name ="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
            //             <button type="Submit"> Add </button>
            //     </form>
            // </div>
        )
    }

}

// export default CustomerAdd;
// style 로 내보내기 할것
export default withStyles(styles)(CustomerAdd);
