import React, { Component } from "react";

// styles
import styled from "styled-components";

// styled components -------------------------

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Header = styled.header`
	font-size: 36px;
	margin-top: 15px;
`;

const Map = styled.iframe.attrs({
	width: 600,
	height: 450,
	frameBorder: 0,
	title: "contacts",
	allowFullScreen: true
})`
	border: 1px solid #959595;
	width: 100%;
`;

const Contacts = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 30px 0;
`;

const Telephones = styled.div`
	/* font-weight: 600; */
`;

const Address = styled.div`
	/* font-weight: 600; */
`;

// -------------------------------------------

class ContactsPage extends Component {
	render() {
		return (
			<Container>
				<Header>Наши контакты</Header>
				<Contacts>
					<Telephones>Телефон: XXX-XXX-XX-XX</Telephones>
					<Address>Адрес: ХХХХХХХХХХХХХХХХХХХХ</Address>
				</Contacts>
				<Map
					src={process.env.REACT_APP_GOOGLE_MAPS_EMBED_CODE}
					// 50.100457, 30.640400
				/>
			</Container>
		);
	}
}

export default ContactsPage;
