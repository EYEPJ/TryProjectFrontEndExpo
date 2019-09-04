import React from 'react';
import { Text } from 'react-native'
import styled from 'styled-components';

const Card = props => {
	return 	<Container>
	
		<Image source={{uri : props.picture}}>
			
		</Image>
	<Content>
		<Text>
		{props.name}
		</Text>
		</Content>
</Container>
}

export default Card;
const Container = styled.View`
	background: #ffffff;
	height: 200px;
	width: 150px;
	border-radius: 14px;
	border: 1px solid #E9E9E9;
	margin:18px;
	margin-top: 25px;
	margin-bottom: 25px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

`;

const Image = styled.Image`
	width: 40%;
	height: 80%;
	margin-top: 10
	margin-left: 45;
	display: flex;
    justify-content: center;
	

	
`;
const Content = styled.Text`
	color: #ACACAC;
	font-size: 15px;
	text-align: center;
`;
