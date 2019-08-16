import React from 'react';
import { Text } from 'react-native'
import styled from 'styled-components';

const Card = props => {
	return 	<Container>
	<Cover>
		<Image source={{uri : props.picture}}>
			
		</Image>
	</Cover>
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
	margin: 18px;
	margin-top: 20px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
	width: 100%;
	height: 120px;
	border-top-left-radius: 14px;
	border-top-right-radius: 14px;
	
`;

const Image = styled.Image`
	
	width: 55%;
	height: 120%;
	justify-content: center;
`;
const Content = styled.Text`
	color: #ACACAC;
	font-size: 15px;
	font-weight: 600;
	text-align: center;
	

`;
