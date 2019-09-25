import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';


const Card = props => {
	return 	<Container>
	
    <Image
        source={require('../Image/photo-camera.png')}>
    </Image>
	<Content>
		<Text>
            Analyze By Picture
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
    border-style: dashed;

`;

const Image = styled.Image`
	width: 60;
	height: 60;
    margin-top: 50;
    margin-left:45;
    
	

	
`;
const Content = styled.Text`
	color: #D5D5D5;
	font-size: 15px;
    text-align: center;
    margin-top: 10;
`;
