import React, { Component } from "react";
import PropTypes from "prop-types";

// styles
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import * as desktop from "./styles/desktop";
import * as mobile from "./styles/mobile";

class TermsOfUse extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: false
		};
	}

	static propTypes = {
		close: PropTypes.func
	};

	componentDidMount() {
		this.setState({
			show: true
		});
	}

	render() {
		return (
			<Container>
				<CSSTransition
					in={this.state.show}
					classNames="text"
					timeout={{ enter: 600, exit: 300 }}
					onExited={() => {
						this.props.close();
					}}
					unmountOnExit
				>
					<Text
						onClick={() => {
							this.setState({
								show: false
							});
						}}
					>
						<Title>Пользовательское соглашение</Title>
						<Subparagraph>
							Настоящее Соглашение определяет условия использования Пользователями материалов и сервисов сайта www.kuku.ua (далее —
							«Сайт»).
						</Subparagraph>

						<Paragraph>1. Общие условия</Paragraph>
						<Subparagraph>
							1.1. Использование материалов и сервисов Сайта регулируется нормами действующего законодательства Украины.
						</Subparagraph>
						<Subparagraph>
							1.2. Настоящее Соглашение является публичной офертой. Получая доступ к материалам Сайта Пользователь считается
							присоединившимся к настоящему Соглашению.
						</Subparagraph>
						<Subparagraph>
							1.3. Администрация Сайта вправе в любое время в одностороннем порядке изменять условия настоящего Соглашения. Такие
							изменения вступают в силу по истечении 3 (Трех) дней с момента размещения новой версии Соглашения на сайте. При несогласии
							Пользователя с внесенными изменениями он обязан отказаться от доступа к Сайту, прекратить использование материалов и
							сервисов Сайта.
						</Subparagraph>

						<Paragraph>2. Обязательства Пользователя </Paragraph>
						<Subparagraph>
							2.1. Пользователь соглашается не предпринимать действий, которые могут рассматриваться как нарушающие украинское
							законодательство или нормы международного права, в том числе в сфере интеллектуальной собственности, авторских и/или
							смежных правах, а также любых действий, которые приводят или могут привести к нарушению нормальной работы Сайта и сервисов
							Сайта.
						</Subparagraph>
						<Subparagraph>
							2.2. Использование материалов Сайта без согласия правообладателей не допускается. Для правомерного использования
							материалов Сайта необходимо заключение лицензионных договоров (получение лицензий) от Правообладателей.
						</Subparagraph>
						<Subparagraph>
							2.3. При цитировании материалов Сайта, включая охраняемые авторские произведения, ссылка на Сайт обязательна.
						</Subparagraph>
						<Subparagraph>
							2.4. Комментарии и иные записи Пользователя на Сайте не должны вступать в противоречие с требованиями законодательства
							Украины и общепринятых норм морали и нравственности.
						</Subparagraph>
						<Subparagraph>
							2.5. Пользователь предупрежден о том, что Администрация Сайта не несет ответственности за посещение и использование им
							внешних ресурсов, ссылки на которые могут содержаться на сайте.
						</Subparagraph>
						<Subparagraph>
							2.6. Пользователь согласен с тем, что Администрация Сайта не несет ответственности и не имеет прямых или косвенных
							обязательств перед Пользователем в связи с любыми возможными или возникшими потерями или убытками, связанными с любым
							содержанием Сайта, регистрацией авторских прав и сведениями о такой регистрации, товарами или услугами, доступными на или
							полученными через внешние сайты или ресурсы либо иные контакты Пользователя, в которые он вступил, используя размещенную
							на Сайте информацию или ссылки на внешние ресурсы.
						</Subparagraph>
						<Subparagraph>
							2.7. Пользователь принимает положение о том, что все материалы и сервисы Сайта или любая их часть могут сопровождаться
							рекламой. Пользователь согласен с тем, что Администрация Сайта не несет какой-либо ответственности и не имеет каких-либо
							обязательств в связи с такой рекламой.
						</Subparagraph>

						<Paragraph>3. Прочие условия</Paragraph>
						<Subparagraph>
							3.1. Все возможные споры, вытекающие из настоящего Соглашения или связанные с ним, подлежат разрешению в соответствии с
							действующим законодательством Украины.
						</Subparagraph>
						<Subparagraph>
							3.2. Ничто в Соглашении не может пониматься как установление между Пользователем и Администрации Сайта агентских
							отношений, отношений товарищества, отношений по совместной деятельности, отношений личного найма, либо каких-то иных
							отношений, прямо не предусмотренных Соглашением.
						</Subparagraph>
						<Subparagraph>
							3.3. Признание судом какого-либо положения Соглашения недействительным или не подлежащим принудительному исполнению не
							влечет недействительности иных положений Соглашения.
						</Subparagraph>
						<Subparagraph>
							3.4. Бездействие со стороны Администрации Сайта в случае нарушения кем-либо из Пользователей положений Соглашения не
							лишает Администрацию Сайта права предпринять позднее соответствующие действия в защиту своих интересов и защиту авторских
							прав на охраняемые в соответствии с законодательством материалы Сайта. Пользователь подтверждает, что ознакомлен со всеми
							пунктами настоящего Соглашения и безусловно принимает их.
						</Subparagraph>
					</Text>
				</CSSTransition>
			</Container>
		);
	}
}

export default TermsOfUse;

// styled-components -----------------------------

const Container = styled.div`
	${props => (props.theme.desktop ? desktop.container : mobile.container)}
`;

const Text = styled.div`
	${props => (props.theme.desktop ? desktop.text : mobile.text)}
`;

const Title = styled.h2`
	${props => (props.theme.desktop ? desktop.title : mobile.title)}
`;

const Paragraph = styled.h3`
	${props => (props.theme.desktop ? desktop.paragraph : mobile.paragraph)}
`;

const Subparagraph = styled.p`
	${props => (props.theme.desktop ? desktop.subparagraph : mobile.subparagraph)}
`;
