import React, { Component } from "react";

// styles
import styled from "styled-components";
// import * as desktop from "./styles/desktop";
// import * as mobile from "./styles/mobile";

import { Gooey } from "../../../../images/SVG/effects";

class MainPage extends Component {
	render() {
		const Fragment = React.Fragment;
		return (
			<Fragment>
				<h3 style={{ padding: "30px" }}>Тудулист</h3>
				<ol style={{ listStyle: "decimal", paddingLeft: "30px" }}>
					<li>Сделать анимацию удаления товара из корзины</li>
					<li>Сделать проверку токена при посещении страницы администратора</li>
					<li>Ошибки при клике по карте с незавершенной анимацией</li>
					<li>Установить helmet, sharp и passport</li>
					<li>Доделать селектор классов для массивов</li>
					<li>Кнопка закрытия модального окна продукта не всегда видна на экране</li>
					<li>Сделать конфиг для фронта</li>
					<li>Доделать 404 страницу</li>
					<li>Разобраться с тачскрином</li>
					<li>Пустые ячейки не всегда правильно становятся</li>
					<li>Разделить бандлы для стилей (mobile - desktop).. наверное..</li>
					<li>Заменить классы на функции в компонентах</li>
					<li>Перевести категории товаров на русский язык</li>
					<li>Low Quality Image Placeholders</li>
					<li>Прикрутить shouldComponentUpdate везде где можно</li>
					<li>Что делать если куки блокируются браузером?</li>
					<li>Разобраться с заголовками</li>
					<li>Изменить формат изображений</li>
					<li>Сделать что-то с дизайном((</li>
					<li>Сделать нормальную админку!!</li>
					<li>Сделать регистрацию пользователей</li>
				</ol>
				<BallsWrapper>
					<Ball1 />
					<Ball2 />
				</BallsWrapper>
				<Gooey />
			</Fragment>
		);
	}
}

const BallsWrapper = styled.div`
	width: 700px;
	filter: url("#goo");
`;

const Ball1 = styled.div`
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #fff;
	margin: 30px;
`;

const Ball2 = styled.div`
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: #fff;
	margin: 30px;
	animation: anim 2s infinite;

	@keyframes anim {
		0% {
			transform: translateX(-150px);
		}

		50% {
			transform: translateX(100px);
		}

		100% {
			transform: translateX(-150px);
		}
	}
`;

export default MainPage;
