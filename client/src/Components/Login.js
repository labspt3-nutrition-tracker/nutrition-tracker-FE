import React from 'react';

class LoginOrRegister extends React.Component {
    constructor(props){
        super(props);
        this.state = {value: ''};
    }

    handleChange(e){
        this.setState({value: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
    }
    render(){
        return(
            <>
                <form>

                </form>
            </>
        )
    }
}