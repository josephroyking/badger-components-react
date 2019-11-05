// @flow

import * as React from 'react';
import styled from 'styled-components';

import BitcoinCashImage from '../../images/bitcoin-cash.svg';
import SLPLogoImage from '../../images/slp-logo.png';

import { type ValidCoinTypes } from '../../hoc/BadgerBase';

import Small from '../../atoms/Small';

const Outer = styled.div`
	font-family: sans-serif;
	display: grid;
	grid-gap: 5px;
`;

const Top = styled.div`
	grid-template-columns: max-content max-content max-content;
	display: grid;
	grid-gap: 5px;
	grid-auto-flow: column;
	justify-content: end;
	align-items: end;
`;

const Bottom = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const PriceText = styled.p`
	font-family: monospace;
	font-size: 16px;
	line-height: 12px;
	margin: 0;
	display: grid;
`;

// Price display
type Props = {
	price: ?string,
	symbol: string,

	coinType?: ValidCoinTypes,
	preSymbol?: string,
	name?: string,

	paymentRequestUrl?: string,
};

class PriceDisplay extends React.PureComponent<Props> {
	render() {
		const {
			price,
			name,
			coinType,
			symbol,
			preSymbol,
			paymentRequestUrl,
		} = this.props;

		const CoinImage = coinType === 'BCH' ? BitcoinCashImage : SLPLogoImage;

		const preContent = preSymbol ? (
			<PriceText>{preSymbol}</PriceText>
		) : (
			<div style={{ width: 25, height: 15 }}>
				<img src={CoinImage} style={{ height: '100%' }} alt={coinType} />
			</div>
		);
		const priceContent = paymentRequestUrl ? (
			<div>
				<PriceText>BIP70 Invoice</PriceText>
			</div>
		) : (
			<div>
				<PriceText>{price || '-'}</PriceText>
				<Small>{symbol}</Small>
			</div>
		);

		return (
			<Outer>
				<Top>
					{preContent}
					{priceContent}
				</Top>
				{name && (
					<Bottom>
						<Small muted>{name}</Small>
					</Bottom>
				)}
			</Outer>
		);
	}
}

export default PriceDisplay;
