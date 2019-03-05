import React, { Component } from "react";

// styles
import styled from "styled-components";
// import * as desktop from "./styles/desktop";
// import * as mobile from "./styles/mobile";

class MainPage extends Component {
	componentDidMount() {
		this.props.ready(true);
	}

	render() {
		const Fragment = React.Fragment;
		return (
			<Fragment>
				<h3 style={{ padding: "30px" }}>Тудулист</h3>
				<ol style={{ listStyle: "decimal", paddingLeft: "30px" }}>
					<li>Доделать анимацию удаления товара из корзины</li>
					<li>Ошибки при клике по карте с незавершенной анимацией возврата на место</li>
					<li>Переписать генератор классов для использования с массивом элементов... или удалить</li>
					<li>Кнопка закрытия модального окна продукта не всегда видна на экране</li>
					<li>Сделать router-конфиг</li>
					<li>Нормально согласовать модальные окна с роутами</li>
					<li>Разобраться с тачскрином... вспомнить о чем вообще речь...</li>
					<li>Повесить продукты на grid</li>
					<li>Разделить бандлы для стилей (mobile - desktop).. наверное..</li>
					<li>Заменить классы на функции в компонентах где возможно</li>
					<li>Перевести категории товаров на русский язык</li>
					<li>Low Quality Image Placeholders тоже хорошо</li>
					<li>Прикрутить shouldComponentUpdate везде где можно</li>
					<li>Разобраться с http-заголовками</li>
					<li>Изменить формат изображений</li>
					<li>Сделать нормальную админку!!</li>
					<li>Написать тесты!</li>
				</ol>
			</Fragment>
		);
	}
}

export default MainPage;
