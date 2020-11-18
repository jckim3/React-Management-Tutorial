import React, {Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper  from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { mergeClasses } from '@material-ui/styles';
import CustomerAdd from "./components/CustomerAdd";

const styles = theme =>({
  root:{
    width:'100%',
    marginTop : theme.spacing.unit *3,
    // marginTop : theme.spacing(3),
    overflowX : "auto"

  },
  table:{
    minWidth:1080
  },
  progress:{
     margin : theme.spacing.unit * 2     
    // margin : theme.spacing.unit(2)     
  }
})

// const customers = [
//   {
//   'id':1,
//   'image': 'https://placeimg.com/64/64/1',
//   'name': ' jckim',
//   'birthday':'9761221',
//   'gender':'man',
//   'job':'bisiness'
// },
// {
//   'id':2,
//   'image': 'https://placeimg.com/64/64/2',
//   'name': ' thkim',
//   'birthday':'9761221',
//   'gender':'man',
//   'job':'student'
// },
// {
//   'id':3,
//   'image': 'https://placeimg.com/64/64/3',
//   'name': ' bskim',
//   'birthday':'9761221',
//   'gender':'man',
//   'job':'student'
// },

// ]

// 1) Construct 
// 2) componetWillMount()
// 3) render()
// 4)  componentDidMount


//function App() {
class App extends Component {

  // 변경할때는 SetState 를 사용하고, 변경되었을때는 render() 가 불려진다. 
  state = {
    customers: "",
    completed : 0 // 정수형 변수 추가 for Progress bar
  }

  // componet 가 초기화가 끝나고(Mount) 실행되는 함수.
  componentDidMount(){
    this.timer = setInterval(this.progress,20);
    //  fetch the data from Server
    this.callApi()
      .then(res=>this.setState({customers:res}))
      .catch(err=>console.log(err));
  }

  callApi = async()=>{

    // 클라이런트에서 서버에 요청
    const response =  await fetch('/api/customers');
    const  body = await response.json();
    return body;
  }

  progress =() =>{
    const { completed} = this.state;
    this.setState({completed : completed >=100 ? 0 : completed+1})
  }

  // component 그리기  caution : <div> </div> 로  묶기
  render()
  {
    const {classes}= this.props;
    return(   
      <div>
        <Paper className ={classes.root}>
          <Table className ={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>image</TableCell>
                <TableCell>name</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { 
                this.state.customers ? this.state.customers.map(c=>{
                  return( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}
                    />);}) : 
                    <TableRow>
                      <TableCell colSpan="6" align ="center">
                        <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                      </TableCell>
                    </TableRow>                
              }            
            </TableBody>
          </Table>
        </Paper>    
        {/* // CusomerAdd class 정의, 메뉴정의 */}
        <CustomerAdd/>    
      </div>   


    )
  }

}



 {/* { <Customer
      id={customers[0].id}
      image={customers[0].image}
      name={customers[0].name}
      birthday={customers[0].birthday}
      gender={customers[0].gender}
      job={customers[0].job}
      />

      <Customer
      id={customers[1].id}
      image={customers[1].image}
      name={customers[1].name}
      birthday={customers[1].birthday}
      gender={customers[1].gender}
      job={customers[1].job}
      />

      <Customer
      id={customers[2].id}
      image={customers[2].image}
      name={customers[2].name}
      birthday={customers[2].birthday}
      gender={customers[2].gender}
      job={customers[2].job}      
      /> } 
    */}

export default withStyles(styles)(App);
