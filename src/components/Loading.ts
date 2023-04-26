import styled, { keyframes,DefaultTheme, ThemedStyledProps } from 'styled-components';

interface LoadingType {
	isActive:boolean
}

type PropsType = ThemedStyledProps<LoadingType, DefaultTheme>;


const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div<LoadingType>`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(5px);
	z-index: 9999;
	display: ${(props: PropsType)=>props.isActive? "flex":"none"};
	justify-content: center;
	align-items: center;
	:after {
		content: '';
		display: block;
		height: 55px;
		width: 55px;
		border: 5px solid #ffc107;
		border-radius: 50%;
		border-top: none;
		border-right: none;
		margin: 16px auto;
		animation: ${rotation} 1s linear infinite;
	}
`;