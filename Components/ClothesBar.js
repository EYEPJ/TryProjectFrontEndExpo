import React from 'react';
import { Text } from 'react-native'
import styled from 'styled-components';

const Bar = props => {
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

export default Bar;
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
	overflow: hidden;
`;

const Image = styled.Image`
	width: 100%;
	height: 100%;
`;
const Content = styled.Text`
	color: #ACACAC;
	font-size: 15px;
	font-weight: 600;
`;
