import React, { Component } from "react";

// styles
import styled from "styled-components";
// import * as desktop from "./styles/desktop";
// import * as mobile from "./styles/mobile";

class MainPage extends Component {
	render() {
		const Fragment = React.Fragment;
		return (
			<Fragment>
				<h3 style={{ padding: "30px" }}>Тудулист</h3>
				<ol style={{ listStyle: "decimal", paddingLeft: "30px" }}>
					<li>Сделать анимацию удаления товара из корзины</li>
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
					<li>Сделать добавление товара через админку</li>
					<li>Сделать нормальную админку!!</li>
					<li>Сделать регистрацию пользователей</li>
				</ol>
			</Fragment>
		);
	}
}

export default MainPage;
