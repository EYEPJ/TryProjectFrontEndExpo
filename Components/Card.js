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
	background: #313131;
	height: 210px;
	width: 150px;
	border-radius: 7px;
	margin: 5px;

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
	color: #F5F5F5;
	font-size: 15px;
	text-align: center;
`;
