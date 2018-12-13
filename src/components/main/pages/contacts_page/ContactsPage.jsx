import React, { Component } from "react";

// styles
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

class ContactsPage extends Component {
	render() {
		return (
			<Container>
				<Contacts>
					<Telephones>Телефон: XXX-XXX-XX-XX</Telephones>
					<Address>Адрес: ХХХХХХХХХХХХХХХХХХХХ</Address>
				</Contacts>
				<Map src={process.env.GOOGLE_MAPS_EMBED_CODE} />
			</Container>
		);
	}
}

export default ContactsPage;

// styled components -------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)};
`;

const Map = styled.iframe.attrs({
	width: 600,
	height: 450,
	frameBorder: 0,
	title: "contacts",
	allowFullScreen: true
})`
	${props => (props.theme.desktop ? desktop.map : mobile.map)};
`;

const Contacts = styled.div`
	${props => (props.theme.desktop ? desktop.contacts : mobile.contacts)};
`;

const Telephones = styled.div`
	${props => (props.theme.desktop ? desktop.telephones : mobile.telephones)};
`;

const Address = styled.div`
	${props => (props.theme.desktop ? desktop.address : mobile.address)};
`;

// -------------------------------------------
