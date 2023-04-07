import styled, { css, keyframes } from 'styled-components';

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

const Loading = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background-color: rgba(255, 255, 255, 0.25);
	backdrop-filter: blur(5px);
	z-index: 9999;
	display: flex;
	justify-content: center;
	align-items: center;
	:after {
		content: '';
		display: block;
		height: 55px;
		width: 55px;
		border: 5px solid #e77df0b3;
		border-radius: 50%;
		border-top: none;
		border-right: none;
		margin: 16px auto;
		animation: ${rotation} 1s linear infinite;
	}
`;
export { Loading };
