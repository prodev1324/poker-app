import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';

import Modal from 'react-native-modal';
import styles from '../Styles';
import * as utils from '../UtilFunctions';

export default class RegistrationView extends Component {


	static navigationOptions = {
		title: 'PoCat Registration'
	}

	constructor(props){
		super(props);
		const { navigation } = props;
		
		this.state = {
			username: null,
			first_name: null,
			last_name: null,
			email: null,
			password: null,
			password_confirm: null,
			phone_number: null,
			venmo_username: null,
			errorLabel: '',
			navigation: navigation
		}
	}

	
	async onSubmit(){
		let form = {
			username: this.state.username,
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			email: this.state.email,
			password: this.state.password,
			password_confirm: this.state.password_confirm,
			phone_number: this.state.phone_number,
			venmo_username: this.state.venmo_username
		};
		const navigation = this.state.navigation;

		//form validation
		console.log("form: ", JSON.stringify(form))
		this.setState({errorLabel:""});
		if (form.password !== form.password_confirm){
			this.setState({errorLabel:"Passwords don't match"});
			return;
		}
		if (!form.username || !form.first_name || !form.last_name || !form.email || !form.password){
			this.setState({errorLabel:"All non optional fields are required"});
			return;
		}

		var response = await utils.user_registration(form);
		if (response.error === 'None'){
			utils.resetToScreen(navigation,'HomeView',{user:response.user,token:response.token});
		}else{
			this.setState({errorLabel:response.error});
		}
		
	}

	renderInputField(onChangeText,value,placeholder,index,onSubmit,secure=false,autoFocus=false,keyboardType='default',autoCapitalize='none'){
		let ref = 'Input' + index;
		return (
			<TextInput
				ref={ref} //works
	      		style={styles.textinputwide}
	      		onChangeText={onChangeText}
	      		value={value}
	      		placeholder={placeholder}
	      		secureTextEntry={secure}
	      		selectTextOnFocus={true}
	      		onSubmitEditing={onSubmit}
	      		autoFocus={autoFocus}
	      		keyboardType={keyboardType}
	      		autoCapitalize={autoCapitalize}
	  		/>
		)
	}

	render() {

		var onChange1 = (text)=>{this.setState({username:text})};
		var onChange2 = (text)=>{this.setState({password:text})};
		var onChange3 = (text)=>{this.setState({password_confirm:text})};
		var onChange4 = (text)=>{this.setState({email:text})};
		var onChange5 = (text)=>{this.setState({first_name:text})};
		var onChange6 = (text)=>{this.setState({last_name:text})};
		var onChange7 = (text)=>{this.setState({venmo_username:text})};
		var onChange8 = (text)=>{this.setState({phone_number:text})};

		var onSubmit1 = ()=>{this.refs.Input2.focus()};
		var onSubmit2 = ()=>{this.refs.Input3.focus()};
		var onSubmit3 = ()=>{this.refs.Input4.focus()};
		var onSubmit4 = ()=>{this.refs.Input5.focus()};
		var onSubmit5 = ()=>{this.refs.Input6.focus()};
		var onSubmit6 = ()=>{this.refs.Input7.focus()};
		var onSubmit7 = ()=>{this.refs.Input8.focus()};
		var onSubmit8 = ()=>{this.onSubmit()};

		//TODO: check if you can simplify the function calling here
		return (
			
			<View style={styles.container}>
				{this.renderInputField(onChange1,this.state.username,'Username','1',onSubmit1,false,true)}
				{this.renderInputField(onChange2,this.state.password,'Password','2',onSubmit2,true)}
				{this.renderInputField(onChange3,this.state.password_confirm,'Confirm Password','3',onSubmit3,true)}
				{this.renderInputField(onChange4,this.state.email,'E-mail','4',onSubmit4,false,false,'email-address')}
				{this.renderInputField(onChange5,this.state.first_name,'First Name','5',onSubmit5,false,false,'default','words')}
				{this.renderInputField(onChange6,this.state.last_name,'Last Name','6',onSubmit6,false,false,'default','words')}
				{this.renderInputField(onChange7,this.state.venmo_username,'Venmo ID (Optional,without the @)','7',onSubmit7)}
				{this.renderInputField(onChange8,this.state.phone_number,'Phone Number (Optional)','8',onSubmit8,false,false,'phone-pad')}
				<View style={{flexDirection: 'row'}}>
					<Button title='Back' onPress={()=>utils.backOneScreen(this.state.navigation)} />
					<Button title='Submit' onPress={()=>this.onSubmit()} />
				</View>
				<Text style={styles.errorLabel}>{this.state.errorLabel}</Text>
			</View>
		
		);
	}


}

			